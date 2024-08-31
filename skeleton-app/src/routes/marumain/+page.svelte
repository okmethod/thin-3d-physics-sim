<script lang="ts">
  import { onMount } from "svelte";
  import * as pc from "playcanvas";
  import createMarumainEntity from "$lib/entities/createMarumainEntity";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const app = new pc.Application(canvas, {
      mouse: new pc.Mouse(canvas),
      touch: new pc.TouchDevice(canvas),
    });

    // fill the available space at full resolution
    app.setCanvasFillMode(pc.FILLMODE_NONE);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    // ensure canvas is resized when window changes size
    window.addEventListener("resize", () => app.resizeCanvas());

    // create marumain entity
    const marumain = createMarumainEntity(app);

    // create camera entity
    const camera = new pc.Entity("camera");
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.2, 0.3),
    });
    app.root.addChild(camera);
    camera.setPosition(0, 0, 3);

    // create directional light entity
    const light = new pc.Entity("light");
    light.addComponent("light");
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    // camera control variables
    let lastX = 0;
    let lastY = 0;
    let isDragging = false;

    // mouse events
    if (app.mouse) {
      app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
        isDragging = true;
        lastX = event.x;
        lastY = event.y;
      });
      app.mouse.on(pc.EVENT_MOUSEMOVE, (event) => {
        if (isDragging) {
          const dx = event.x - lastX;
          const dy = event.y - lastY;
          camera.rotateLocal(dy * 0.1, dx * 0.1, 0);
          lastX = event.x;
          lastY = event.y;
        }
      });
      app.mouse.on(pc.EVENT_MOUSEUP, () => {
        isDragging = false;
      });
    }

    // touch events
    if (app.touch) {
      app.touch.on(pc.EVENT_TOUCHSTART, (event) => {
        isDragging = true;
        lastX = event.touches[0].x;
        lastY = event.touches[0].y;
      });
      app.touch.on(pc.EVENT_TOUCHMOVE, (event) => {
        if (isDragging && event.touches.length === 1) {
          const dx = event.touches[0].x - lastX;
          const dy = event.touches[0].y - lastY;
          camera.rotateLocal(dy * 0.1, dx * 0.1, 0);
          lastX = event.touches[0].x;
          lastY = event.touches[0].y;
        }
      });
      app.touch.on(pc.EVENT_TOUCHEND, () => {
        isDragging = false;
      });
    }

    // rotate the box according to the delta time since the last frame
    app.on("update", (dt) => marumain.rotate(10 * dt, 20 * dt, 30 * dt));

    app.start();
  });
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">PlayCanvas WebGL Game Engine</h1>
  </div>
  <!-- playCanvas -->
  <canvas bind:this={canvas} class="w-80 h-80 border border-black"></canvas>
</div>
