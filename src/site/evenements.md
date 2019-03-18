---
title: Événements
layout: layouts/base.njk
---

<ul>
{%- for evenement in collections.evenements -%}
  <dl>
    <dt>{{ evenement.data.date | dateDisplay }}</dt>
    <dd><a href="{{ evenement.data.url }}">{{ evenement.data.title }}</a></dd>
  </dl>
{%- endfor -%}
</ul>