---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<h2>{{ title }}</h2>
<p class="date">Événement du <time datetime="{{ date }}">{{ date | dateDisplay }}</time></p>
{{ content | safe }}
