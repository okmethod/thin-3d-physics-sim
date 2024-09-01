<script lang="ts">
  import { onMount, onDestroy } from "svelte";
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
    void createMarumainEntity(app, new pc.Vec3(0, 2, 0), enablePhysics);
  });

  function initializeApp(canvasElement: HTMLCanvasElement, enablePhysics: boolean): pc.Application {
    const app = new pc.Application(canvasElement, {
      mouse: new pc.Mouse(canvasElement),
      touch: new pc.TouchDevice(canvasElement),
    });

    // fill the available space at full resolution
    app.setCanvasFillMode(pc.FILLMODE_NONE);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    window.addEventListener("resize", () => app.resizeCanvas());

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
    camera.setPosition(0, 3, 15); // Set camera position above the scene
    camera.setEulerAngles(-15, 0, 0); // Rotate camera to look straight down
    addMoveCameraEvents(app, camera);

    // create directional light entity
    const light = new pc.Entity("light");
    light.addComponent("light");
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    // create ground entity
    void createGroundEntity(app, new pc.Vec3(0, -1, 0));

    return app;
  }

  onDestroy(() => {
    if (app) app.destroy();
  });
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">bounce-marumain</h1>
  </div>
  <!-- playCanvas -->
  <canvas bind:this={canvas} class="w-[600px] h-[600px] border border-black"></canvas>
</div>
