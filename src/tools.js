export default class Tool {
  constructor(name, properties, events, editor = undefined) {
    this.name = name;
    this.category = 'tool';
    this.properties = properties;
    this.events = events;
    this.editor = editor;
  }

  toolEventHandler(e) {
    import('./plugins/' + this.name).then((toolModule) => {
      Object.keys(this.events).forEach((event) => {
        if (this.events[event] === e.type) {
          const toolEventFunction = toolModule.default[event](e, this);
        }
      });
    });
  }

  recordUndo() {
    this.canvas.undo.length = 0;
    this.canvas.elements.forEach((element) => {
      this.canvas.undo.push(element);
    });
  }
}
