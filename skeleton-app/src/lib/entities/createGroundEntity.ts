import * as pc from "playcanvas";
import { createTextureMaterial } from "$lib/utils/material";
import { scaledVec3 } from "$lib/utils/vec";
import checkerTextureUrl from "$lib/textures/checker16.png";

function createGroundEntity(app: pc.Application, pos: pc.Vec3): pc.Entity {
  const checkerTexture = createTextureMaterial(app, checkerTextureUrl);

  const ground = new pc.Entity("ground");
  ground.addComponent("render", {
    type: "box",
    material: checkerTexture,
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
