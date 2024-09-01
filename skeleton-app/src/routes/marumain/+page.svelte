<script lang="ts">
  import { onMount } from "svelte";
  import * as pc from "playcanvas";
  import createGroundEntity from "$lib/entities/createGroundEntity";
  import createMarumainEntity from "$lib/entities/createMarumainEntity";
  import addMoveCameraEvents from "$lib/events/moveCamera";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    initializeApp();
  });

  function initializeApp() {
    const app = new pc.Application(canvas, {
      mouse: new pc.Mouse(canvas),
      touch: new pc.TouchDevice(canvas),
    });

    // fill the available space at full resolution
    app.setCanvasFillMode(pc.FILLMODE_NONE);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    // window.addEventListener("resize", () => app.resizeCanvas());

    // Enable physics
    if (app.systems.rigidbody && app.systems.collision) {
      console.log("Rigidbody system enabled");
      app.systems.rigidbody.gravity.set(0, -9.81, 0);
    }

    // create camera entity
    const camera = new pc.Entity("camera");
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.2, 0.3),
    });
    app.root.addChild(camera);
    camera.setPosition(0, 5, 5); // Set camera position above the scene
    camera.setEulerAngles(-30, 0, 0); // Rotate camera to look straight down
    addMoveCameraEvents(app, camera);

    // create directional light entity
    const light = new pc.Entity("light");
    light.addComponent("light");
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    // create ground entity
    const ground = createGroundEntity(app, true);
    ground.setPosition(0, -1, 0);

    // create marumain entity
    const marumain = createMarumainEntity(app, true);
    marumain.setPosition(0, 3, 0);

    // rotate the marumain according to the delta time since the last frame
    app.on("update", (dt) => {
      if (marumain) {
        marumain.rotate(100 * dt, 20 * dt, 30 * dt);
      }
    });

    app.start();
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">PlayCanvas WebGL Game Engine</h1>
  </div>
  <!-- playCanvas -->
  <canvas bind:this={canvas} class="w-80 h-80 border border-black"></canvas>
</div>
