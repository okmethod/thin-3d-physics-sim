<script lang="ts">
  import { onMount } from "svelte";
  import * as pc from "playcanvas";
  import createMarumainEntity from "$lib/entities/createMarumainEntity";
  import addMoveCameraEvents from "$lib/events/moveCamera";

  let app: pc.Application;
  let canvas: HTMLCanvasElement;

  onMount(async () => {
    app = initializeApp(canvas);

    // create marumain entity
    const marumain = createMarumainEntity(app, new pc.Vec3(0, 0, 0), false);

    // rotate the marumain according to the delta time since the last frame
    let accelerater = 1;
    app.on("update", (dt) => {
      if (marumain) {
        marumain.rotate((100 + accelerater) * dt, 20 * dt, 30 * dt);
        // accelerater += 0.5;
      }
    });
    app.start();
  });

  function initializeApp(canvasElement: HTMLCanvasElement): pc.Application {
    const app = new pc.Application(canvasElement, {
      mouse: new pc.Mouse(canvasElement),
      touch: new pc.TouchDevice(canvasElement),
    });

    // fill the available space at full resolution
    app.setCanvasFillMode(pc.FILLMODE_NONE);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    window.addEventListener("resize", () => app.resizeCanvas());

    // create camera entity
    const camera = new pc.Entity("camera");
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.2, 0.3),
    });
    app.root.addChild(camera);
    camera.setPosition(0, 0, 3); // Set camera position above the scene
    camera.setEulerAngles(0, 0, 0); // Rotate camera to look straight down
    addMoveCameraEvents(app, camera);

    // create directional light entity
    const light = new pc.Entity("light");
    light.addComponent("light");
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    return app;
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">rotate-marumain</h1>
  </div>
  <!-- playCanvas -->
  <canvas bind:this={canvas} class="w-96 h-96 border border-black"></canvas>
</div>
