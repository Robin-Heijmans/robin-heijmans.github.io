---
layout: page
title: "Racing engine"
permalink: /projects/racing-engine/
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
          <iframe src="https://www.youtube.com/embed/m3WC36fD0U8" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="feature-content">
        <h3><b>My Work</b></h3>
        <ul>
          <li>Connection between the actions of the NPC cars and the realistic vehicle system</li>
          <li>Creating the behaviour for the NPC cars</li>
          <li>Creating a custom blender add-on for setting up the level and exporting it for our engine</li>
          <li>Hot reloading for editor mode in our engine</li>
        </ul>
        <p>
          The racing engine was made using a snapshot of the <i>bee engine</i>, which is an educational C++ engine made and updated by the 2nd year programming teachers of Breda University of Applied Sciences. It had basic entity component system (ECS) functionality setup, among other things. I worked in a team consisting of 6 programming students total. It was our task to turn this into a racing engine with a blender-to-engine pipeline that can easily be used by artists and designers to make a racing game.
        </p>
      </div>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
  <h3><b>Racing Agents</b></h3>
  <p>
  We were going for realistic car physics, so our cars use a realistic simulation of a spark-ignition engine. This makes controlling the cars with AI a lot more difficult, as it adds a lot more dependent variables to controlling the cars. I made the an interface component that stores all variables used by the physics system and can thus be used to control the cars.
  </p>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 50%;">
        <div class="video-container">
          <video controls>
            <source src="/assets/videos/racing-engine/AI_vs_AI.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <figcaption>
            In the video are no players racing, it is <i>racing agents</i> vs <i>racing agents</i>.
          </figcaption>
        </div>
      </div>
      <div class="feature-content">
        <p>
        The racing agents can drive autonomously with the AI system I made, using it to set the variables of the component used by the physics simulation. With this component both players and the AI can:
        <ul>
          <li>Increase/decrease throttle</li>
          <li>Brake</li>
          <li>Steer</li>
          <li>Engage the clutch</li>
          <li>Switch gears</li>
          <li>Engage the starter</li>
        </ul>
        The AI changes these variables depending on the target node and the recommended speed for the segment they are currently on. If the revolutions per minute (RPM) gets too low or high, it will switch gears (down or up accordingly).
        </p>
      </div>
    </section>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
    <h3><b>Blender-To-Engine Pipeline</b></h3>
    <p>
    One of the requirements of the project was to create a blender-to-engine pipeline that the artists and designers can use to create a racing game using our engine. I contributed to this pipeline by making add-ons that can be loaded in blender and used to set variables used in the engine. When loading in a level/scene these variables are used to create entities with the corresponding components. 
    </p>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 50%;">
        <figure>
          <img src="assets/images/racing-engine/blender-beetle-properties.png" alt="beelte-properties">
          <figcaption>Properties in the object inspector that can be set for our racing engine (<i>beetle</i>).</figcaption>
        </figure>
      </div>
      <div class="feature-content">
        <p>
        This add-on adds a custom properties window to the selected object in blenders object inspector. In this window, the user can use the checkboxes to mark an object for the desired component. Once checked it will open a drop-down window, in which you can set related variables for that component.
        </p>
      </div>
    </section>
    <section class="feature-block media-right">
      <div class="feature-media" style="flex: 1 1 50%;">
        <figure>
          <img src="assets/images/racing-engine/blender-export-button.png" alt="export-button">
          <figcaption>Add-on that adds an export button and file browser for auto-exporting to <i>gltf</i>.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
        <p>
        We also used the <i>gltf</i> file format for loading in levels and <i>.dds</i> for textures. When exporting a level/scene from blender we had to export it to <i>gltf</i> and changes the names of the textures to end in <i>.dds</i> from <i>.png</i> and <i>.jpg</i>. We also convert the textures to the right format using NVIDIA texture tools exporter. To simplify the steps necessary, I created an add-on that auto exports the blender level to <i>gltf</i>, convertes the textures and replaces the formats in the <i>gltf</i> to <i>dds</i>.
        </p>
      </div>
    </section>
  </section>
</section>
