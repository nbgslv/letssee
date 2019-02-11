export const defaultTools = [
  {
    category: 'tool',
    name: 'hold',
    properties: {
      enable: true,
      type: 'canvas-tool',
      toolbar: 'main',
      icon: '/assets/images/icons/hand.png',
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
      icon: '/assets/images/icons/reply.png',
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
      icon: '/assets/images/icons/redo.png',
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
      icon: '/assets/images/icons/zoom.png',
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
      icon: '/assets/images/icons/zoom-out.png',
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
      icon: '/assets/images/icons/drag.png',
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
      icon: '/assets/images/icons/line.png',
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
      icon: '/assets/images/icons/ellipse.png',
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
      icon: '/assets/images/icons/triangle.png',
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
      icon: '/assets/images/icons/minus.png',
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
      icon: '/assets/images/icons/font.png',
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
      icon: '/assets/images/icons/forward.png',
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
      icon: '/assets/images/icons/backward.png',
      cursor: 'default',
      active: false,
    },
    events: {
      elementBackward: 'click',
    },
  },
];

// TODO add variable of tool ordering
