import * as pc from "playcanvas";

function createGroundEntity(app: pc.Application, affectedPhysics: boolean): pc.Entity {
  const ground = new pc.Entity("ground");
  ground.addComponent("model", {
    type: "box",
  });
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0.6, 0.3, 0.1); // Brown color
  material.update();
  if (ground.model) {
    const meshInstance = ground.model.model.meshInstances[0];
    meshInstance.material = material;
  }
  app.root.addChild(ground);
  ground.setLocalScale(10, 2, 10);

  if (affectedPhysics) {
    ground.addComponent("rigidbody", {
      type: "static",
    });
    ground.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(5, 1, 5),
    });
  }

  return ground;
}

export default createGroundEntity;
