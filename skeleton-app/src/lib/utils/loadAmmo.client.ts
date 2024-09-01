import * as pc from "playcanvas";

async function setConfigAmmo(fetchFunction: typeof window.fetch): Promise<void> {
  const rootPath = "https://raw.githubusercontent.com/kripken/ammo.js/main/builds";
  const glueUrl = `${rootPath}/ammo.wasm.js`;
  const wasmUrl = `${rootPath}/ammo.wasm.wasm`;
  const fallbackUrl = `${rootPath}/ammo.js`;

  const localGlueUrl = await fetchAndCreateBlob(fetchFunction, glueUrl, "application/javascript");
  const localWasmUrl = await fetchAndCreateBlob(fetchFunction, wasmUrl, "application/wasm");
  const localFallbackUrl = await fetchAndCreateBlob(fetchFunction, fallbackUrl, "application/javascript");

  pc.WasmModule.setConfig("Ammo", {
    glueUrl: localGlueUrl,
    wasmUrl: localWasmUrl,
    fallbackUrl: localFallbackUrl,
  });
}

async function fetchAndCreateBlob(fetchFunction: typeof window.fetch, url: string, type: string): Promise<string> {
  const response = await fetchFunction(url);
  if (!response.ok) {
    throw new Error(`Failed to load script: ${url}`);
  }
  const data = type === "application/wasm" ? await response.arrayBuffer() : await response.text();
  const blob = new Blob([data], { type });
  return URL.createObjectURL(blob);
}

export async function loadAmmo(fetchFunction: typeof window.fetch): Promise<void> {
  await setConfigAmmo(fetchFunction);
  return new Promise<void>((resolve) => {
    pc.WasmModule.getInstance("Ammo", (instance: unknown) => {
      console.log("Loaded Ammo.js successfully");
      console.debug("moduleInstance:", instance);
      resolve();
    });
  });
}

export default loadAmmo;
