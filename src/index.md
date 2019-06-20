---
title: Accueil
subtitle: La communauté pour faire pétiller l’énergie vitale des mères actives
layout: layouts/base.njk
tags:
- navigation
navorder: 1
---

## Precious Prana est une communauté de bien-être qui permet aux mères actives de se ressourcer, de savoir auto-gérer leur énergie et réussir l'équilibre entre vie personnelle, professionnelle et familiale.

{% if collections.evenements_futurs_homepage.length > 0 %}
  {% set evenement = collections.evenements_futurs_homepage | first %}
  {% if evenement.data.poster %}
{% poster src=evenement.data.poster, alt="{{ evenement.data.title }} le {{ evenement.date | displayDate }}, par Precious Prana", zoom="true" %}
  {% endif %}
Notre <strong>prochain événement</strong> aura lieu <strong>{{ evenement.date | displayDate }}</strong> : <a href="{{ evenement.url }}">{{ evenement.data.title }}</a>.
  {% if evenement.data.form_url %}
<strong>Pour vous inscrire :</strong> <a href="{{ evenement.data.form_url }}">{{ evenement.data.form_url }}</a>
  {% endif %}
{% endif %}

Retrouvez tous nos événements, futurs et passés, sur [la page qui leur est consacrée](/evenements/).

Pour plus de renseignements, [contactez-nous](/contact/).

Découvrez aussi le moodboard de notre précédent événement du mardi 21 mai, l’[atelier Aromathérapie avec Marie Duhammel](/evenements/2019/05/21/atelier-aromatherapie/).

{% image src="/images/woman-blowing-glitters-on-her-hands.jpg", caption="© Oleg Magni", zoom=false %}