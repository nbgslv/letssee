import { TOOLS } from './globals';
import Tool from './tools';

export default class Settings {
  constructor(plugins, defaultTools) {
    this.timeStamp = new Date();
    console.log(`[Settings created: ${this.timeStamp}]`);
    this.plugins = plugins;
    this.defaultTools = defaultTools;
  }

  createPlugins() {
    const plugins = this.defaultTools.concat(this.plugins);
    plugins.forEach((plugin) => {
      if (plugin.category === 'tool') {
        const tool = new Tool(plugin.name, plugin.properties, plugin.events);
        TOOLS.push(tool);
      }
    });
    return plugins[0];
  }
}
