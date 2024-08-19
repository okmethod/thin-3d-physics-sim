<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";

  let renderContainer: HTMLDivElement;

  onMount(() => {
    // シーンの作成
    const scene = new THREE.Scene();

    // カメラの作成
    const camera = new THREE.PerspectiveCamera(
      75,
      renderContainer.clientWidth / renderContainer.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // レンダラーの作成
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(renderContainer.clientWidth, renderContainer.clientHeight);
    renderContainer.appendChild(renderer.domElement);

    // 立方体の作成
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // ウィンドウサイズ変更時の処理
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // アニメーションループの作成
    function animate() {
      requestAnimationFrame(animate);

      // 立方体を回転させる
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    console.log("start animate");
    animate();
  });
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">simple</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !m-4">
    <span></span>
  </div>

  <!-- Three.jsのコンテナ -->
  <div bind:this={renderContainer} class="w-80 h-80 bg-gray-300 border border-black"></div>
</div>
