import {StyleSheet} from 'react-native';
import { HP, WP } from '../../assets/config/space';
import fontFamily from '../../assets/config/fontFamily';
import { colors } from '../../assets/config/colors';

export const styles = (props?: any) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.screenBackground},
    contentCont:{
        paddingBottom:HP(10)
    },
    coverImage: {
      height: HP(65),
      width: WP(100),
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    shadowOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.TransparentBlack,
      borderRadius: 10,
    },
    inTheaters: {
      fontSize: 16,
      fontFamily: fontFamily.medium,
      color: colors.white,
      marginBottom: HP(1.5),
    },
    ticketBtn: {
      backgroundColor: colors.robinEggBlue,
      width: WP(50),
      height: HP(6.5),
      alignItems: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      marginBottom: HP(1),
    },
    btnTxt: {
      fontSize: 16,
      fontFamily: fontFamily.semi_bold,
      color: colors.white,
    },
    watchBtn: {
      borderColor: colors.robinEggBlue,
      borderWidth: 1,
      marginBottom: HP(3.4),
      width: WP(50),
      height: HP(6.5),
      alignItems: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    playImg: {width: 8, height: 12},
    bottomView: {
      width: WP(90),
      alignSelf: 'center',
      marginVertical: HP(3),
      gap: 10,
    },
    genreTxt: {
      fontSize: 16,
      fontFamily: fontFamily.medium,
      color: colors.iconGrey,
    },
    mapCont: {flexDirection: 'row', gap: 10,},
    mapGenreTxt: {
      color: colors.white,
      fontSize: 12,
      fontFamily: fontFamily.semi_bold,
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 16,
      backgroundColor: props,
    },
    border: {
      borderWidth: 1,
      alignSelf: 'center',
      borderColor: colors.whiteBorder,
      marginTop: HP(1),
      width: WP(90),
    },
    overViewTxt: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.iconGrey,
      lineHeight: 19,
    },
    youtubeCont: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: colors.black,
    },
  });
