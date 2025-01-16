---
layout: home
author_profile: true
classes:
  - landing
  - dark-theme
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/header-bg.jpg
  actions:
    - label: "View CV"
      url: "/Resume_Anurag_RIT.pdf"
excerpt: >
  AI Research Scientist specializing in Machine Learning, NLP, and Computer Vision.
  Currently pursuing MS in AI at Rochester Institute of Technology.
feature_row:
  - image_path: /assets/images/research-thumb.jpg
    alt: "Research"
    title: "Research Focus"
    excerpt: "Time Series Analysis, Natural Language Processing, and Computer Vision applications in real-world problem solving."
    url: "/research/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
  - image_path: /assets/images/publications-thumb.jpg
    alt: "Publications"
    title: "Publications"
    excerpt: "Academic papers and research contributions in AI and Machine Learning."
    url: "/publications/"
    btn_label: "View Publications"
    btn_class: "btn--primary"
  - image_path: /assets/images/projects-thumb.jpg
    alt: "Projects"
    title: "Projects"
    excerpt: "Featured projects showcasing practical applications of AI and ML technologies."
    url: "/projects/"
    btn_label: "View Projects"
    btn_class: "btn--primary"
---

{% include feature_row %}

## Current Research

My research focuses on advancing the boundaries of artificial intelligence and machine learning, with particular emphasis on:

- **Time Series Analysis**: Developing innovative approaches for emergency management and predictive modeling
- **Natural Language Processing**: Enhancing human-machine communication through advanced NLP techniques
- **Computer Vision**: Exploring deep learning applications for real-world problem solving

## Recent Publications

{% assign recent_papers = site.publications | sort: "date" | reverse | limit: 2 %}
{% for paper in recent_papers %}
<div class="publication-card">
  <h3><a href="{{ paper.url }}">{{ paper.title }}</a></h3>
  <p class="authors">{{ paper.authors }}</p>
  <p class="venue">{{ paper.venue }}</p>
  <p class="abstract">{{ paper.excerpt }}</p>
</div>
{% endfor %}

[View All Publications](/publications/){: .btn .btn--primary} 