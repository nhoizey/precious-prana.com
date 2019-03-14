---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<h1>{{ title }}</h1>
<p class="date">Événement du <time datetime="{{ date }}">{{ date | dateDisplay }}</time></p>
{{ content | safe }}
