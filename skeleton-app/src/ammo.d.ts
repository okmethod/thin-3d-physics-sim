declare module "ammo.js" {
  export class btDefaultCollisionConfiguration {}
  export class btCollisionDispatcher {
    constructor(config: btDefaultCollisionConfiguration);
  }
  export class btDbvtBroadphase {}
  export class btSequentialImpulseConstraintSolver {}
  export class btDiscreteDynamicsWorld {
    constructor(
      dispatcher: btCollisionDispatcher,
      pairCache: btDbvtBroadphase,
      constraintSolver: btSequentialImpulseConstraintSolver,
      collisionConfiguration: btDefaultCollisionConfiguration,
    );
    setGravity(gravity: btVector3): void;
    stepSimulation(timeStep: number, maxSubSteps: number): void;
    addRigidBody(body: btRigidBody): void;
  }
  export class btVector3 {
    constructor(x: number, y: number, z: number);
    x(): number;
    y(): number;
    z(): number;
  }
  export class btTransform {
    setIdentity(): void;
    setOrigin(origin: btVector3): void;
    getOrigin(): btVector3;
    getRotation(): btQuaternion;
  }
  export class btQuaternion {
    x(): number;
    y(): number;
    z(): number;
    w(): number;
  }
  export class btBoxShape {
    constructor(halfExtents: btVector3);
    calculateLocalInertia(mass: number, inertia: btVector3): void;
  }
  export class btSphereShape {
    constructor(radius: number);
    calculateLocalInertia(mass: number, inertia: btVector3): void;
  }
  export class btDefaultMotionState {
    constructor(startTransform: btTransform);
  }
  export class btRigidBodyConstructionInfo {
    constructor(mass: number, motionState: btDefaultMotionState, collisionShape: btBoxShape, localInertia: btVector3);
  }
  export class btRigidBody {
    constructor(info: btRigidBodyConstructionInfo);
    getWorldTransform(): btTransform;
  }
}
