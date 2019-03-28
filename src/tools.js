export default class Tool {
  constructor(name, moduleName, properties, events, editor = undefined) {
    this.name = name;
    this.moduleName = moduleName;
    this.toolInstance = this;
    this.properties = properties;
    this.events = events;
    this.editor = editor;
  }

  createElement() {
    const element = this.editor.createElement(this.moduleName, this);
    return element;
  }
}
