import * as pc from "playcanvas";

function createColorMaterial(color: pc.Color): pc.StandardMaterial {
  const material = new pc.StandardMaterial();
  material.diffuse = color;
  material.update();
  return material;
}

function createGroundEntity(app: pc.Application, affectedPhysics: boolean): pc.Entity {
  const gray = createColorMaterial(new pc.Color(0.7, 0.7, 0.7));

  const ground = new pc.Entity("ground");
  ground.addComponent("render", {
    type: "box",
    material: gray,
  });

  ground.setLocalScale(10, 2, 10);

  if (affectedPhysics) {
    ground.addComponent("rigidbody", {
      type: "static",
      restitution: 0.5,
    });
    ground.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(5, 1, 5),
    });
  }

  app.root.addChild(ground);

  return ground;
}

export default createGroundEntity;
