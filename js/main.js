import Settings from './settings';
import Editor from './editor';
import { defaultTools } from './letse.default.tools.config';
import { plugins } from './letse.config';
import { CANVAS_STATE } from './globals';

try {
  const checkConfig = require('./letse.config');
} catch (e) {
  console.log('Config file doesn\'t exists');
}
const settings = new Settings(plugins, defaultTools);
CANVAS_STATE.activeTool = settings.createPlugins();
// will return the first tool
// in letse.default.tools.config as
// the default active tool

const editor = new Editor('letse-canvas-container', 300, 300, null);
editor.initCanvas();
editor.initToolBars();
