import * as pc from "playcanvas";

let lastX = 0;
let lastY = 0;
let isDragging = false;

function addMouseEvents(app: pc.Application, camera: pc.Entity): void {
  if (app.mouse) {
    app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
      isDragging = true;
      lastX = event.x;
      lastY = event.y;
    });
    app.mouse.on(pc.EVENT_MOUSEMOVE, (event) => {
      if (isDragging) {
        const dx = event.x - lastX;
        const dy = event.y - lastY;
        camera.rotateLocal(dy * 0.1, dx * 0.1, 0);
        lastX = event.x;
        lastY = event.y;
      }
    });
    app.mouse.on(pc.EVENT_MOUSEUP, () => {
      isDragging = false;
    });
  }
}

function addTouchEvents(app: pc.Application, camera: pc.Entity): void {
  if (app.touch) {
    app.touch.on(pc.EVENT_TOUCHSTART, (event) => {
      isDragging = true;
      lastX = event.touches[0].x;
      lastY = event.touches[0].y;
    });
    app.touch.on(pc.EVENT_TOUCHMOVE, (event) => {
      if (isDragging && event.touches.length === 1) {
        const dx = event.touches[0].x - lastX;
        const dy = event.touches[0].y - lastY;
        camera.rotateLocal(dy * 0.1, dx * 0.1, 0);
        lastX = event.touches[0].x;
        lastY = event.touches[0].y;
      }
    });
    app.touch.on(pc.EVENT_TOUCHEND, () => {
      isDragging = false;
    });
  }
}

function addMoveCameraEvents(app: pc.Application, camera: pc.Entity): void {
  addMouseEvents(app, camera);
  addTouchEvents(app, camera);
}

export default addMoveCameraEvents;
