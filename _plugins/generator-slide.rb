module Jekyll
  class RenderSlideTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      markup = markup.strip.split(' ').first
      args = markup.nil? ? [] : markup.split('.')
      tag_with_id = args.shift
      @slide_tag, @slide_id = tag_with_id.split '#' unless tag_with_id.nil?
      @slide_tag = nil if @slide_tag == ''
      @classes = args
    end

    def render(context)
      default_slide_tag = context.registers[:site].config['slide_tag']
      default_slide_tag ||= 'section'
      @slide_tag ||= default_slide_tag

      id = @slide_id.nil? ? '' : %Q{ id="#{@slide_id}"}
      classes = @classes.empty? ? '' : " #{@classes.join(' ')}"

      result = ''
      result << %Q{<#{@slide_tag}#{id} class="slide#{classes}">}
      result << super
      result << %Q{</#{@slide_tag}>}
    end
  end
end

Liquid::Template.register_tag('slide', Jekyll::RenderSlideTag)
