---
title: Accueil
subtitle: La communauté pour faire pétiller l’énergie vitale des mères actives
layout: layouts/base.njk
tags:
- navigation
navorder: 1
---

<p class="intro">
Precious Prana est une communauté de bien-être qui permet aux mères actives de se ressourcer, de savoir auto-gérer leur énergie et réussir l'équilibre entre vie personnelle, professionnelle et familiale.
</p>

{% set events = collections.evenements_futurs_homepage %}
{% include "next-events.njk" %}

Retrouvez tous nos événements sur [la page qui leur est consacrée](/evenements/).

Pour plus de renseignements, [contactez-nous](/contact/).

{% image src="/images/woman-blowing-glitters-on-her-hands.jpg", caption="© Oleg Magni", zoom=false %}