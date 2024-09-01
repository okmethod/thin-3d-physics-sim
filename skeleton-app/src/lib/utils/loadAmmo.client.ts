import * as pc from "playcanvas";
import { base } from "$app/paths";

pc.WasmModule.setConfig("Ammo", {
  glueUrl: `${base}/ammo.js/ammo.wasm.js`,
  wasmUrl: `${base}/ammo.js/ammo.wasm.wasm`,
  fallbackUrl: `${base}/ammo.js/ammo.js`,
});

export function loadAmmo(): Promise<void> {
  return new Promise<void>((resolve) => {
    pc.WasmModule.getInstance("Ammo", (instance: unknown) => {
      console.log("Loaded Ammo.js successfully");
      console.debug("moduleInstance:", instance);
      resolve();
    });
  });
}

export default loadAmmo;
