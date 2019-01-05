export const Tools = [];

export class Tool {
  constructor(tool) {
    this.name = tool.name;
    this.category = 'tool';
    this.active = false;
    this.properties = tool.properties;
    this.events = tool.events;
    this.mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      width: 0,
      height: 0,
    };
    this.enable = tool.enable;
  }

  static toolHandler(tool, canvas) {
    tool.properties.active = true;
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.start, (e) => {
      tool.tool.mouseDown(e);
    });
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.control, (e) => {
      tool.tool.mouseMove(e, canvas);
    });
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.end, (e) => {
      tool.tool.mouseUp(e, canvas);
    });
    this.activeToolName(tool.tool.name);
  }
}
