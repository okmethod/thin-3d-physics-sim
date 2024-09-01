import * as pc from "playcanvas";

export const scaledVec3 = (vec3: pc.Vec3, scale: number): pc.Vec3 => {
  return vec3.clone().mul(new pc.Vec3(scale, scale, scale));
};
