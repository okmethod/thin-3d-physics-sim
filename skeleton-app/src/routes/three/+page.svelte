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

    // 立方体エッジの作成
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const line = new THREE.LineSegments(edges, lineMaterial);

    // シーンに立方体を追加
    cube.add(line);
    scene.add(cube);

    // ボールの作成
    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000bb });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(2, 3, 0); // x=2, y=1, z=0
    scene.add(ball);

    // 地面の作成
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);

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

      // ボールの移動
      let ballSpeed = 0.02;
      let ballDirection = -1;
      ball.position.y += ballSpeed * ballDirection;
      if (ball.position.y > 2 || ball.position.y < -0.5) {
        ballDirection *= -1;
      }

      renderer.render(scene, camera);
    }

    console.log("start animate");
    animate();
  });
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">Only Three.js</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !m-4">
    <span></span>
  </div>

  <!-- Three.jsのコンテナ -->
  <div bind:this={renderContainer} class="w-80 h-80 bg-gray-300 border border-black"></div>
</div>
