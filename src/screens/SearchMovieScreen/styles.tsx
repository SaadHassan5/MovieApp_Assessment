import { StyleSheet } from 'react-native';
import { colors } from '../../assets/config/colors';
import { HP, WP } from '../../assets/config/space';
import fontFamily from '../../assets/config/fontFamily';

export const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor:colors.screenBackground},
    contentCont: {
      gap: WP(3),
      paddingVertical: HP(2),
    },
    columnWrapper: {
      columnGap:WP(3)
    },
    item: {
      width: WP(44.5),
      height: HP(11.5),
      backgroundColor: colors.white,
      borderRadius: 10,
      // overlayColor: Theme.Gunmetal,
      // shadowColor: Theme.Gray,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    shadowOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.TransparentBlack,
      borderRadius: 10,
    },
    loader: {
      position: 'absolute',
    },
    text: {
      fontSize: 16,
      fontFamily: fontFamily.medium,
      color: colors.white,
      position: 'absolute',
      bottom: HP(2),
      left: WP(4),
    },
    searchIcon: {width: 45, height: 45},
    titleCont: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontFamily: fontFamily.medium,
      color: colors.text_black,
    },
    genre: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.gainsboro,
    },
    movieItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    movieImage: {
      width: 130,
      height: 100,
      borderRadius: 10,
    },
    result: {
      width: WP(90),
      alignSelf: 'center',
      fontSize: 12,
      color: colors.text_black,
      marginTop: HP(1),
    },
    borderLine: {
      borderWidth: 1,
      alignSelf: 'center',
      borderColor: colors.gainsboro,
      marginVertical: HP(1),
      width: WP(90),
    },
  });
  
