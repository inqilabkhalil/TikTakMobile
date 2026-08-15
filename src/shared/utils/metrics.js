import { Dimensions, PixelRatio, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');
const deviceHeight = height;
export const deviceWidth = width;

const layoutWidth = 390;
const layoutHeight = 844;
const widthScaleFactor = deviceWidth / layoutWidth;
const heightScaleFactor = deviceHeight / layoutHeight;

let maxFont = PixelRatio.getFontScale();
const fontScales = [
  { limit: 1.28, value: 0 },
  { limit: 1.6, value: 2 },
  { limit: 2, value: 4 },
  { limit: 2.5, value: 5 },
  { limit: 3, value: 7 },
  { limit: 3.5, value: 8 },
  { limit: Infinity, value: 8.8 },
];
let fontScaleValue = (
  fontScales.find((scale) => maxFont <= scale.limit) || { value: 0 }
).value;

function normalizeWidth(size) {
  const resizedWidth = size * widthScaleFactor;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(resizedWidth));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(resizedWidth)) - 1;
  }
}

function normalizeHeight(size) {
  const resizedHeight = size * heightScaleFactor;
  if (Platform.OS === 'ios') {
    let size = Math.round(PixelRatio.roundToNearestPixel(resizedHeight));
    return size;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(resizedHeight)) - 1;
  }
}

const pixelWidth = (size) => normalizeWidth(size);

const pixelHeight = (size) => {
  let extra = 0;
  if (deviceHeight < 800 && deviceHeight > 700) {
    extra = 2;
  } else if (deviceHeight < 700) {
    extra = 4;
  }
  return normalizeHeight(size) + extra;
};

const pixelFont = (size) => normalizeHeight(size - fontScaleValue);
const pixelVertical = (size) => pixelHeight(size);
const pixelHorizontal = (size) => pixelWidth(size);
const gapHorizontal = (size) => pixelWidth(size);
const gapVertical = (size) => pixelHeight(size);

export {
  pixelWidth,
  gapHorizontal,
  gapVertical,
  pixelHeight,
  pixelFont,
  pixelVertical,
  pixelHorizontal,
};
