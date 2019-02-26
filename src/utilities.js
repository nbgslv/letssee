export default class Utilities {
  static getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  static getIndex(array, property, value){
    for (let j = 0; j < array.length; j += 1) {
      const object = array[j];
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        if (object[property] === value) {
          return j;
        }
      } else {
        console.log(`The array provided must include objects and the property ${property}`);
        return -1;
      }
    }
  }
}
