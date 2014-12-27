# Standard library
require 'fileutils'
require 'rake'
require 'tmpdir'
require 'yaml'
require 'zip'

# Load the configuration file
config = YAML.load_file '_config.yml'

local_config = '_config.yml,_config.local.yml'
static_config = '_config.yml,_config.static.yml'
dev_config = '_config.yml,_config.dev.yml'

config[:destination] ||= '_site/'
destination = File.join config[:destination], '/'

# Set "rake build" as default task
task :default => :build

# Redefine system to exit with nonzero status on fail.
def system(*args)
  super(*args) or exit!(1)
end

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

# rake static
desc 'Generate the deck for portable static offline viewing.'
task :static do
  system 'bundle', 'exec', 'jekyll', 'build', '--config', static_config
end

# rake zip
desc 'Generate a portable zip of the deck for static offline viewing.'
task :zip => [:static] do
  title = YAML.load_file(File.join('_data', 'meta.yml'))['title']
  title = "deck-#{title.gsub(' ', '_').downcase}"
  zip = "#{title}.zip"

  File.unlink zip if File.exists? zip
  Zip::File.open zip, Zip::File::CREATE do |zipfile|
    Dir[File.join(destination, '**', '**')].each do |file|
      zipfile.add(file.sub(destination, File.join(title, '/')), file)
    end
  end
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

  local = File.expand_path destination
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

desc 'Generate site and publish to GitHub Pages.'
task :ghpages do
  repo = %x(git config remote.origin.url).strip
  deploy_branch = repo.match(/github\.io\.git$/) ? 'master' : 'gh-pages'
  rev = %x(git rev-parse HEAD).strip

  system 'bundle install'
  system 'bower install'

  Dir.mktmpdir do |dir|
    system "git clone --branch #{deploy_branch} #{repo} #{dir}"
    system 'bundle exec rake build'
    system %Q(rsync -rt --delete-after --exclude=".git" --exclude=".nojekyll" #{destination} #{dir})
    Dir.chdir dir do
      system 'git add --all'
      system "git commit -m 'Built from #{rev}'"
      system 'git push'
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

  repo = %x(git config remote.origin.url).gsub(/^git:/, 'https:').strip
  deploy_url = repo.gsub %r{https://}, "https://#{ENV['GH_TOKEN']}@"
  deploy_branch = repo.match(/github\.io\.git$/) ? 'master' : 'gh-pages'
  rev = %x(git rev-parse HEAD).strip

  Dir.mktmpdir do |dir|
    dir = File.join dir, 'site'
    system 'bundle exec rake build'
    fail "Build failed." unless Dir.exists? destination
    system "git clone --branch #{deploy_branch} #{repo} #{dir}"
    system %Q(rsync -rt --del --exclude=".git" --exclude=".nojekyll" #{destination} #{dir})
    Dir.chdir dir do
      # setup credentials so Travis CI can push to GitHub
      system "git config user.name '#{ENV['GIT_NAME']}'"
      system "git config user.email '#{ENV['GIT_EMAIL']}'"

      system 'git add --all'
      system "git commit -m 'Built from #{rev}'."
      system "git push -q #{deploy_url} #{deploy_branch}"
    end
  end
end
