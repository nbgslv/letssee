import Settings from './settings';
import Editor from './editor';
import { defaultTools } from './letse.default.tools.config';
import { plugins } from './letse.config';

try {
  const checkConfig = require('./letse.config');
} catch (e) {
  console.log('Config file doesn\'t exists');
}
const settings = new Settings(plugins, defaultTools);
const tools = settings.createTools();

const editor = new Editor('letse-canvas-container', 300, 300, null, tools);
editor.initCanvas();
editor.initToolBars();
