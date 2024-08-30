<script lang="ts">
  import { onMount } from "svelte";
  import * as pc from "playcanvas";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const app = new pc.Application(canvas);

    // fill the available space at full resolution
    app.setCanvasFillMode(pc.FILLMODE_NONE);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    // ensure canvas is resized when window changes size
    window.addEventListener("resize", () => app.resizeCanvas());

    // create box entity
    const box = new pc.Entity("cube");
    box.addComponent("model", {
      type: "box",
    });
    app.root.addChild(box);

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

    // rotate the box according to the delta time since the last frame
    app.on("update", (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));

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
