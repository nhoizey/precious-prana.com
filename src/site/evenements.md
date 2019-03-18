---
title: Événements
layout: layouts/base.njk
tags:
  - navigation
navorder: 3
---

# Événements

<ul>
{%- for evenement in collections.evenements | reverse -%}
  <dl>
    <dt>{{ evenement.date | dateDisplay }}</dt>
    <dd><a href="{{ evenement.url }}">{{ evenement.data.title }}</a></dd>
  </dl>
{%- endfor -%}
</ul>