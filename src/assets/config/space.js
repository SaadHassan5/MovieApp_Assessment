import { PixelRatio } from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export const { width, height } = Dimensions.get('window');
const baseSpacing = 8;
export const WP = (widthPercent) => {
  return PixelRatio.roundToNearestPixel((screenWidth * widthPercent) / 100);
};

export const HP = (heightPercent) => {
  return PixelRatio.roundToNearestPixel((screenHeight * heightPercent) / 100);
};
export const getResponsiveSpacing = (spacing) => {
  const shortDimension = width < height ? width : height;
  const longDimension = width < height ? height : width;
  const guidelineBaseWidth = 375;
  const guidelineBaseHeight = 812;
  const scaleFactor = shortDimension / guidelineBaseWidth;
  const vsFactor = longDimension / guidelineBaseHeight;
  const responsiveSpacing = (spacing * scaleFactor * vsFactor) / baseSpacing;
  return responsiveSpacing;
};



const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// //Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseHeight = 812;//686//683
 const vs = (size) => longDimension / guidelineBaseHeight * size;
 const mvs = (size, factor = 0.5) => size + (vs(size) - size) * factor;
 export  {mvs}