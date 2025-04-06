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

The *possessed* variable is to indicate whether or not the vehicle is *possessed* by the player. If it is *possessed* by the player, then the player can control this vehicle with input. Otherwise if the vehicle entity is not *possessed* and contains a *racing agent* component, it will drive using the AI.

...

# Blender-to-engine pipeline
One of the requirements of the project was to create a blender-to-engine pipeline that the artists and designers can use to create a racing game using our engine. I contributed to this pipeline by making add-ons that can be loaded in blender and used to set variables used in the engine. When loading in a level/scene these variables are used to create entities with the corresponding components. 

This add-on adds a custom properties window to the selected object in blenders object inspector. In this window, the user can use the checkboxes to mark an object for the desired component. Once checked it will open a drop-down window, in which you can set related variables for that component.

<figure>
  <img src="assets/images/racing-engine/blender-beetle-properties.png" alt="beelte-properties">
  <figcaption>Properties in the object inspector that can be set for our racing engine (*beetle*).</figcaption>
</figure>

We also used the *gltf* file format for loading in levels and *.dds* for textures. When exporting a level/scene from blender we had to export it to *gltf* and changes the names of the textures to end in *.dds* from *.png* and *.jpg*. We also convert the textures to the right format using NVIDIA texture tools exporter. To simplify the steps necessary, I created an add-on that auto exports the blender level to *gltf*, convertes the textures and replaces the formats in the *gltf* to *dds*.

<figure>
  <img src="assets/images/racing-engine/blender-export-button.png" alt="export-button">
  <figcaption>Add-on that adds an export button and file browser for auto-exporting to <i>gltf</i>.</figcaption>
</figure>

Loading the entities and components from blender is done using the following pseudo-code:

```cpp
for (auto [entity, extras] : Engine.ECS().Registry.view<GLTFExtras>().each())
    {
        if (physicsBody)
            CreateJoltPhysicsBodyComponent();
        if (vehicle) 
            CreateVehicle(); // (using components for vehicle system)
        if (trackNode)
            CreateTrackNodeComponent();
        if (race)
            CreateRace(); // and add it to objective system
        if (checkpoint)
            CreateCheckpointComponent();
    }
```

Below I have added a video showcasing the blender-to-engine pipeline and hot-reloading in-engine:

<div class="youtube-video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/m3WC36fD0U8" frameborder="0" allowfullscreen></iframe>
</div>
