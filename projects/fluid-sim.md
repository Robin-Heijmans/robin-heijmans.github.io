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

<section class="outlined-section-wrapper">
  <section class="outlined-section">
  <h3><b>Spatial Lookup</b></h3>
  <p>
  There are a lot of loops over all particles that happen in all 3 parts of the Navier-Stokes equation when applied to particles, which is suboptimal at best when trying to create real-time interaction. Luckily for us, there are ways to massively speed this up. There is a spatial lookup algorithm that only looks at the relevant particles in range when doing the physics calculations and excludes all of the distance checks for the particles that are guarenteed to be too far away.
  </p>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 50%;">
        <figure>
          <img src="assets/images/fluid-sim/spatial-lookup-2d-example.png" alt="spatial-lookup">
          <figcaption>Highlighted spatial lookup example. Red square is 3x3 grid of cells containing possibly relevant particles. Red circle is the area of the smoothing kernel. Red dot is the location of particle 4.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
        <p>
          Lets look at a 2D example for simplicity, we have a rectangle that contains all particles in a volume. The rectangle can be split into cells creating a uniform grid. All of these cells can be given an index (the light green numbers). The particles have indices as well, allowing for the storage of particle indices into cells. Thus giving direct acces to particles within a cell. If the size of the cells is set to the radius of the smoothing kernel (maximum distance that particles impact each other), then we can easily find all particles close enough to impact the calculations of particle <i>i</i> (the particle we are calculating the forces for). All we have to do is loop over 9 cells in the 2D grid to get all relevant particles. This can then be expanded to 3D, where 27 cells give all particles in range.
        </p>
      </div>
    </section>
    <p>
    A limitation of this spatial lookup algorithm on the GPU is the limited memory we have and that we have to assign the size of buffers before actually filling them. There are ways around this and the one I use is to use duplicate cell IDs after reaching a certain limit. This will mean that sometimes the algorithm returns particles in a cell with the same ID that is in a completely different part of the volume. However, these particles will not impact the calculations, because they will not pass the distance check. This is something we have to live with when simulating an <i>infinite space</i> with <i>finite memory</i>.
    </p>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
    <h3><b>Physics Object Detection And Resolution</b></h3>
    <p>
    Making the fluid simulation interactive is a big focus of my project, and this includes collision detection and resolution. Unreal Engine has 3 primitive collision shapes: <i>Box, Sphere</i> and <i>Capsule</i>. The plugin currently supports all three of these shapes. Below we will take a closer look at how this is accomplished per shape.
    </p>
    <p>
    In the videos you can see a red box and lines, which are for debugging purposes. The overlapping box shows the area that is checked against the volume box, to determine the area that is possibly colliding. All particles in the cells of this overlapping area are checked against the actual box and if they are colliding it will resolve it. The colliding particles are shown in the video with the red lines in the direction the particles are displaced.
    </p>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 60%;">
        <div class="video-container">
          <div class="youtube-video-container">
            <iframe src="https://www.youtube.com/embed/sebRuXyLnOQ" frameborder="0" allowfullscreen></iframe>
          </div>
          <figcaption>
            Video showcasing the box collision resolution.
          </figcaption>
        </div>
      </div>
      <div class="feature-content">
        <p>
          In the box collision video you can see a showcase of the box collision resolution in the real-time simulation. The box object gets detected correctly and the collision gets resolved for all particles, creating a displacement in the fluid. This displacement causes ripples to go through the fluid that are shown by the velocity of particles carrying over to each other (you can see this with the color of the particles), while stabalizing over time.
        </p>
      </div>
    </section>
    <section class="feature-block media-right">
      <div class="feature-media" style="flex: 1 1 50%;">
        <div class="video-container">
          <div class="youtube-video-container">
            <iframe src="https://www.youtube.com/embed/DusIJRBt9AM" frameborder="0" allowfullscreen></iframe>
          </div>
          <figcaption>
            Video showcasing the sphere collision resolution.
          </figcaption>
        </div>
      </div>
      <div class="feature-content">
        <p>
          In the sphere collision video you can see a showcase of the sphere collision resolution in the real-time simulation. Again you can see that the object gets detected correctly and the resolution causes ripples through the fluid that deteriorate over time. It was quite difficult to get collision to correctly resolve for spheres scaled differently across the axii. This transform creates an ellipsoid, which is more complex to resolve then a sphere. To solve this we can detect and resolve the collision in the local space of the unit sphere (radius = 1). With the transform of the overlapping sphere (ellipsoid) we can transform the possibly colliding particle locations to the local space of the unit sphere, and determine the detection and calculate the displacement there, before transforming this back into local space of the fluid volume.
        </p>
      </div>
    </section>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 50%;">
        <div class="video-container">
          <div class="youtube-video-container">
            <iframe src="https://www.youtube.com/embed/xg_dJKGgrZo" frameborder="0" allowfullscreen></iframe>
          </div>
          <figcaption>
            Video showcasing the capsule collision resolution.
          </figcaption>
        </div>
      </div>
      <div class="feature-content">
        <p>
          In the capsule collision video you can see a showcase of the capsule collision resolution in the real-time simulation. Again you can see that the object gets detected correctly and the resolution causes ripples through the fluid that deteriorate over time. Capsules are interesting objects to resolve collisions for, because they consist of a cylinder and two hemispheres at the ends. The radius of the hemispheres is by default the same as the radius of the cylinder. In a technical sense it is described by a cylinderheight and radius, this is all the information required to determine collisions. To resolve these collisions you can determine the closestpoint to the center line of the cylinder and use sphere collision resolution to resolve the collision.
        </p>
      </div>
    </section>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
    <h3><b>UE Plugin Usability</b></h3>
    <p>
    Unreal Engine is a very big engine, that has been developed since 1995. As you can probably imagine, to develop something like this you need a structure to keep so the engine doesn’t fall apart. So when creating this plugin I had to learn a lot about UEs structure and how to expand on it. The most important parts for this plugin is to contain the fluid volume to <i>components</i>, so these <i>components</i> can be added to <i>actors</i> and placed in the world.
    </p>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 60%;">
        <figure>
          <img src="assets/images/fluid-sim/adding-plugin-components.png" alt="adding-components">
          <figcaption>Screenshot of adding plugin components to an actor blueprint.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
        <p>
       This always user to add the <i>bounding fluid component</i> to their <i>actors</i>. In the attached image you can see that you can very easily add the plugin <i>components</i> to an <i>actor</i>. To simplify finding <i>components</i> from the plugin, we gave it a name (Atlas), which you can use to find all <i>components</i> from the plugin.
        </p>
      </div>
    </section>
    <p>
    A lot of settings have been made adjustable in blueprints, so users can play around with and customize the simulation to their wants and needs. These variables are set to a default that will give a similar result to the videos showcasing the simulation running on the GPU (at the top of the page). Again the variable sections related to the plugin are labeled with Atlas. The most interesting variables are the number of particles, as you will need to increase this if you want a larger volume but similar filling.
    </p>
    <section class="feature-block media-right">
      <div class="feature-media" style="flex: 1 1 70%;">
        <figure>
          <img src="assets/images/fluid-sim/viewport-bounding-volume.png" alt="adjustable-variables">
          <figcaption>Screenshot of the viewport of the blueprint, showcasing the bounding volume box and the spawn particle box.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
        <p>
          To give the user an idea of the size of the volume and where the simulation is contained to, in the viewport image you can see the box that outlines the volume. You can also see a smaller box inside, which is the location that the particles will be spawned at. The user can freely scale, rotate and move these boxes around to create the situation they want.
        </p>
      </div>
    </section>
  </section>
</section>
