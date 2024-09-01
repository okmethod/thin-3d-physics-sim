import * as pc from "playcanvas";

export function createColorMaterial(color: pc.Color): pc.StandardMaterial {
  const material = new pc.StandardMaterial();
  material.diffuse = color;
  material.update();
  return material;
}

export function createTextureMaterial(app: pc.Application, imageUrl: string): pc.StandardMaterial {
  const material = new pc.StandardMaterial();

  const textureAsset = new pc.Asset("maru_texture", "texture", {
    url: imageUrl,
  });
  app.assets.add(textureAsset);
  textureAsset.ready(() => {
    const texture = textureAsset.resource as pc.Texture;
    texture.minFilter = pc.FILTER_NEAREST;
    texture.magFilter = pc.FILTER_NEAREST;
    texture.addressU = pc.ADDRESS_MIRRORED_REPEAT;
    texture.addressV = pc.ADDRESS_MIRRORED_REPEAT;

    material.diffuseMap = texture;
    material.update();
  });
  app.assets.load(textureAsset);

  return material;
}
