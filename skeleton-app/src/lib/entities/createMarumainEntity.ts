import * as pc from "playcanvas";
import marumaunTexture from "$lib/textures/marumain.png";

function createMarumainEntity(app: pc.Application, affectedPhysics: boolean): pc.Entity {
  const marumain = new pc.Entity("sphere");
  marumain.addComponent("model", {
    type: "sphere",
  });
  app.root.addChild(marumain);

  const textureAsset = new pc.Asset("marumain_texture", "texture", {
    url: marumaunTexture,
  });
  app.assets.add(textureAsset);

  textureAsset.ready(() => {
    const material = new pc.StandardMaterial();
    material.diffuseMap = textureAsset.resource;
    material.update();

    if (marumain.model) {
      const meshInstance = marumain.model.model.meshInstances[0];
      meshInstance.material = material;
    }
  });
  app.assets.load(textureAsset);

  if (affectedPhysics) {
    marumain.addComponent("rigidbody", {
      type: "dynamic",
      mass: 1,
    });
    marumain.addComponent("collision", {
      type: "sphere",
      radius: 0.5,
    });
  }

  return marumain;
}

export default createMarumainEntity;
