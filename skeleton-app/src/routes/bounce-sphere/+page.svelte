<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import * as pc from "playcanvas";
  import Icon from "@iconify/svelte";
  import loadAmmo from "$lib/utils/loadAmmo.client";
  import createGroundEntity from "$lib/entities/createGroundEntity";
  import createEnclosureEntity from "$lib/entities/createEnclosureEntity";
  import createMaruEntity from "$lib/entities/createMaruEntity";
  import addMoveCameraEvents from "$lib/events/moveCamera";

  let app: pc.Application;
  let canvas: HTMLCanvasElement;

  let enclosure: pc.Entity;
  let enclosed = false;

  let maruMetaPhysics: pc.Entity;
  const spawnPos = new pc.Vec3(0, 2, 0);

  let enablePhysics = true;
  onMount(async () => {
    if (enablePhysics) {
      try {
        await loadAmmo(window.fetch);
      } catch (error) {
        console.error("Failed to load Ammo.js", error);
        return;
      }
    }
    app = initializeApp(canvas, enablePhysics);

    app.on("update", () => {
      app.root.children.forEach(removeFallenNode);
    });

    // create maru origin entity
    const maruOrigin = createMaruEntity(app, spawnPos, enablePhysics);

    // origin は いずれ命尽きる定め...
    maruMetaPhysics = maruOrigin.clone();
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
    const groundPosition = new pc.Vec3(0, -1, 0);
    const groundSize = new pc.Vec3(10, 1, 10);
    void createGroundEntity(app, groundPosition, groundSize);

    // create enclosure entity
    const enclosurePosition = new pc.Vec3(0, groundPosition.y + groundSize.y / 2, 0);
    const wallHeight = 10;
    const enclosureSize = new pc.Vec3(groundSize.x, wallHeight, groundSize.z);
    enclosure = createEnclosureEntity(app, enclosurePosition, enclosureSize);

    return app;
  }

  onDestroy(() => {
    if (app) app.destroy();
  });

  function spawnMaru(): void {
    const maruClone = maruMetaPhysics.clone();
    maruClone.setPosition(spawnPos);
    app.root.addChild(maruClone);
  }

  function removeFallenNode(node: pc.GraphNode): void {
    const entity = node as pc.Entity;
    if (entity.getPosition().y < -10) {
      app.root.removeChild(entity);
      entity.destroy();
    }
  }

  function updateEnclosed() {
    enclosure.children.forEach((child) => {
      const wall = child as pc.Entity;
      if (wall.collision) {
        wall.collision.enabled = enclosed;
      }
    });
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">bounce-sphere</h1>
  </div>

  <!-- button -->
  <div class="flex items-center justify-center space-x-4">
    <div>
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">Spawn sphere</span>
        <form on:submit={spawnMaru}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
      </div>
    </div>
    <div>
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">Enclose World</span>
        <SlideToggle
          name="encloseToggle"
          bind:checked={enclosed}
          on:change={updateEnclosed}
          size="sm"
          background="bg-gray-700"
          active="bg-blue-500"
          border="border border-gray-300"
          rounded="rounded-full"
          label="Toggle Enclosure"
        />
      </div>
    </div>
  </div>

  <!-- playCanvas -->
  <canvas bind:this={canvas} class="w-96 h-96 md:w-[600px] md:h-[600px] border border-black"></canvas>
</div>
