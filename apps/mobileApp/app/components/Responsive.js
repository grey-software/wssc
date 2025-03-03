import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

export const RH = (val) => {
  if (val === null || val === undefined) {
    return null;
  } else {
    let result = (val / 100) * height;
    return result;
  }
};

export const RW = (val) => {
  if (val === null || val === undefined) {
    return null;
  } else {
    let result = (val / 100) * width;
    return result;
  }
};

export const RF = (val) => {
  let factor = PixelRatio.get();
  factor > 2.2 ? (factor = 2) : null;
  let size = ((factor * width) / 1000) * val;
  return size + 4;
};

export const RR = (val) => {
  let result = val / 100;
  result = result * (height + width);
  return result * 0.13;
};

export default { RH, RW, RF, RR };
