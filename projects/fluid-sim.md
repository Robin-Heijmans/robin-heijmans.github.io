---
layout: page
title: "Particle Based Fluid Simulation"
permalink: /projects/fluid-sim/
---

<link rel="stylesheet" href="/assets/css/media.css">
<link rel="stylesheet" href="/assets/css/section-highlight.css">

<div class="section-title-wrapper">
  <h2 class="section-title">{{ page.title }}</h2>
</div>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
      <div class="feature-media">
        <div class="youtube-video-container">
          <iframe src="https://www.youtube.com/embed/ia6CCin7r_s?si=ZE3wj-9RVsyW2oLM" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="feature-content">
        <h3><b>My Contribution</b></h3>
        <ul>
          <li>Implementation of complex Navier-Stokes physics equations</li>
          <li>Improving performance with spatial lookup</li>
          <li>Unreal engine (UE) physics object detection and resolution</li>
          <li>UE GPU impplementation of the particle simulation</li>
          <li>Setting up plugin usability</li>
        </ul>
        <p>
          You can check out a blogpost I made on this project using the following link: <a href="https://medium.com/@robinheijmans/real-time-particle-based-fluid-simulation-plugin-for-unreal-engine-b38294f6a507" target="_blank" rel="noopener noreferrer">Real-Time Particle Based Fluid Simulation Plugin for Unreal Engine</a>. This project was made in <b>Unreal Engine 5.5</b>, where the simulation was developed mostly in C++ and hlsl compute shaders.
        </p>
      </div>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
  <h3><b>Physics Equations</b></h3>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 50%;">
        <div class="video-container">
          <div class="youtube-video-container">
            <iframe src="https://www.youtube.com/embed/xQSPUb0sSI0?si=2COWDVelSZORzYmj" frameborder="0" allowfullscreen></iframe>
          </div>
          <figcaption>
            Video showcasing the behaviour of the fluid simulation with the Navier-Stokes equation. The color indicates the velocity a particle is moving, blue is a low velocity, red is a high velocity.
          </figcaption>
        </div>
      </div>
      <div class="feature-content">
        <p>
        I use Navier-Stokes equation for simulating the behaviour of fluids using particles. This equation consists of 3 different parts:
        <ul>
          <li>Pressure forces</li>
          <li>External forces</li>
          <li>Viscosity forces</li>
        </ul>
        Pressure is what determines the density of the fluid, external forces are forces being applied to the fluid from other objects and viscosity is what lets the particles move together.
        </p>
      </div>
    </section>
    <div class="feature-content">
        <p>
        In the video you can see that the pressure causes the particles to move away from the center where they start clumped up together. At the end the particles have mostly settled and the distance between particles is determined by the pressure forces. There is only gravity being applied as an external force, so not much to see other then the partciles settling at the bottom of the bounding box. The viscosity is what lets partciles adjust to their surroundings more quickly, in the video you can see this in how the different colors are moving through the simulation in patches.
        </p>
      </div>
  </section>
</section>
