---
slug: perfin
title: Perfin
status: HackRice 13
timeframe: "2023"
visibility: public
previewLabel: demo thumbnail
summary: A data-informed personal finance planner that helps people build and adjust budgets around their income and location.
technologies:
  - Python
  - Flask
  - Flask-SocketIO
  - Gradio
  - OpenAI API
  - U.S. Census API
  - Chart.js
media:
  - type: image
    src: /images/projects/perfin-chart-preview.svg
    alt: Perfin budget overview with charts for overall spending, utilities, necessities, and discretionary income
    label: Budget chart overview
links:
  - label: Repository
    href: https://github.com/wellsch/hackdudes
---

## Overview

Perfin is a personal finance planner created by a four-person team for HackRice 13 as a Capital One challenge submission, where it was recognized as a category winner. A user provides monthly income and ZIP code information, and the application uses U.S. Census housing data to create an initial budget plan with rent, utilities, necessities, savings, and discretionary spending.

Users can then adjust the plan directly through interactive charts or describe a goal to a conversational assistant. The assistant returns structured budget changes so the charts update as the plan evolves.

## Technical notes

The project combines a Flask API with Flask-SocketIO updates, a Gradio chat interface, Census API lookups, and a JavaScript charting layer. The original project also includes sample prompts, a local browser workflow, and a roadmap for improving data sources, concurrency, and production readiness.
