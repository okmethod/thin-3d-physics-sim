import * as pc from "playcanvas";
import { scaledVec3 } from "$lib/utils/vec";

function createEnclosureEntity(app: pc.Application, pos: pc.Vec3, size: pc.Vec3): pc.Entity {
  const enclosure = new pc.Entity();

  const wallConfigs = [
    { pos: new pc.Vec3(pos.x, pos.y + size.y / 2, pos.z), scale: new pc.Vec3(size.x, 1, size.z) }, // 天井
    { pos: new pc.Vec3(pos.x - size.x / 2, pos.y, pos.z), scale: new pc.Vec3(1, size.y, size.z) }, // 左の壁
    { pos: new pc.Vec3(pos.x + size.x / 2, pos.y, pos.z), scale: new pc.Vec3(1, size.y, size.z) }, // 右の壁
    { pos: new pc.Vec3(pos.x, pos.y, pos.z - size.z / 2), scale: new pc.Vec3(size.x, size.y, 1) }, // 前の壁
    { pos: new pc.Vec3(pos.x, pos.y, pos.z + size.z / 2), scale: new pc.Vec3(size.x, size.y, 1) }, // 奥の壁
  ];

  wallConfigs.map((wallConfig) => {
    const wall = createWallEntity(wallConfig.pos, wallConfig.scale);
    enclosure.addChild(wall);
  });

  app.root.addChild(enclosure);
  return enclosure;
}

function createWallEntity(localPos: pc.Vec3, localScale: pc.Vec3): pc.Entity {
  const wall = new pc.Entity();
  wall.addComponent("model", {
    type: "box",
  });
  wall.setLocalScale(localScale.x, localScale.y, localScale.z);
  wall.setLocalPosition(localPos.x, localPos.y, localPos.z);

  wall.addComponent("rigidbody", {
    type: "static",
    restitution: 1,
  });
  wall.addComponent("collision", {
    type: "box",
    halfExtents: scaledVec3(localScale, 0.5),
  });

  // モデルを不可視に設定
  if (wall.model) wall.model.enabled = false;

  return wall;
}

export default createEnclosureEntity;
