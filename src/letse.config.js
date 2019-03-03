export const plugins = [
  {
    category: 'tool',
    name: 'clear',
    properties: {
      enable: true,
      type: 'own-click',
      toolbar: 'main',
      icon: '/assets/images/icons/sweep.png',
      cursor: 'crosshair',
      active: false,
    },
    events: {
      clear: 'click',
    },
  },
];

// TODO validity check for plugin structure
