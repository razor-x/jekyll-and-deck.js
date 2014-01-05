module Jekyll
  class MathJaxGenerator < Generator
    safe true

    def generate(site)
      if site.config['mathjax'] && !site.config['dev']
        source = File.join(site.source, 'bower_components/MathJax')
        Dir["#{source}/**/*"].each do |file|
          next if Dir.exists? file
          next if file == '.'
          next if file == '..'

          file = Pathname.new(file).relative_path_from( Pathname.new(source) ).to_s

          excludes = %w{LICENSE README.md README-branch.txt bower.json docs test unpacked}
          next if excludes.any? { |str| file[/^#{str}/] }

          site.static_files << Jekyll::StaticFile.new(site, "#{site.source}/bower_components", 'MathJax', file)
        end
      end
    end
  end
end
