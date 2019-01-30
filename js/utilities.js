export default class Utilities {
  static checkMousePosition(e, canvas) {
    let offsetX = 0;
    let offsetY = 0;
    let mousePositionX;
    let mousePositionY;
    const html = document.body.parentNode;
    let upperCanvas = canvas.upperCanvas;
    if (upperCanvas.offsetParent !== undefined) {
      do {
        offsetX += upperCanvas.offsetLeft;
        offsetY += upperCanvas.offsetTop;
      } while ((upperCanvas = upperCanvas.offsetParent));
    }
    upperCanvas = canvas.upperCanvas;
    const stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .paddingLeft, 10) || 0;
    const stylePaddingTop = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .paddingTop, 10) || 0;
    const styleBorderLeft = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .borderLeftWidth, 10) || 0;
    const styleBorderTop = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .borderTopWidth, 10) || 0;

    offsetX += stylePaddingLeft
      + styleBorderLeft
      + html.offsetLeft;
    offsetY += stylePaddingTop
      + styleBorderTop
      + html.offsetTop;
    mousePositionX = e.pageX - offsetX;
    mousePositionY = e.pageY - offsetY;
    return { x: mousePositionX, y: mousePositionY };
  }

  static getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }
}
