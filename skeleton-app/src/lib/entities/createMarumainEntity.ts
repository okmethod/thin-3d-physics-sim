import * as pc from "playcanvas";
import marumaunTextureUrl from "$lib/textures/marumain.png";

function createTextureMaterial(app: pc.Application, imageUrl: string): pc.StandardMaterial {
  const material = new pc.StandardMaterial();

  const textureAsset = new pc.Asset("marumain_texture", "texture", {
    url: imageUrl,
  });
  app.assets.add(textureAsset);
  textureAsset.ready(() => {
    material.diffuseMap = textureAsset.resource;
    material.update();
  });
  app.assets.load(textureAsset);

  return material;
}

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
