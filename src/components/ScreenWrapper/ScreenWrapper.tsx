import React, {ReactNode} from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../assets/config/colors';

type ScreenWrapperProps = {
  children: ReactNode;
  style?: object;
  statusBarStyle?: 'light-content' | 'dark-content';
  statusBarBackground?: string;
};

const ScreenWrapper = ({
  children,
  style,
  statusBarStyle = 'dark-content',
  statusBarBackground = colors.white,
}: ScreenWrapperProps) => {
  const Wrapper = statusBarBackground === 'transparent' ? View : SafeAreaView;

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackground}
        translucent={true}
      />
      <Wrapper style={[styles.container, style]}>{children}</Wrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
});

export default ScreenWrapper;
