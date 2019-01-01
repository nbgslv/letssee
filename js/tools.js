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
      div.addEventListener('click', () => this.toolHandler(tool, canvas));
      if (tool.tool.properties.toolbar === 'main') {
        canvas.mainToolbar.appendChild(div);
      } else if (tool.tool.properties.toolbar === 'second') {
        canvas.secondToolbar.appendChild(div);
      }
    });
  }

  toolHandler(tool, canvas) {
    tool.tool.properties.active = true;
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.start, (e) => {
      tool.tool.mouseDown(e);
    });
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.control, (e) => {
      tool.tool.mouseMove(e, canvas);
    });
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.end, (e) => {
      tool.tool.mouseUp(e, canvas);
    });
    this.activeToolName(tool.tool.name);
  }

  activeToolName(toolName) {
    this.activeTool = toolName;
  }
}
