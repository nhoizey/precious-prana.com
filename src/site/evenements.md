---
title: Événements
layout: layouts/base.njk
tags:
  - navigation
navorder: 3
---

# Événements

<dl>
  {%- for evenement in collections.evenements | reverse -%}
    <dt>{{ evenement.date | displayDate }}</dt>
    <dd><a href="{{ evenement.url }}">{{ evenement.data.title }}</a></dd>
  {%- endfor -%}
</dl>
