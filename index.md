---
layout: default
title: Deck Title
---

{% slide header %}

<div style="text-align:center">
  <button id="auth-login" style="display:none">login</button>
  <button id="auth-logout" style="display:none">logout</button>
</div>

# {{ page.title }}

{% endslide %}{% slide %}

## Body

{% include note.html id=1 %}

{% endslide %}{% slide.my-class %}

## More body

{% include note.html id="two" %}

{% endslide %}{% slide footer %}

## Final slide
<p>
  <a href='http://www.w3.org/html/logo/'>
    <img alt='HTML5 Powered with CSS3 / Styling, and Semantics' height='64' src='{% asset_path html5-badge-h-css3-semantics.png %}' title='HTML5 Powered with CSS3 / Styling, and Semantics' width='165'>
  </a>
</p>
{% if site.social %}
  {% capture social_buttons %}{% include social-buttons.html %}{% endcapture %}
  {{ social_buttons | strip_newlines }}
{% endif %}

{% endslide %}
