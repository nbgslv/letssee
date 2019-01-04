import { Tool } from './tools'

export default class Settings {
  static plugins(plugins) {
    plugins.forEach((plugin) => {
      if (plugin.category === 'tool') {
        const tool = new Tool(plugin);
      }
    });
  }
}
