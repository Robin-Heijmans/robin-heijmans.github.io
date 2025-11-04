---
layout: page
title: Projects
icon: fas fa-archive
order: 2
---

<link rel="stylesheet" href="/assets/css/cards.css">
<link rel="stylesheet" href="/assets/css/cards_colors_about.css">
<link rel="stylesheet" href="/assets/css/section-highlight.css">
<link rel="stylesheet" href="/assets/css/filter_button.css">

<div class="project-filter-dropdown">
  <button id="filter-toggle">Filter ▼</button>
  <div id="filter-menu" class="filter-menu" style="display: none;">
    {% for tag in site.data.tags %}
      <label>
        <input type="checkbox" class="filter-checkbox" value="{{ tag[0] }}">
        {{ tag[0] }}
      </label>
    {% endfor %}
  </div>
</div>

<section class="outlined-section">

<div class="projects-container">
  {% for project in site.data.projects %}
    <div class="card-wrapper">
      <div class="project-card" data-tags="{{ project.tags | join: ',' }}">
        <img src="{{ project.image }}" alt="{{ project.title }}">
        <h3>{{ project.title }}</h3>
        <a href="{{ project.link }}" class="card-link"></a>

        {% assign all_tags = project.tags | default: [] %}

        {% if project.people %}
          {% assign people_tag_text = "" %}
          {% assign people_tag_color = "#fff" %}
          {% assign people_tag_bg = "#6C63FF" %}
          {% if project.people > 1 %}
            {% assign people_tag_text = "👥 " | append: project.people %}
          {% else %}
            {% assign people_tag_text = "👤"| append: 1 %}
          {% endif %}
          {% assign all_tags = all_tags | push: people_tag_text %}
        {% endif %}

        {% if all_tags.size > 0 %}
          <div class="tags">
            {% for tag in all_tags %}
              {% assign tag_data = site.data.tags[tag] %}
              {% if tag_data %}
                <span class="tag"
                  style="background-color: {{ tag_data.color }}; color: {{ tag_data.text_color }};">
                  {{ tag }}
                </span>
              {% else %}
                {% if tag contains "👤" or tag contains "👥" %}
                  <!-- People tag uses the default text color for consistency -->
                  <span class="tag" style="color: #fff; background-color: #6C63FF;">
                    {{ tag }}
                  </span>
                {% else %}
                  <span class="tag">{{ tag }}</span>
                {% endif %}
              {% endif %}
            {% endfor %}
          </div>
        {% endif %}

      </div>
    </div>
  {% endfor %}
</div>
</section>
<script src="/assets/js/filter_tags_event_listner.js"></script>
