import Editor from "js/editor";

export default class Tools {
  constructor(plugins) {
    this.plugins = plugins;
    this.tools = function () {
      let tools = [];
      plugins.forEach((tool) => {
        if (tool.properties.field === 'tool') {
          tools.push(tool);
        }
      });
      return tools;
    };
  }

  buildToolbar(tools, canvas) {
    tools.plugins.forEach((tool) => {
      const div = document.createElement('div');
      div.style.backgroundImage = `url("${tool.tool.properties.icon}")`;
      div.setAttribute('id', tool.name);
      div.setAttribute('class', 'tool enable unactive');
      div.addEventListener('click', () => Editor.toolHandler(tool));
      if (tool.tool.properties.toolbar === 'main') {
        canvas.mainToolbar.appendChild(div);
      } else if (tool.tool.properties.toolbar === 'second') {
        canvas.secondToolbar.appendChild(div);
      }
    });
  }



  activeToolName(toolName) {
    this.activeTool = toolName;
  }
}
