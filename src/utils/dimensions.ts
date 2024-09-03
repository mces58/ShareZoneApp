import { Dimensions, PixelRatio } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;

const MIN_SCALE_FACTOR = 0.85;
const MAX_SCALE_FACTOR = 1.15;

const scaleWidth = (size: number): number => {
  const scale = (deviceWidth / baseWidth) * size;
  return Math.max(MIN_SCALE_FACTOR * size, Math.min(scale, MAX_SCALE_FACTOR * size));
};

const scaleHeight = (size: number): number => {
  const scale = (deviceHeight / baseHeight) * size;
  return Math.max(MIN_SCALE_FACTOR * size, Math.min(scale, MAX_SCALE_FACTOR * size));
};

const scaleFontSize = (size: number): number => {
  const scale = size * PixelRatio.getFontScale();
  return Math.max(MIN_SCALE_FACTOR * size, Math.min(scale, MAX_SCALE_FACTOR * size));
};

const scaleProportionally = (size: number): number => {
  const scale = ((deviceWidth / baseWidth + deviceHeight / baseHeight) / 2) * size;
  return Math.max(MIN_SCALE_FACTOR * size, Math.min(scale, MAX_SCALE_FACTOR * size));
};

const scaleByAspectRatio = (size: number): number => {
  const aspectRatio = deviceWidth / deviceHeight;
  const baseAspectRatio = baseWidth / baseHeight;
  const scale = (aspectRatio / baseAspectRatio) * size;
  return Math.max(MIN_SCALE_FACTOR * size, Math.min(scale, MAX_SCALE_FACTOR * size));
};

export {
  scaleWidth,
  scaleHeight,
  scaleFontSize,
  scaleProportionally,
  scaleByAspectRatio,
};
