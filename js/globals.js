export const CANVAS_PROPERTIES = {
  document: {
    width: 0,
    height: 0,
  },
};

export const CANVAS_STATE = {
  dragging: false,
  activeTool: 'hold',
  valid: false,
  selection: [],
  dragoffx: 0,
  dragoffy: 0,
  canvas: {
    zoom: (1).toFixed(0),
    draggable: false,
    dragging: false,
    width: 0,
    height: 0,
    center: {
      x: 0,
      y: 0,
    },
    viewPort: {
      topLeft: {
        x: 0,
        y: 0,
      },
      bottomRight: {
        x: CANVAS_PROPERTIES.document.width,
        y: CANVAS_PROPERTIES.document.height,
      },
    },
  },
};

export const UNDO = [];

export const REDO = [];
