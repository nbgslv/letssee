import { UNDO } from './globals';
import { Elements } from './element';

export const Tools = [];

export class Tool {
  constructor(name, properties, events) {
    this.name = name;
    this.category = 'tool';
    this.properties = properties;
    this.events = events;
  }

  static eventHandler(e, tool, canvas, element = null) {
    import('./' + tool.name).then((toolModule) => {

      Object.keys(tool.events).forEach((event) => {
        if (tool.events[event] === e.type) {
          const toolEventFunction = toolModule.default[event](e, canvas, tool, element);
        }
      });
    });
  }

  static recordUndo() {
    UNDO.length = 0;
    Elements.forEach((element) => {
      UNDO.push(element);
    });
  }
}
