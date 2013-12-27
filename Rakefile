# Standard library
require 'rake'
require 'yaml'
require 'fileutils'

# Load the configuration file
config = YAML.load_file '_config.yml'

local_config = '_config.yml,_config.local.yml'
dev_config = '_config.yml,_config.dev.yml'

config[:destination] ||= '_site/'

# Set "rake build" as default task
task :default => :build

# Spawn a server and kill it gracefully when interrupt is received
def spawn *cmd
  pid = Process.spawn 'bundle', 'exec', *cmd

  switch = true
  Signal.trap 'SIGINT' do
    Process.kill( :QUIT, pid ) && Process.wait
    switch = false
  end
  while switch do sleep 1 end
end

# rake build
desc 'Generate the deck.'
task :build do
  system 'bundle', 'exec', 'jekyll', 'build'
end

# rake deck
desc 'Generate the deck and start a server (for presenting locally).' + "\n" +
     'Load local resources to work offline, no auto generate.' + "\n" +
     'Loads _config.local.yml as an additional config file.'
task :deck do
  spawn 'jekyll', 'serve', '--config', local_config
end

# rake dev
desc 'Start a server and watch the deck for changes (for development).' + "\n" +
     'For performance, use MathJax CDN only (if enabled).' + "\n" +
     'Loads _config.dev.yml as an additional config file.'
task :dev do
  spawn 'jekyll', 'serve', '--watch', '--config', dev_config
end

# rake deploy
desc 'Deploy the site using rsync.'
task :deploy => :build do
  raise '>> error: must add :depoly: section to _config.yml.' if config[:deploy].nil?

  local = File.expand_path '_site/'
  protocol = config[:deploy][:protocol]
  server = config[:deploy][:server]
  user = config[:deploy][:user]
  port = config[:deploy][:port]
  path = config[:deploy][:path]
  upload_only = config[:deploy][:upload_only]

  case protocol
  when :rsync

    flags = %w{-r -t -z -v}
    if port.to_i != 22
      flags << '-e'
      flags << %Q{"ssh -p #{port}"}
    end

    excludes = upload_only.nil? ? [] : upload_only.collect { |e| "--exclude='#{e}'" }

    rsync = [ 'rsync', *flags, '--del', *excludes, "#{local}/", "#{user}@#{server}:#{path}" ].join(' ')

    p "Now running: #{rsync}"
    system rsync

    if upload_only
      rsync_uploads = [ 'rsync', *flags, "#{local}/", "#{user}@#{server}:#{path}" ].join(' ')
      p "Now running: #{rsync_uploads}"
      system rsync_uploads
    end
  end
end

desc 'Generate deck from Travis CI and publish to GitHub Pages.'
task :travis do
  # if this is a pull request, do a simple build of the site and stop
  if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
    puts 'Pull request detected. Executing build only.'
    system 'bundle exec rake build'
    next
  end

  # setup credentials so Travis CI can push to GitHub
  system "git config user.name '#{ENV['GIT_NAME']}'"
  system "git config user.email '#{ENV['GIT_EMAIL']}'"

  repo = %x(git config remote.origin.url).gsub(/^git:/, 'https:')
  deploy_url = repo.gsub %r{https://}, "https://#{ENV['GH_TOKEN']}@"
  deploy_branch = repo.match(/github\.io\.git$/) ? 'master' : 'gh-pages'
  destination = File.join config[:destination], '/'
  rev = %x(git rev-parse HEAD)

  system "git remote add deploy #{repo}"
  system "git remote set-branches deploy #{deploy_branch}"
  system 'git fetch -q deploy'
  system "git branch #{deploy_branch} deploy/#{deploy_branch}"
  system 'bundle exec rake build'

  fail "Build failed." unless Dir.exists? destination

  system "git checkout #{deploy_branch}"
  system %Q(rsync -rt --delete-after --exclude=".git" --exclude=".nojekyll" #{destination} .)
  system "git add --all ."
  system "git commit -m 'Built from #{rev}'"
  system "git push -q #{deploy_url} #{deploy_branch}"
end
