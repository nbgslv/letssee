export const plugins = [
  {
    category: 'tool',
    name: 'rectangle',
    properties: {
      enable: true,
      toolbar: 'main',
      icon: '/assets/images/sweep.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      mouseMove: 'mousemove',
      mouseUp: 'mouseup',
    },
  },
];

// TODO validity check for plugin structure
