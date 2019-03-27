// import plugins
import Circle from './plugins/circle';
import Clear from './plugins/clear';
import CurvedRectangle from './plugins/curvedrectangle';
import Line from './plugins/line';
import Rectangle from './plugins/rectangle';
import Text from './plugins/text';
import Triangle from './plugins/triangle';
import Undoredo from './plugins/undoredo';
import Viewport from './plugins/viewport';
import ZoomInOut from './plugins/zoominout';

// plugins map
const pluginsMap = new Map();

pluginsMap.set('circle', Circle);
pluginsMap.set('clear', Clear);
pluginsMap.set('curvedrectangle', CurvedRectangle);
pluginsMap.set('line', Line);
pluginsMap.set('rectangle', Rectangle);
pluginsMap.set('text', Text);
pluginsMap.set('triangle', Triangle);
pluginsMap.set('undoredo', Undoredo);
pluginsMap.set('viewport', Viewport);
pluginsMap.set('zoominout', ZoomInOut);

export default class DynamicClasses {
  constructor(className, args) {
    return new pluginsMap.get(className)(args);
  }
}
