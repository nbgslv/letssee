import Tool from './tools';

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
        const tool = new Tool(plugin.name, plugin.properties, plugin.events);
        tools.push(tool);
      }
    });
    return tools;
  }
}
