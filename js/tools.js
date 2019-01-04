export const tools = [];

export class Tool {
  constructor(tool) {
    this.name = tool.name;
    this.category = tool;
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
    this.active = false;
    tools.push(this);
  }
}
