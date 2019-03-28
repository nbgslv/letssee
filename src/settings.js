import Tool from './tools';

// import plugins
import Circle from './plugins/circle';
import Clear from './plugins/clear';
import CurvedRectangle from './plugins/curvedrectangle';
import Line from './plugins/line';
import Rectangle from './plugins/rectangle';
import Text from './plugins/text';
import Triangle from './plugins/triangle';
import Undoredo from './plugins/undoredo';
import Viewport from './plugins/viewport';
import ZoomInOut from './plugins/zoominout';

// plugins map
const pluginsMap = {
  Circle,
  Clear,
  CurvedRectangle,
  Line,
  Rectangle,
  Text,
  Triangle,
  Undoredo,
  Viewport,
  ZoomInOut,
};

export default class Settings {
  constructor(plugins, defaultTools) {
    this.timeStamp = new Date();
    console.log(`[Settings created: ${this.timeStamp}]`);
    this.plugins = plugins;
    this.defaultTools = defaultTools;
  }

  createTools() {
    const plugins = [...this.defaultTools, ...this.plugins];
    const tools = [];
    plugins.forEach((plugin) => {
      if (plugin.category === 'tool') {
        const tool = new Tool(plugin.name, plugin.moduleName, plugin.properties, plugin.events);
        tools.push(tool);
      }
    });
    return tools;
  }

  get pluginsMap() {
    return pluginsMap;
  }
}
