import {StyleSheet} from 'react-native';
import {HP, WP} from '../../assets/config/space';
import { colors } from '../../assets/config/colors';
import fontFamily from '../../assets/config/fontFamily';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  contentCont: {
    gap: WP(2.5),
    paddingVertical: HP(2),
  },
  item: {
    width: '100%',
    height: HP(24),
    backgroundColor: colors.white,
    borderRadius: WP(2.5),
    overflow:'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: WP(2.5),

  },
  shadowOverlay: {
    borderBottomEndRadius: WP(2.5),
    borderBottomStartRadius: WP(2.5),
    height:HP(9),position:'absolute',bottom:0,width:'100%'
  },
  text: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: colors.white,
    position: 'absolute',
    bottom: HP(2),
    left: WP(4),
    width: WP(80),
  },
});
