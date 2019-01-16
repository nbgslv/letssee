import { Elements } from './element';

export default class ZoomInOut {
  static canvasZoomIn(e, canvas) {
    const scale = 1.1;

    canvas.upperCanvas.ctx.translate(
      -(
        (canvas.upperCanvas.width * scale - canvas.upperCanvas.width)
        / scale * scale),
      -(
        (canvas.upperCanvas.height * scale - canvas.upperCanvas.height)
        / scale * scale),
    );
    canvas.upperCanvas.ctx.scale(scale, scale);
    // canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);

    canvas.canvas.ctx.translate(
      -(
        (canvas.canvas.width * scale - canvas.canvas.width)
      / scale * scale
      ),
      -(
        (canvas.canvas.height * scale - canvas.canvas.height)
        / scale * scale),
    );
    canvas.canvas.ctx.scale(scale, scale);
    /* canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    }); */
  }

  static canvasZoomOut(e, canvas) {
    const scale = 0.9;

    canvas.upperCanvas.ctx.translate(
      -(
        (canvas.upperCanvas.width * scale - canvas.upperCanvas.width)
        / scale * scale),
      -(
        (canvas.upperCanvas.height * scale - canvas.upperCanvas.height)
        / scale * scale),
    );
    canvas.upperCanvas.ctx.scale(scale, scale);

    canvas.canvas.ctx.translate(
      -(
        (canvas.canvas.width * scale - canvas.canvas.width)
        / scale * scale),
      -(
        (canvas.canvas.height * scale - canvas.canvas.height)
        / scale * scale),
    );
    canvas.canvas.ctx.scale(scale, scale);
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });
    console.log(canvas.canvas.ctx.translate(
      -(
        (canvas.canvas.width * scale - canvas.canvas.width)
        / scale * scale),
      -(
        (canvas.canvas.height * scale - canvas.canvas.height)
        / scale * scale),
    ));
    console.log(canvas.upperCanvas.ctx.translate(
      -(
        (canvas.upperCanvas.width * scale - canvas.upperCanvas.width)
        / scale * scale),
      -(
        (canvas.upperCanvas.height * scale - canvas.upperCanvas.height)
        / scale * scale),
    ));
    console.log(scale);
  }
}
