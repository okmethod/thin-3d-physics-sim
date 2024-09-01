import * as pc from "playcanvas";
import { createTextureMaterial } from "$lib/utils/material";
import maruTextureUrl from "$lib/textures/maru.png";

function createMaruEntity(app: pc.Application, pos: pc.Vec3, affectedPhysics: boolean): pc.Entity {
  const maruTexture = createTextureMaterial(app, maruTextureUrl);

  const maru = new pc.Entity("sphere");
  maru.addComponent("model", {
    type: "sphere",
    material: maruTexture,
  });
  maru.setPosition(pos);

  if (affectedPhysics) {
    maru.addComponent("rigidbody", {
      type: "dynamic",
      mass: 1,
      restitution: 1,
    });
    maru.addComponent("collision", {
      type: "sphere",
      radius: 0.5,
    });
  }

  app.root.addChild(maru);

  return maru;
}

export default createMaruEntity;
