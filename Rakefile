require 'fileutils'
require 'rake'
require 'rake-jekyll'
require 'tmpdir'
require 'yaml'
require 'zip'

# Load the configuration file.
config = YAML.load_file '_config.yml'

local_config = '_config.yml,_config.local.yml'
static_config = '_config.yml,_config.static.yml'
dev_config = '_config.yml,_config.dev.yml'

config[:destination] ||= '_site/'
destination = File.join config[:destination], '/'

# Set "rake build" as default task.
task default: [:build]

# Spawn a server and kill it gracefully when interrupt is received.
def spawn *cmd
  pid = Process.spawn 'bundle', 'exec', *cmd

  switch = true
  Signal.trap 'SIGINT' do
    Process.kill( :QUIT, pid ) && Process.wait
    switch = false
  end
  while switch do sleep 1 end
end

# Command to build static deck to destination (as an Array).
def build_site_command(destination=nil)
  args = []
  args.concat ['--destination', destination] unless destination.nil?

  if File.exists? '_config.staging.yml'
    args.concat ['--config', '_config.yml,_config.staging.yml']
  end

  ['bundle', 'exec', 'jekyll', 'build', *args]
end

# rake build
desc 'Generate the deck'
task :build do
  sh(*build_site_command)
end

# rake static
desc 'Generate the deck for portable static offline viewing'
task :static do
  sh 'bundle', 'exec', 'jekyll', 'build', '--config', static_config
end

# rake zip
desc 'Generate a portable zip of the deck for static offline viewing'
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
desc 'Generate the deck and start a server (for presenting locally):' + "\n" +
     'loads local resources to work offline, no auto generate;' + "\n" +
     'loads _config.local.yml as an additional config file'
task :deck do
  spawn 'jekyll', 'serve', '--no-watch', '--config', local_config
end

# rake dev
desc 'Start a server and watch the deck for changes (for development),' + "\n" +
     'for performance, use MathJax CDN only (if enabled):' + "\n" +
     'loads _config.dev.yml as an additional config file'
task :dev do
  spawn 'jekyll', 'serve', '--config', dev_config
end

# rake serve
desc 'Start a local http server to host the deck:' + "\n" +
     'does not generate the deck; use after running rake static'
task :serve do
  spawn 'jekyll', 'serve', '--no-watch', '--skip-initial-build', '--config', dev_config
end

# rake deploy
desc 'Deploy the site using rsync'
task deploy: [:build] do
  fail 'Error: must add :depoly: section to _config.yml.' if config[:deploy].nil?

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

    rsync = ['rsync', *flags, '--del', *excludes,
              "#{local}/", "#{user}@#{server}:#{path}"].join(' ')

    p "Now running: #{rsync}"
    sh rsync

    if upload_only
      rsync_uploads = ['rsync', *flags,
                        "#{local}/", "#{user}@#{server}:#{path}"].join(' ')
      p "Now running: #{rsync_uploads}"
      sh rsync_uploads
    end
  end
end

# rake publish
Rake::Jekyll::GitDeployTask.new(:publish) do |t|
  t.description = 'Generate the site and push changes to remote repository'
  t.author_date = -> { '' }

  t.remote_url = -> {
    %x(git config remote.origin.url)
    .gsub(%r{^git://}, 'git@')
    .sub(%r{/}, ':').strip
  }

  t.deploy_branch = -> {
    t.remote_url.match(/github\.io\.git$/) ? 'master' : 'gh-pages'
  }

  t.jekyll_build = -> (dest_dir) {
    Rake.sh(*build_site_command(dest_dir))
  }

  t.skip_commit = -> {
    ENV['TRAVIS_PULL_REQUEST'].to_i > 0 ||
      %w[yes y true 1].include?(ENV['SKIP_COMMIT'].to_s.downcase) ||
      (!ENV['SOURCE_BRANCH'].nil? && ENV['SOURCE_BRANCH'] != ENV['TRAVIS_BRANCH'])
  }
end

# rake travis_env
desc 'Prepare the Travis CI build environment'
task :travis_env do
  # Generate a staging config if staging URL is set.
  url = ENV['JEKYLL_STAGING_URL'].to_s
  unless url.empty?
    puts 'Creating _config.staging.yml.'
    staging = {'domain' => url, 'baseurl' => url,
               'assets' => {'baseurl' => "#{url}/assets"}}
    File.open('_config.staging.yml','w') { |f| f.write staging.to_yaml }
  end

  # Setup the deploy key.
  puts 'Adding deploy key.'
  verbose false do
    sh 'chmod 600 .deploy_key'
    sh 'ssh-add .deploy_key'
  end
end

# rake travis
desc 'Generate site from Travis CI and publish site to GitHub Pages'
task travis: [:travis_env, :publish]
