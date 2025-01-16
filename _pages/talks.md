---
layout: archive
title: "Talks and Presentations"
permalink: /talks/
author_profile: true
---

{% include base_path %}

# Conference Presentations

## Time Series Analysis in Emergency Management
**RIT Research Symposium** (2023)
* Presented research on predictive modeling for emergency scenarios
* Demonstrated real-time analysis systems
* Discussed applications in deaf education
* [View Slides](/files/presentations/emergency-management-2023.pdf)

## AI Applications in Educational Technology
**AI in Education Workshop** (2023)
* Discussed integration of AI in educational platforms
* Showcased adaptive learning systems
* Presented case studies on accessibility
* [View Presentation](/files/presentations/ai-education-2023.pdf)

# Technical Talks

## Deep Learning Workshop Series
**RIT AI Club** (2023)
* Introduction to Neural Networks
* Advanced PyTorch Applications
* Natural Language Processing
* [Workshop Materials](/files/workshops/dl-series-2023.pdf)

## Machine Learning in Practice
**Industry Connect Series** (2023)
* Real-world ML applications
* Best practices in deployment
* Performance optimization
* [Session Recording](/files/talks/ml-practice-2023.mp4)

# Invited Talks

## Future of AI in Education
**Department Seminar Series** (2023)
* Current trends in AI education
* Challenges and opportunities
* Future research directions
* [Seminar Notes](/files/talks/ai-education-future-2023.pdf)

## Accessibility in Technology
**Inclusive Design Workshop** (2023)
* AI for accessibility
* Universal design principles
* Case studies and implementations
* [Workshop Materials](/files/workshops/accessibility-2023.pdf)

{% for post in site.talks reversed %}
  {% include archive-single-talk.html %}
{% endfor %} 