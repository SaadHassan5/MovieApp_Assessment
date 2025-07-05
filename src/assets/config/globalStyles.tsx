import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {HP, WP, mvs} from './space';
import fontFamily from './fontFamily';

export const GlobalStyles = (props?: any, props1?: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    padContainer: {
      paddingHorizontal: props ? props : mvs(15),
      paddingBottom: HP(8),
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorTxt: {
      color: colors.red,
      fontSize: mvs(13),
      fontFamily: fontFamily.medium,
      marginTop: HP(0.5),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowGap: {
      rowGap: props ? props : WP(2),
    },
    marginTop: {
      marginTop: props,
    },
    columnGap: {
      columnGap: props ? props : WP(2),
    },
    shadow: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    },
    card: {
      backgroundColor: '#ffff',
      padding: WP(3),
      borderRadius: WP(2),
    },
    betweenContent: {
      justifyContent: 'space-between',
    },
    dotView: {
      padding: WP(props1 ? props1 : 1.5),
      backgroundColor: props ? props : colors.blue,
      borderRadius: WP(3),
    },
    line: {
      backgroundColor: props ? props : colors.borderLineBlue,
      height: WP(0.2),
    },
  });
