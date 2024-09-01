import * as pc from "playcanvas";
import { createTextureMaterial } from "$lib/utils/material";
import marumaunTextureUrl from "$lib/textures/marumain.png";

function createMarumainEntity(app: pc.Application, pos: pc.Vec3, affectedPhysics: boolean): pc.Entity {
  const marumainTexture = createTextureMaterial(app, marumaunTextureUrl);

  const marumain = new pc.Entity("sphere");
  marumain.addComponent("model", {
    type: "sphere",
    material: marumainTexture,
  });
  marumain.setPosition(pos);

  if (affectedPhysics) {
    marumain.addComponent("rigidbody", {
      type: "dynamic",
      mass: 1,
      restitution: 1,
    });
    marumain.addComponent("collision", {
      type: "sphere",
      radius: 0.5,
    });
  }

  app.root.addChild(marumain);

  return marumain;
}

export default createMarumainEntity;
