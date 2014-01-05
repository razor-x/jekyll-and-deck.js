---
layout: default
title: Deck Title
---

{% slide header %}

# {{ page.title }}

{% endslide %}{% slide %}

## Body

{% endslide %}{% slide %}

## More body

{% endslide %}{% slide footer %}

## Final slide
<p>
  <a href='http://www.w3.org/html/logo/'>
    <img alt='HTML5 Powered with CSS3 / Styling, and Semantics' height='64' src='http://io.evansosenko.com/jekyll-and-deck.js/assets/html5-badge-h-css3-semantics-8984c1445cb122441ac58bf5bb95be49.png' title='HTML5 Powered with CSS3 / Styling, and Semantics' width='165'>
  </a>
</p>
{% if site.social %}{% include social.html %}{% endif %}
{% endslide %}
