export const Tools = [];

export class Tool {
  constructor(tool) {
    this.name = tool.name;
    this.category = 'tool';
    this.active = false;
    this.properties = tool.properties;
    this.events = tool.events;
    this.enable = tool.enable;
  }

  static eventHandler(e, tool, canvas) {
    import('./' + tool.name).then((toolModule) => {

      Object.keys(tool.events).forEach((event) => {
        if (tool.events[event] === e.type) {
          const toolEventFunction = toolModule.default[event](e, canvas);
        }
      });
    });
  }
}
