import { Tool, Tools } from './tools';

export default class Settings {
  static getPlugins(plugins) {
    plugins.forEach((plugin) => {
      if (plugin.category === 'tool') {
        const tool = new Tool(plugin);
        Tools.push(tool);
      }
    });
  }
}
