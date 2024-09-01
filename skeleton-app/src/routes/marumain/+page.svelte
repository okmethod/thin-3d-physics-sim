<script lang="ts">
  import { onMount } from "svelte";
  import * as pc from "playcanvas";
  import loadAmmo from "$lib/utils/loadAmmo.client";
  import createGroundEntity from "$lib/entities/createGroundEntity";
  import createMarumainEntity from "$lib/entities/createMarumainEntity";
  import addMoveCameraEvents from "$lib/events/moveCamera";

  let app: pc.Application;
  let canvas: HTMLCanvasElement;

  let enablePhysics = true;
  onMount(async () => {
    if (enablePhysics) {
      try {
        await loadAmmo();
      } catch (error) {
        console.error("Failed to load Ammo.js", error);
        return;
      }
    }
    app = initializeApp(canvas, enablePhysics);

    // create marumain entity
    const marumain = createMarumainEntity(app, false);
    marumain.setPosition(0, 3, 0);
    app.on("update", (dt) => {
      if (marumain) marumain.rotate(100 * dt, 20 * dt, 30 * dt);
    });
  });

  function initializeApp(canvasElement: HTMLCanvasElement, enablePhysics: boolean): pc.Application {
    const app = new pc.Application(canvasElement, {
      mouse: new pc.Mouse(canvasElement),
      touch: new pc.TouchDevice(canvasElement),
    });

    // fill the available space at full resolution
    app.setCanvasFillMode(pc.FILLMODE_NONE);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    // window.addEventListener("resize", () => app.resizeCanvas());

    // Enable physics
    if (enablePhysics && app.systems.rigidbody && app.systems.collision) {
      app.systems.rigidbody.gravity.set(0, -9.81, 0);
    }
    app.start();

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
    const ground = createGroundEntity(app, enablePhysics);
    ground.setPosition(0, -1, 0);

    return app;
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
