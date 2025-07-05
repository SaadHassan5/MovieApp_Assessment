import React, {useState} from 'react';
import {ImageBackground, View, ActivityIndicator, StyleSheet, ImageSourcePropType, StyleProp, ImageStyle, ViewStyle} from 'react-native';

interface LoadingImageBackgroundProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const LoadingImageBackground: React.FC<LoadingImageBackgroundProps> = ({
  source,
  style,
  containerStyle,
  children,
  imageStyle,
  resizeMode = 'cover',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Background image that's always visible */}
      <ImageBackground
        source={source}
        style={[styles.imageBackground, style]}
        imageStyle={[styles.image, imageStyle]}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      >
        {/* Semi-transparent overlay that shows during loading/error */}
        {(isLoading || hasError) && (
          <View style={styles.overlay}>
            {isLoading && (
              <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
            )}
          </View>
        )}
        {/* Children will be rendered on top of the overlay */}
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    transform: [{scale: 1.5}],
  },
});

export default LoadingImageBackground;
