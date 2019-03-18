---
title: Événements
layout: layouts/base.njk
---

<ul>
{%- for evenement in collections.evenements -%}
  <li><time datetime="{{ evenement.data.date }}">{{ evenement.data.date | dateDisplay }}</time> : <a href="{{ evenement.data.url }}">{{ evenement.data.title }}</a></li>
{%- endfor -%}
</ul>