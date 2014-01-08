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
    <img alt='HTML5 Powered with CSS3 / Styling, and Semantics' height='64' src='{% asset_path html5-badge-h-css3-semantics.png %}' title='HTML5 Powered with CSS3 / Styling, and Semantics' width='165'>
  </a>
</p>
{% if site.social %}{% include social.html %}{% endif %}
{% endslide %}
