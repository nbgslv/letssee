import DynamicClasses from './dynamicClasses';

export default class Tool {
  constructor(name, properties, events, editor = undefined) {
    this.name = name;
    this.toolInstance = this;
    this.properties = properties;
    this.events = events;
    this.editor = editor;
  }

  createElement() {
    const args = [
      this.name,
      this,
      this.editor,
    ];
    new DynamicClasses(this.name, args);
  }
}
