---
layout: single
title: "CV"
permalink: /cv/
author_profile: true
---

{% include base_path %}

Education
======
* M.S. in Artificial Intelligence, Rochester Institute of Technology, 2023-2025
* B.Tech. in Computer Science, Sikkim Manipal Institute of Technology, 2019-2023

Research Experience
======
* Graduate Research Assistant (2023-Present)
  * Rochester Institute of Technology
  * Research: Time Series Analysis, NLP, Emergency Management Education
  * Supervisor: Professor [Name]

* Research Intern (2022)
  * DRDO
  * Research: Fuzzy Number Theory in AI/ML
  * Supervisor: Dr. [Name]

Work Experience
======
* Graduate Student Assistant (2023-Present)
  * Rochester Institute of Technology
  * Duties:
    * Developing educational modules
    * Contributing to NSF-funded research
    * Emergency management education

* Data Science Intern (2022)
  * CENTRE FOR RAILWAY INFORMATION SYSTEMS
  * Duties:
    * Optimized train scheduling algorithms
    * Developed ML models for predictive maintenance
    * Implemented data processing pipelines

Skills
======
* Programming Languages
  * Python, C/C++, R, JavaScript, Dart, SQL
* Machine Learning & AI
  * TensorFlow, PyTorch, Scikit-learn
  * Transformers, BERT, SpaCy
  * OpenCV, Latex
* Tools & Technologies
  * Git, Docker, AWS
  * Hadoop, MongoDB, PostgreSQL
  * Flutter

Publications
======
{% for post in site.publications reversed %}
  {% include archive-single-cv.html %}
{% endfor %}

Projects
======
{% for post in site.projects reversed %}
  {% include archive-single-cv.html %}
{% endfor %}

Awards
======
* Prime Minister Scholarships for Engineering
* Macquarie Group Scholarship from edX
* Silver Elite Rank in NPTEL Data Science Course 