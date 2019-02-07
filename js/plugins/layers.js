import {CANVAS_STATE, ELEMENTS} from '../globals';

export default class Layers {
  static sortByLayers() {
    function sortElement(elementA, elementB) {
      if (elementA.layer < elementB.layer) return -1;
      if (elementA.layer > elementB.layer) return 1;
      return 0;
    }

    ELEMENTS.sort(sortElement);
  }

  static elementBackward(e, canvas, element) {
    element.layer -= 1;
  }

  static elementForward(e, canvas, element) {
    element.layer += 1;
  }
}
