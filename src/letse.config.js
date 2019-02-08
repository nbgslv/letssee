export const plugins = [
  {
    category: 'tool',
    name: 'rectangle',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/sweep.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      mouseMove: 'mousemove',
      mouseUp: 'mouseup',
      Redo: 'redo',
    },
  },
];

// TODO validity check for plugin structure
