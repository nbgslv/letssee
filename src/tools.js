export default class Tool {
  constructor(name, properties, events, editor = undefined) {
    this.name = name;
    this.toolInstance = this;
    this.editor = editor;
  }

  createElement() {
    import('./plugins/' + this.name).then((toolModule) => {
      toolModule['onMouseDown']();
    });
  }

  recordUndo() {
    this.editor.undo.length = 0;
    this.editor.elements.forEach((element) => {
      this.editor.undo.push(element);
    });
  }
}
