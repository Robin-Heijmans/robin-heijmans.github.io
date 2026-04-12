---
# the default layout is 'page'
title: Experience
icon: fas fa-briefcase
order: 1
---

<link rel="stylesheet" href="/assets/css/cards.css">
<link rel="stylesheet" href="/assets/css/media.css">
<link rel="stylesheet" href="/assets/css/section-highlight.css">
<link rel="stylesheet" href="/assets/css/timeline.css">

<div class="section-title-wrapper">
  <h2 class="section-title">Experience</h2>
</div>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
  <div class="projects-container">
  <section class="timeline">
    {% for project in site.data.experience %}
    <div class="timeline-item">
      <div class="timeline-content">
        <div class="project-card">
          <img src="{{ project.image }}" alt="{{ project.title }}">
          <h3>{{ project.title }}</h3>
          <h3>{{ project.period}}</h3>
          <a href="{{ project.link }}"  target="_blank" rel="noopener noreferrer" class="card-link"></a>
        </div>
      </div>
    </div>
    {% endfor %}
    </section>
    </div>
  </section>
</section>
