import Editor from './editor';
import Rectangle from './rectangle';
import Tools from './tools';

const plugins = [
  {
    tool: new Rectangle(),
  },
];

const editor = new Editor('letse-canvas-container', 300, 300, null, plugins);
// const canvas = editor.canvas();
const tools = new Tools(plugins);
tools.buildToolbar(tools, editor.canvas);
