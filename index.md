---
layout: splash
title: "Anurag Mishra"
excerpt: "AI Research Scientist | MS in AI at RIT"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/header-bg.jpg
  actions:
    - label: "View CV"
      url: "/cv/"
feature_row:
  - image_path: assets/images/research-thumb.jpg
    alt: "Research"
    title: "Research"
    excerpt: "Exploring AI solutions in Time Series Analysis, NLP, and Computer Vision"
    url: "/research/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
  - image_path: assets/images/projects-thumb.jpg
    alt: "Projects"
    title: "Projects"
    excerpt: "Technical implementations and practical applications of AI/ML"
    url: "/projects/"
    btn_label: "View Projects"
    btn_class: "btn--primary"
  - image_path: assets/images/publications-thumb.jpg
    alt: "Publications"
    title: "Publications"
    excerpt: "Research papers and academic contributions"
    url: "/publications/"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row %}

# Welcome!

I am an AI Research Scientist and graduate student at Rochester Institute of Technology, focusing on advancing the boundaries of artificial intelligence and machine learning. My research interests lie at the intersection of Natural Language Processing, Computer Vision, and Deep Learning.

## Current Research

Currently working on innovative AI solutions in:
- **Time Series Analysis** for emergency management education
- **Natural Language Processing** for enhanced human-machine communication
- **Computer Vision** applications in educational technology

[Learn more about my research →](/research/){: .btn .btn--info}

## Recent Publications

{% for post in site.publications limit:2 %}
  {% include archive-single.html %}
{% endfor %}

[View all publications →](/publications/){: .btn .btn--info}

## Current Work

As a Graduate Research Assistant at RIT, I am working on:
- Developing AI-powered educational modules under NSF grant
- Conducting research in time series analysis and NLP
- Creating accessible learning solutions

[View my CV →](/cv/){: .btn .btn--info}

## Get in Touch

I'm always interested in research collaborations and discussions in AI and machine learning.

- Email: [am2552@g.rit.edu](mailto:am2552@g.rit.edu)
- Location: Rochester, NY
- [LinkedIn](https://linkedin.com/in/i-anuragmishra)
- [GitHub](https://github.com/i-anuragmishra) 