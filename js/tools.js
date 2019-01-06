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

  static eventHandler(e, tool) {
    import('./' + tool.name).then((toolModule) => {

      Object.keys(tool.events).forEach((event) => {
        if (tool.events[event] === e.type) {
          toolModule.default[event];
        }
      });
    });
  }
}
