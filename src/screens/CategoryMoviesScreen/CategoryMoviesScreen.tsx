import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {IMAGE_URL_FROM_ENV} from '@env';
import {useNavigation} from '@react-navigation/native';
import MovieService from '../../services/movieService';
import {HP, mvs, WP} from '../../assets/config/space';
import {colors} from '../../assets/config/colors';
import fontFamily from '../../assets/config/fontFamily';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Svgs from '../../assets/graphics/svgs';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';

export default function CategoryMoviesScreen(props?: any) {
  const {category} = props.route.params;
  const [movies, setMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    getMovies();
  }, [page]);

  const getMovies = async () => {
    const movieResponse = await MovieService.getCategoryImages(
      category?.id,
      page,
    );
    setMovies((prev: any) => [...prev, ...movieResponse.results]);
  };

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() =>
          props?.navigation?.navigate('MovieDetail', {movieId: item.id})
        }>
        <ImageBackground
          source={{
            uri: `${IMAGE_URL_FROM_ENV + item.poster_path}`,
          }}
          style={styles.image}>
          <View style={styles.shadowOverlay} />
          <Text style={styles.text}>{item.original_title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <CustomHeader
        title="Back"
        IconLeft={<Svgs.backArrow color={colors.black}/>}
        onPressLeft={() => navigation?.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `${item.id}_${index}`}
          data={movies}
          renderItem={renderItem}
          contentContainerStyle={styles.contentCont}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.screenBackground},
  contentCont: {
    gap: 10,
    paddingVertical: HP(2),
    alignItems: 'center',
  },
  item: {
    width: WP(92),
    height: HP(21),
    backgroundColor: colors.white,
    borderRadius: 10,
    //   overlayColor: Theme.Gunmetal,
    //   shadowColor: Theme.Gray,
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
  text: {
    fontSize: mvs(18),
    fontFamily: fontFamily.medium,
    color: colors.white,
    position: 'absolute',
    bottom: HP(2),
    left: WP(4),
    width: WP(80),
  },
});
