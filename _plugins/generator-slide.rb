module Jekyll
  class RenderSlideTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @slide_tag = markup.strip.split(' ').first
    end

    def render(context)
      default_slide_tag = context.registers[:site].config['slide_tag']
      default_slide_tag ||= 'section'
      @slide_tag ||= default_slide_tag

      result = ''
      result << %Q{<#{@slide_tag} class="slide">}
      result << super
      result << %Q{</#{@slide_tag}>}
    end
  end
end

Liquid::Template.register_tag('slide', Jekyll::RenderSlideTag)
