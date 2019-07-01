---
title: Événements
layout: layouts/base.njk
tags:
  - navigation
navorder: 3
---

# Événements

{% set events = collections.evenements_futurs %}
{% include "next-events.njk" %}

## Événements précédents

<dl>
  {%- for evenement in collections.evenements_passes | reverse -%}
    <dt>{{ evenement.date | displayDate }}</dt>
    <dd><a href="{{ evenement.url }}">{{ evenement.data.title }}</a></dd>
  {%- endfor -%}
</dl>
