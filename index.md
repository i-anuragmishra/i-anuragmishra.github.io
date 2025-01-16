---
layout: default
title: Home
---

<div class="section-card" id="about">
  <h2>About Me</h2>
  <div class="content-grid">
    <div class="text-content">
      <p>I'm an AI Research Scientist and graduate student at Rochester Institute of Technology, focusing on advancing the boundaries of artificial intelligence and machine learning. My research interests lie at the intersection of Natural Language Processing, Computer Vision, and Deep Learning.</p>
      <p>Currently, I'm conducting research in time series analysis and developing novel approaches to enhance human-machine communication through advanced NLP techniques. My work aims to bridge the gap between theoretical machine learning concepts and their practical applications in solving real-world problems.</p>
    </div>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-number">4.0</span>
        <span class="stat-label">GPA</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">2+</span>
        <span class="stat-label">Years Research Experience</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">5+</span>
        <span class="stat-label">Projects Completed</span>
      </div>
    </div>
  </div>
</div>

<div class="section-card" id="research">
  <h2>Current Research</h2>
  <div class="research-grid">
    <div class="research-area">
      <div class="research-icon">🔍</div>
      <h3>Time Series Analysis</h3>
      <p>Developing innovative approaches to time series analysis with applications in emergency management and predictive modeling.</p>
    </div>
    <div class="research-area">
      <div class="research-icon">🤖</div>
      <h3>Natural Language Processing</h3>
      <p>Advancing the boundaries of human-machine communication through sophisticated NLP techniques and semantic understanding.</p>
    </div>
    <div class="research-area">
      <div class="research-icon">👁️</div>
      <h3>Computer Vision</h3>
      <p>Exploring deep learning applications in computer vision for real-world problem solving and pattern recognition.</p>
    </div>
  </div>
</div>

{% assign sorted_publications = site.publications | sort: "date" | reverse %}
{% if sorted_publications.size > 0 %}
<div class="section-card" id="recent-publications">
  <h2>Recent Publications</h2>
  <div class="publications-grid">
    {% for publication in sorted_publications limit:2 %}
    <div class="publication-item">
      <span class="pub-type">{{ publication.type }}</span>
      <h3>{{ publication.title }}</h3>
      <p class="pub-authors">{{ publication.authors }}</p>
      <p class="pub-venue">{{ publication.venue }}</p>
      <p class="pub-abstract">{{ publication.abstract }}</p>
      <div class="pub-tags">
        {% for tag in publication.tags %}
        <span>{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div>
  <p class="see-more"><a href="{{ '/publications' | relative_url }}">See all publications →</a></p>
</div>
{% endif %} 