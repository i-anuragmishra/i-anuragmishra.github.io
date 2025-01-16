---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
---

{% include base_path %}

# Featured Projects

## Emergency Management Prediction System
**AI-Powered Educational Platform**
* Built with Python, TensorFlow, and PyTorch
* Real-time prediction system for emergency scenarios
* 92% accuracy in pattern recognition
* [View Project](https://github.com/i-anuragmishra/emergency-prediction)

## Intelligent Learning Assistant
**NLP-Based Educational Tool**
* BERT-based content analysis
* Automated feedback generation
* Personalized learning paths
* Processing 1000+ daily interactions
* [View Demo](https://github.com/i-anuragmishra/nlp-education)

## Visual Learning Aid System
**Computer Vision for Accessibility**
* YOLOv5 for object detection
* Real-time sign language recognition
* Integration with educational platforms
* 95% accuracy in sign recognition
* [Project Details](https://github.com/i-anuragmishra/visual-aid)

## Railway Scheduling Optimizer
**ML-Powered Transportation System**
* Predictive maintenance modeling
* Real-time schedule optimization
* Anomaly detection system
* 12% improvement in efficiency
* [View Code](https://github.com/i-anuragmishra/railway-optimizer)

# Technical Skills

## Programming Languages
* Python (Advanced)
* C/C++ (Intermediate)
* R (Intermediate)
* JavaScript (Basic)
* SQL (Intermediate)

## Machine Learning & AI
* TensorFlow
* PyTorch
* Scikit-learn
* BERT
* SpaCy
* OpenCV

## Tools & Technologies
* Git
* Docker
* AWS
* Hadoop
* MongoDB
* Linux/Unix

{% for post in site.portfolio %}
  {% include archive-single.html %}
{% endfor %} 