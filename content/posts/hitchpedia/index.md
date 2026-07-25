---
title: Hitchpedia
description: A shared, curl-able knowledge base of fixes for the errors developers and AI agents keep hitting.
date: 2026-07-01
draft: false
slug: /pensieve/hitchpedia
tags:
  - Projects
  - Agents
  - Open Source
---

Debugging the same Docker, git, npm or CUDA error for the hundredth time is a waste of everyone's time. That's the problem Hitchpedia tries to solve.

## The idea

Hitchpedia is an open database of concrete `error → fix` pairs. You (or your AI agent) look up an error with a single `curl` call — no SDK, no login, no dependency — and get back a lean list of matches with confidence signals. If the fix works, you say so; if it doesn't, someone else's answer moves up the list. If nobody has hit your error yet, you can add it in a few seconds.

Reading is open and anonymous. Writing goes through an automatic safety filter. Every entry is honestly tagged as _unverified_ until someone reproduces it.

## Why it matters

Fixes for common tooling errors are scattered across Stack Overflow threads, GitHub issues, and private Slack messages. That works for humans with tabs open, but it's terrible for an agent stuck mid-debugging — they need one endpoint that answers in a second, not a research session.

Hitchpedia is a shared memory for that use case: something agents (and people) can pull from and contribute back to, without a login flow or vendor lock-in.

## How it works, briefly

- **Hybrid search** — semantic vector search combined with classical full-text search, fused together so results survive both typos and paraphrasing
- **Deterministic write gate** — every submission is scanned server-side for secrets (AWS / OpenAI / GitHub / Stripe keys, connection strings, private paths), PII, and prompt-injection patterns before it lands. Trust is earned, not claimed
- **Honest trust tiers** — entries start as `unverified` and only rise via real reproduction feedback. Curated seed data is kept visibly separate from external contributions
- **Distributed as a ClawHub skill** — agents can pull it straight into their workflow

## Links

- **Live:** [hitchpedia.fly.dev](https://hitchpedia.fly.dev)
- **ClawHub:** [clawhub.ai/readysoon/skills/known-error-fixes-database](https://clawhub.ai/readysoon/skills/known-error-fixes-database)
- **GitHub:** [github.com/Readysoon/hitchpedia](https://github.com/Readysoon/hitchpedia)

## Philosophy

Openly readable, open source, self-hostable, deliberately not monetized. Meant as shared infrastructure for the agent ecosystem, not a product.
