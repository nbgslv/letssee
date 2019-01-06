export default class Hold {
  static mouseDown(e) {
    const mousePosition = Editor.checkMousePosition(e, this.canvas);
    const mouse = {
      positionX: mousePosition.x,
      positionY: mousePosition.y,
    };

    this.elements.forEach((element) => {
      if (element.mouseInShape(mouse.positionX, mouse.positionY)) {
        // let selection = this.selection;
        this.dragoffx = mouse.positionX - element.x;
        this.dragoffy = mouse.positionY - element.y;
        this.dragging = true;
        this.selection = element;
        let selection = this.selection;
        this.valid = false;
        this.canvas.upperCanvas.ctx.strokeStyle = '#CC0000';
        this.canvas.upperCanvas.ctx.lineWidth = 2;
        this.canvas.upperCanvas.ctx.strokeRect(selection.x,
          selection.y,
          selection.width,
          selection.height);
      }
    });
  }

  static mouseMove(e) {
    if (this.dragging) {
      const mousePosition = Editor.checkMousePosition(e, this.canvas);
      this.selection.x = mousePosition.x - this.dragoffx;
      this.selection.y = mousePosition.y - this.dragoffy;
      this.valid = false;
    }
    console.log('It worked!');
  }

  static mouseUp(e) {
    this.dragging = false;
  }
}