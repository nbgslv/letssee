export default class Utilities {
  static getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  static degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  static radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  static sin(value) {
    if (value === 0) return 0;
    let sign = 1;
    if (value < 0) sign = -1;

    const angleSlice = value / Math.PI * 2;
    switch (angleSlice) {
      case 1: return sign;
      case 2: return 0;
      case 3: return -sign;
    }

    return Math.sin(value);
  }

  static cos(value) {
    if (value === 0) return 1;
    if (value < 0) value = -value;

    const angleSlice = value / Math.PI * 2;
    switch (angleSlice) {
      case 1: case 3: return 0;
      case 2: return -1;
    }

    return Math.cos(value);
  }
}
