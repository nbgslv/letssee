export const defaultTools = [
  {
    category: 'tool',
    name: 'hold',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/hand.png',
      cursor: 'grab',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      mouseMove: 'mousemove',
      mouseUp: 'mouseup',
    },
  },
  {
    category: 'tool',
    name: 'undoredo',
    properties: {
      enable: true,
      type: 'own-click',
      toolbar: 'second',
      icon: '/assets/images/reply.png',
      cursor: 'default',
      active: false,
    },
    events: {
      canvasUndo: 'click',
    },
  },
  {
    category: 'tool',
    name: 'undoredo',
    properties: {
      enable: true,
      type: 'own-click',
      toolbar: 'second',
      icon: '/assets/images/redo.png',
      cursor: 'default',
      active: false,
    },
    events: {
      canvasRedo: 'click',
    },
  },
  {
    category: 'tool',
    name: 'zoominout',
    properties: {
      enable: true,
      type: 'own-click',
      toolbar: 'second',
      icon: '/assets/images/zoom.png',
      cursor: 'default',
      active: false,
    },
    events: {
      canvasZoomIn: 'click',
    },
  },
  {
    category: 'tool',
    name: 'zoominout',
    properties: {
      enable: true,
      type: 'own-click',
      toolbar: 'second',
      icon: '/assets/images/zoom-out.png',
      cursor: 'default',
      active: false,
    },
    events: {
      canvasZoomOut: 'click',
    },
  },
  {
    category: 'tool',
    name: 'viewport',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'second',
      icon: '/assets/images/drag.png',
      cursor: 'all-scroll',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      drag: 'mousemove',
      mouseUp: 'mouseup',
    },
  },
  {
    category: 'tool',
    name: 'line',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/line.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      mouseMove: 'mousemove',
      mouseUp: 'mouseup',
    },
  },
  {
    category: 'tool',
    name: 'circle',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/ellipse.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      mouseMove: 'mousemove',
      mouseUp: 'mouseup',
    },
  },
  {
    category: 'tool',
    name: 'triangle',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/triangle.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      mouseMove: 'mousemove',
      mouseUp: 'mouseup',
    },
  },
  {
    category: 'tool',
    name: 'curvedrectangle',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/minus.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
      mouseMove: 'mousemove',
      mouseUp: 'mouseup',
    },
  },
  {
    category: 'tool',
    name: 'text',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/font.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      mouseDown: 'mousedown',
    },
  },
  {
    category: 'tool',
    name: 'layers',
    properties: {
      enable: true,
      type: 'own-click',
      toolbar: 'second',
      icon: '/assets/images/forward.png',
      cursor: 'default',
      active: false,
    },
    events: {
      elementForward: 'click',
    },
  },
  {
    category: 'tool',
    name: 'layers',
    properties: {
      enable: true,
      type: 'own-click',
      toolbar: 'second',
      icon: '/assets/images/backward.png',
      cursor: 'default',
      active: false,
    },
    events: {
      elementBackward: 'click',
    },
  },
];

// TODO add variable of tool ordering
