<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";

  let renderContainer: HTMLDivElement;

  onMount(async () => {
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

    // Ammo.jsの初期化
    const Ammo = await import("ammo.js");

    // 物理ワールドの作成
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const overlappingPairCache = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
      dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration,
    );
    physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));

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

    // 立方体の物理特性を追加
    const cubeShape = new Ammo.btBoxShape(new Ammo.btVector3(0.5, 0.5, 0.5));
    const cubeTransform = new Ammo.btTransform();
    cubeTransform.setIdentity();
    cubeTransform.setOrigin(new Ammo.btVector3(0, 5, 0));
    const cubeMass = 1;
    const cubeLocalInertia = new Ammo.btVector3(0, 0, 0);
    cubeShape.calculateLocalInertia(cubeMass, cubeLocalInertia);
    const cubeMotionState = new Ammo.btDefaultMotionState(cubeTransform);
    const cubeRbInfo = new Ammo.btRigidBodyConstructionInfo(cubeMass, cubeMotionState, cubeShape, cubeLocalInertia);
    const cubeBody = new Ammo.btRigidBody(cubeRbInfo);
    physicsWorld.addRigidBody(cubeBody);

    // ボールの作成
    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000bb });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(2, 3, 0); // x=2, y=1, z=0
    scene.add(ball);

    // ボールの物理特性を追加
    const ballShape = new Ammo.btSphereShape(0.5);
    const ballTransform = new Ammo.btTransform();
    ballTransform.setIdentity();
    ballTransform.setOrigin(new Ammo.btVector3(2, 3, 0));
    const ballMass = 1;
    const ballLocalInertia = new Ammo.btVector3(0, 0, 0);
    ballShape.calculateLocalInertia(ballMass, ballLocalInertia);
    const ballMotionState = new Ammo.btDefaultMotionState(ballTransform);
    const ballRbInfo = new Ammo.btRigidBodyConstructionInfo(ballMass, ballMotionState, ballShape, ballLocalInertia);
    const ballBody = new Ammo.btRigidBody(ballRbInfo);
    physicsWorld.addRigidBody(ballBody);

    // 地面の作成
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);

    // 地面の物理特性を追加
    const groundShape = new Ammo.btBoxShape(new Ammo.btVector3(5, 0.5, 5));
    const groundTransform = new Ammo.btTransform();
    groundTransform.setIdentity();
    groundTransform.setOrigin(new Ammo.btVector3(0, -1, 0));
    const groundMass = 0;
    const groundLocalInertia = new Ammo.btVector3(0, 0, 0);
    const groundMotionState = new Ammo.btDefaultMotionState(groundTransform);
    const groundRbInfo = new Ammo.btRigidBodyConstructionInfo(
      groundMass,
      groundMotionState,
      groundShape,
      groundLocalInertia,
    );
    const groundBody = new Ammo.btRigidBody(groundRbInfo);
    physicsWorld.addRigidBody(groundBody);

    // ウィンドウサイズ変更時の処理
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // アニメーションループの作成
    function animate() {
      requestAnimationFrame(animate);

      // 物理シミュレーションの更新
      physicsWorld.stepSimulation(1 / 60, 10);

      // 立方体の位置と回転を更新
      const cubeTransform = cubeBody.getWorldTransform();
      const cubeOrigin = cubeTransform.getOrigin();
      const cubeRotation = cubeTransform.getRotation();
      cube.position.set(cubeOrigin.x(), cubeOrigin.y(), cubeOrigin.z());
      cube.quaternion.set(cubeRotation.x(), cubeRotation.y(), cubeRotation.z(), cubeRotation.w());

      // ボールの位置と回転を更新
      const ballTransform = ballBody.getWorldTransform();
      const ballOrigin = ballTransform.getOrigin();
      const ballRotation = ballTransform.getRotation();
      ball.position.set(ballOrigin.x(), ballOrigin.y(), ballOrigin.z());
      ball.quaternion.set(ballRotation.x(), ballRotation.y(), ballRotation.z(), ballRotation.w());

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
