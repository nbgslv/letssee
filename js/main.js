import Settings from './settings';
import Editor from './editor';

try {
  const checkConfig = require('./letse.config');
} catch (e) {
  console.log('Config file doesn\'t exists');
}

import { plugins } from './letse.config';

Settings.getPlugins(plugins);

const editor = new Editor('letse-canvas-container', 300, 300, null);
