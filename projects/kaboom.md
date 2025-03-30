---
layout: page
title: "Kaboom: Return of Kaboom"
permalink: /projects/kaboom-return-of-kaboom/
---

<link rel="stylesheet" href="/assets/css/links.css">
<link rel="stylesheet" href="/assets/css/videos.css">

This project took 8 weeks, in which I worked in a team together with 11 other games students. The team consisted of 3 designers, 5 artists and 4 programmers, all from Breda University of Applied Sciences. The focus of the project was on teamwork and collaboration.

The game was made using Unreal Engine and we used the agile scrum method to manage the project. You can check out our itch.io page and download/play the game using the following link: <a href="https://buas.itch.io/team-ginger" target="_blank" rel="noopener noreferrer">Kaboom: Return of Kaboom</a>.


<div class="youtube-video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/zk-24I7OJf8" frameborder="0" allowfullscreen></iframe>
</div>

# My work
My main focus this project as a programmer was helping the team to create the game. Making gameplay related features according to the vision of the designers. Some of the things I did were:
- Talking with designers;
- Understanding their visions;
- Implementing these visions into the gameplay features;
- Iterating on the features I created, to improve the gameplay experience.

This project sparked my interest in collaborating with designers and creating a satisfying gameplay experience. Being able to implement the designer's vision into the behaviour of NPCs was incredibly enjoyable.

Below are some of the features I worked on:
- Neural network (NN) trained for pathfinding of enemy NPC airplanes and bombers;
- Interactions between the player and enemy NPC airplanes and bombers;
- Patrol behaviour for enemy NPC airplanes and bombers.

## NN for pathfinding of enemy NPC airplanes and bombers

One of the biggest features of the gameplay loop are the enemy NPC airplanes that defend the factories the player is attacking. It was my job to make the pathfollowing of these airplanes, I decided to do this using NNs because it was a research topic I could choose and it seemed quite interesting. To train the NN, I made a training environment in which the airplanes were trained by making them fly towards the center. You can see the trained NN in action, in the video below. No matter on where the airplanes are spawned, they will start moving towards the center and start circling around it. The green lines are the lines of sight of the airplanes, which is to check if the player is in front of them (it doesn't do anything in the training environment). They can be used to see the direction in which the airplanes are flying.

<div class="video-container">
  <video controls>
    <source src="/assets/videos/trained_NN_airplanes.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>
    This video is a showcase of a trained NN controlling multiple airplanes and making them fly towards the center to start circling their target.
  </figcaption>
</div>

## Interactions between the player and enemy NPC airplanes and bombers



<div class="video-container">
  <video controls>
    <source src="/assets/videos/airplanes_interaction.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>
    This video is shows the interaction between the player and enemy NPC airplanes. You can see that the airplanes circle the player, sometimes aligning their line of sight to shoot at the player.
  </figcaption>
</div>

## Patrol behaviour for enemy NPC airplanes and bombers
