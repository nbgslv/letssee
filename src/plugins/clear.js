export default class Clear extends Element {
  static clear(e, tool) {
    tool.editor.canvasUpdate(2, false);
  }
}
