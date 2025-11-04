---
# the default layout is 'page'
title: Who am I?
icon: fas fa-info-circle
order: 1
---

<link rel="stylesheet" href="/assets/css/cards.css">
<link rel="stylesheet" href="/assets/css/cards_colors_about.css">
<link rel="stylesheet" href="/assets/css/links.css">
<link rel="stylesheet" href="/assets/css/highlighted_projects.css">
<link rel="stylesheet" href="/assets/css/section-highlight.css">
<section class="outlined-section">
<p>
I am a second-year Programming student at Breda University of Applied Sciences (BUas) with a degree in Applied Mathematics. I have loved mathematics since high school, it just made sense to me in a way that other subjects didn’t. I enjoyed solving exercises and applying the rules we learned in class. So, after high school I chose to pursue a degree in mathematics, which led me to the Applied Mathematics study at Fontys. 
</p>
<p>
During my studies, I not only deepened my understanding of mathematics but also learned programming through Python and MATLAB. I quickly realized that I loved coding just as much as math—it felt like a perfect fit. During my graduation internship I realized I wanted programming to play a bigger role in my career, particularly in the gaming industry, which has always been a passion of mine. As a Games Programmer, I get to combine the best of both worlds: programming and mathematics. This realization led me to BUas, where I am currently pursuing a degree in Games Programming and enjoying myself to the fullest.
</p>
</section>

<section class="outlined-section">
<h2>My Background</h2>

<div class="projects-container">
  {% for project in site.data.background %}
    <div class="card-wrapper">
      <div class="project-card">
        <img src="{{ project.image }}" alt="{{ project.title }}">
        <h3>{{ project.title }}</h3>
        <h3>{{ project.period}}</h3>
        <a href="{{ project.link }}"  target="_blank" rel="noopener noreferrer" class="card-link"></a>
      </div>
    </div>
  {% endfor %}
</div>
</section>
