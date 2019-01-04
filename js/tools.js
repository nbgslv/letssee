export const Tools = [];

export class Tool {
  constructor(tool) {
    this.name = tool.name;
    this.className = tool.className;
    this.category = tool.category;
    this.properties = tool.properties;
    this.events = tool.events;
    this.functions = tool.functions;
    this.mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      width: 0,
      height: 0,
    };
    this.enable = tool.enable;
    this.active = false;
  }
}
