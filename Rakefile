# Standard library
require 'rake'
require 'yaml'
require 'fileutils'

# Load the configuration file
config = YAML.load_file '_config.yml'

local_config = '_config.yml,_config.local.yml'
dev_config = '_config.yml,_config.dev.yml'

# Set "rake build" as default task
task :default => :build

# Spawn a server and kill it gracefully when interrupt is received
def spawn *cmd
  pid = Process.spawn *cmd

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
  system 'jekyll', 'build'
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
