import { CANVAS_STATE } from './globals';

export default class Layers {
  static addLayer(element) {
    element.layer += CANVAS_STATE.layers;
    CANVAS_STATE.layers++;
  }

  static layerBack(e, canvas) {

  }
}
