---
title: ParaWorld
description: A tiny browser-sized city builder — zone, watch the economy, try to keep the budget black.
date: 2026-10-01
draft: false
slug: /projects/paraworld
tags:
  - Game
  - Simulation
  - Three.js
---

A city builder in a browser tab. Small enough to understand end-to-end, deep enough to make you second-guess your zoning plan.

## The idea

Zone some housing. Zone some commerce. Watch demand bars swing. Keep the budget black, traffic flowing, taxes bearable. Fail at any of those and the city tells you — in red numbers, stalled demand, and lots that refuse to build.

ParaWorld is a tiny SimCity-shaped sim that runs in the browser with no tutorial, no ads, no account. The UI is in German because that's what I was in the mood for when I started it.

## What's modelled

- **Zones** — housing, commerce, IT, industry, each with its own demand curve and tax contribution
- **Economy** — monthly budget per zone and service, trade (produced / sold / imported), adjustable tax rate
- **Terrain** — elevation and steepness drive what can be built where (single-family homes above a certain height, skyscrapers only on flatter ground)
- **Jobs & housing** — residents commute to jobs; unemployment feeds back into demand
- **Traffic** — a flow indicator you can trust about as far as you can trust any sim's traffic indicator
- **Services** — roads, avenues, metro, parks, all costed per month

## Why I built it

I wanted to see how far you can push a city sim with a tiny tech surface — one browser tab, no backend state. It also turned out to be the best way to find out why skyscrapers in actual SimCity never build on hills.

## Links

- **Live:** [paraworld.fly.dev](https://paraworld.fly.dev)
- **GitHub:** [github.com/Readysoon/paraworld](https://github.com/Readysoon/paraworld)
