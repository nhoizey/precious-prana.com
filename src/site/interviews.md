---
title: Interviews
layout: layouts/base.njk
---

# Interviews des intervenantes

<ul>
{%- for interview in collections.interviews -%}
  <li><a href="{{ interview.url }}">{{ interview.data.title }}</a></li>
{%- endfor -%}
</ul>
