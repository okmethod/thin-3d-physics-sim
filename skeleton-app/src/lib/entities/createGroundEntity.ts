import * as pc from "playcanvas";
import { scaledVec3 } from "$lib/utils/vec";

function createColorMaterial(color: pc.Color): pc.StandardMaterial {
  const material = new pc.StandardMaterial();
  material.diffuse = color;
  material.update();
  return material;
}

function createGroundEntity(app: pc.Application, pos: pc.Vec3): pc.Entity {
  const gray = createColorMaterial(new pc.Color(0.7, 0.7, 0.7));

  const ground = new pc.Entity("ground");
  ground.addComponent("render", {
    type: "box",
    material: gray,
  });
  ground.setPosition(pos);

  const halfExtents = new pc.Vec3(5, 0.5, 5);
  ground.setLocalScale(scaledVec3(halfExtents, 2));

  ground.addComponent("rigidbody", {
    type: "static",
    restitution: 1,
  });
  ground.addComponent("collision", {
    type: "box",
    halfExtents: halfExtents,
  });

  app.root.addChild(ground);

  return ground;
}

export default createGroundEntity;
