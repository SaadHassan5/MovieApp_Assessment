import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import fontFamily from '../../assets/config/fontFamily';
import {colors} from '../../assets/config/colors';
import {HP, mvs, WP} from '../../assets/config/space';
import {GlobalStyles} from '../../assets/config/globalStyles';

interface CustomHeaderProps {
  onPress?: () => void;
  title?: string;
  IconLeft?: any;
  IconRight?: any;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  style?: ViewStyle;
  txtStyle?: TextStyle;
  detail?: {
    name:string,
    description:string
  };
}

export default function CustomHeader({
  onPress,
  IconLeft,
  IconRight,
  title,
  onPressLeft,
  onPressRight,
  style,
  txtStyle,
  detail,
}: CustomHeaderProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, style]}
      onPress={onPress}>
      <View style={[GlobalStyles().row, GlobalStyles(WP(1.2)).columnGap]}>
        {IconLeft && (
          <TouchableOpacity onPress={onPressLeft} style={styles.icon}>
            {IconLeft}
          </TouchableOpacity>
        )}
        {title && <Text style={[styles.titleTxt, txtStyle]}>{title}</Text>}
      </View>
        {detail?.name && <View style={GlobalStyles(HP(0.7)).rowGap}>
          <Text style={styles.nameTxt}>{detail?.name}</Text>
          <Text style={styles.descTxt}>{detail?.description}</Text>
          </View>}
      {IconRight && (
        <TouchableOpacity onPress={onPressRight} style={styles.icon}>
          {IconRight}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles().rowBetween,
    paddingHorizontal: WP(5),
    paddingVertical: WP(3),
    backgroundColor: colors.white,
    alignItems: 'flex-start',
  },
  titleTxt: {
    fontFamily: fontFamily.medium,
    fontSize: mvs(16),
    color: colors.text_black,
    lineHeight: mvs(22),
  },
  icon: {
    width: WP(7.5),
    height: WP(7.5),
    ...GlobalStyles().center,
  },
  nameTxt:{
    fontFamily: fontFamily.medium,
    fontSize: mvs(16),
    color: colors.text_black,
    lineHeight: mvs(22),
    textAlign:"center"
  },
  descTxt:{
    fontFamily: fontFamily.medium,
    fontSize: mvs(12),
    color: colors.MayaBlue,
    lineHeight: mvs(15),
    textAlign:"center"
  }
});
