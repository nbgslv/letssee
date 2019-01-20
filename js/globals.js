export const CANVAS_STATE = {
  dragging: false,
  activeTool: 'hold',
  valid: false,
  selection: [],
  dragoffx: 0,
  dragoffy: 0,
  canvas: {
    zoom: 1,
    draggable: false,
    width: 0,
    height: 0,
    viewPortX: 0,
    viewPortY: 0,
  },
};

export const CANVAS_PROPERTIES = {
  document: {
    width: 0,
    height: 0,
  },

};
export const UNDO = [];
export const REDO = [];
