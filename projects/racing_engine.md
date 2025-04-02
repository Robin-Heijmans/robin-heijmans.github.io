---
layout: page
title: "Racing engine"
permalink: /projects/racing-engine/
---

<link rel="stylesheet" href="/assets/css/links.css">
<link rel="stylesheet" href="/assets/css/videos.css">
<link rel="stylesheet" href="/assets/css/images.css">

This project took 8 weeks, during which I worked in a team consisting of 6 programming students total. 

The racing engine was made using a snapshot of the *bee engine*, which is a educational engine made and updated by the 2nd year programming teachers of Breda University of Applied Sciences. It had basic entity component system (ECS) functionality setup, among other things. It was our task to turn this into a racing engine with a blender-to-engine pipeline that can easily be used by artists and designers to make a racing game.

We wanted to make a racing game with realistic driving and nice to work with pipeline for the designers and artists to work with. My tasks this project were to make the *racing agents* (AI opponents) to behave naturally and create the blender-to-engine pipeline. For the *racing agents* I have worked on the following tasks:
- Connection between the actions of the *racing agents* and the realistic vehicle system;
- Make use of track nodes to determine their velocity;
- Brake and give gas to adjust their velocity;
- Steer towards their target to finish laps and the race;
- Get the engine running if it is off or they stall it during the race.

For the blender-to-engine pipeline I have done the following tasks:
- Created a blender add-on for setting properties used in the engine;
- Created a blender add-on that automatically exports the *.blend* file to *.gltf* (which we use in the engine to load scenes);
- Hot-reloading in the engine.

# Racing agents
The realistic vehicle we made uses certain variables to drive the vehicle. I made a component we can attach to a vehicle entity, to allow both the AI and player use the vehicle in the same way.

```cpp
struct ControllableVehicle {
  float m_throttle = 0.0f;
  float m_brake = 0.0f;
  float m_steeringAngle = 0.0f;
  float m_clutch = 0.0f;
  float m_speed = 0.0f;
  int m_gearSelector = 0;
  bool m_engage_starter = false;
  bool m_possessed = false;

  void IncreaseThrottle(const float throttleIncrement);
  void ReleasedThrottle(const float throttleIncrement);
  void IncreaseBrake(const float brakeIncrement);
  void ReleasedBrake(const float brakeIncrement);
  void SetSteering(const float steeringAngleIncrement);
  void ReleaseSteering(const float steeringAngleIncrement);
  void SetClutch(const float clutchIncrement);
  void SetCurrentSpeed(const glm::vec3 linearVelocity, const glm::vec3 forward);
};
```

With this component both the player and the AI can:
- Give throttle;
- Brake;
- Steer;
- Engage the clutch;
- Switch gears;
- Engage the starter (to get the engine running).

The *possessed* variable is to indicate whether or not the vehicle is *possessed* by the player. If it is *possessed* by the player, then the player can control this vehicle with input. Otherwise if the vehicle entity is not *possessed* and contains a *racing agent* component, it will drive with the AI.

...

# Blender-to-engine pipeline
...

Showcase of the blender-to-engine pipeline and hot-reloading:
<div class="youtube-video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/m3WC36fD0U8" frameborder="0" allowfullscreen></iframe>
</div>
