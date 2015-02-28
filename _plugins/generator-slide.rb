module Jekyll
  class RenderSlideTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super

      if markup.strip[0] == ':'
        args = nil
        @title = markup.strip[1..-1]
      else
        markup = markup.strip.split(' : ')
        args = markup.shift
        @title = markup.join(' : ')
      end

      args = args.nil? ? [] : args.split('.')
      tag_with_id = args.shift
      @slide_tag, @slide_id = tag_with_id.split '#' unless tag_with_id.nil?
      @slide_tag = nil if @slide_tag == ''
      @classes = args
    end

    def render(context)
      default_slide_tag = context.registers[:site].config['slide_tag']
      default_slide_title_tag = context.registers[:site].config['slide_title_tag']
      default_slide_tag ||= 'section'
      default_slide_title_tag ||= 'h2'

      @slide_tag ||= default_slide_tag
      @slide_title_tag ||= default_slide_title_tag

      id = @slide_id.nil? ? '' : %Q{ id="#{@slide_id}"}
      classes = @classes.empty? ? '' : " #{@classes.join(' ')}"

      result = ''
      result << %Q{<#{@slide_tag}#{id} class="slide#{classes}">}
      result << "<#{@slide_title_tag}>#{@title}</#{@slide_title_tag}>" unless @title.empty?
      result << %{<div class="content">} unless @title.empty?
      result << super
      result << '</div>' unless @title.empty?
      result << "</#{@slide_tag}>"
    end
  end
end

Liquid::Template.register_tag('slide', Jekyll::RenderSlideTag)
