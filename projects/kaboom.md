---
layout: page
title: "Kaboom: Return of Kaboom"
permalink: /projects/kaboom-return-of-kaboom/
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
          <iframe src="https://www.youtube.com/embed/zk-24I7OJf8" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="feature-content">
        <h3><b>My Contribution</b></h3>
        <ul>
          <li>Neural network (NN) trained for pathfinding of enemy NPC airplanes</li>
          <li>Interactions between the player and enemy NPC airplanes</li>
          <li>Patrol behaviour for enemy NPC airplanes</li>
        </ul>
        <p>
          You can check out our itch.io page and download/play the game using the following link: <a href="https://buas.itch.io/team-ginger" target="_blank" rel="noopener noreferrer">Kaboom: Return of Kaboom</a>. This project was made in <b>Unreal Engine 5.4</b>, where we only used blueprints.
        </p>
      </div>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
  <h3><b>Enemy NPC airplane interaction with the player</b></h3>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 70%;">
        <div class="video-container">
          <video controls>
            <source src="/assets/videos/kaboom/airplanes_interaction.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <figcaption>
            This video shows the interaction between the player and enemy NPC airplanes. You can see that the airplanes circle the player, occasionally aligning their line of sight to shoot at the player.
          </figcaption>
        </div>
      </div>
      <div class="feature-content">
        <ul>
          <li>NPC airplanes can chase and circle the player.</li>
          <li>They will periodically target and shoot the player.</li>
          <li>If the player flies away and "escapes" or is sighted by a radar, it will cause the NPC airplanes to patrol the last known player position for a duration.</li>
        </ul>
      </div>
    </section>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
    <h3><b>Neural Network pathfinding of enemy NPC airplanes</b></h3>
    <p>
    The goal of my neural network is for agents (enemy NPC airplanes) to move/follow a target, which can be the current player position, the last known player position or their base. To accomplish this we have to think about what data to give to the neural network (input) and what data we want to get from the neural network (output).
    </p>
    <section class="feature-block media-left">
      <div class="feature-media">
        <figure>
          <img src="assets/images/kaboom/CoordinatesTransformation.png" alt="coord-transform">
          <figcaption>Transforming world coordinates to egocentric coordinates.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
      <p>
        A neural network requires input to work, you can think of this input as sight. We <i>see</i> things from our point of view, similarly we can make the NN agents see the world from their position in the world. Translating this input to the agent's relative world positions will improve the behaviour and decrease the complexitiy of the NN. We can accomplish this by translating the target world coordinates to egocentric coordinates, before passing it to the NN.
      </p>
      </div>
    </section>
    <section class="feature-block media-right">
      <div class="feature-media">
        <div class="video-container">
          <video controls>
            <source src="/assets/videos/kaboom/trained_NN_airplanes.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <figcaption>
            This video shows a trained NN controlling multiple airplanes and making them fly towards the center to start circling their target, in a training environment.
          </figcaption>
        </div>
      </div>
      <div class="feature-content">
        <p>
          My neural network uses two outputs: an angle and a throttle. The angle is used to steer the airplanes, allowing them to turn and move towards their target. And the throttle is used to determine the speed of the airplanes. These outputs are clamped between minimum and maximum values, because airplanes are unable hang still in the air, nor can they move faster then their limit or take a 90° turn. Something important to note is that the input is an egocentric coordinate, it does not matter to the neural network what this coordinate represents. That is for us to determine, which makes this a very robust pathfinding neural network that can be used for the airplanes we use in our game.
        </p>
      </div>
    </section>
  </section>
</section>
