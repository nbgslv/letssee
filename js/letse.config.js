import Settings from './settings';

const plugins = [{
  name: 'rectangle',
  className: 'Rectangle',
  category: 'tool',
  properties: {
    enable: true,
    toolbar: 'main',
    icon: '/assets/images/sweep.png',
    active: false,
    events: [
      'mousedown',
      'mouseup',
      'mousemove',
    ],
    functions: [
      'mouseDown',
      'mouseUp',
      'mouseMove',
    ],
  },
}];

Settings.sortPlugins(plugins);
