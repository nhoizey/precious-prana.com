---
title: Événements
layout: layouts/base.njk
tags:
  - navigation
navorder: 3
---

# Événements

{% if collections.evenements_futurs.length == 0 %}
  Il n'y a pour l'instant aucun nouvel événement programmé. Revenez ici très prochainement, ou abonnez-vous à <a href="https://facebook.com/preciousprana" class="facebook"> notre page Facebook</a> pour ne pas rater nos prochains événements.
{% else %}

## À venir

<dl>
{%- for evenement in collections.evenements_futurs -%}
  <dt>{{ evenement.date | displayDate }}</dt>
  <dd><a href="{{ evenement.url }}">{{ evenement.data.title }}</a></dd>
{%- endfor -%}
</dl>

{% endif %}

## Événements précédents

<dl>
  {%- for evenement in collections.evenements_passes | reverse -%}
    <dt>{{ evenement.date | displayDate }}</dt>
    <dd><a href="{{ evenement.url }}">{{ evenement.data.title }}</a></dd>
  {%- endfor -%}
</dl>
