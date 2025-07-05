import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import MovieService from '../../services/movieService';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {WP} from '../../assets/config/space';
import {IMAGE_URL_FROM_ENV} from '@env';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Svgs from '../../assets/graphics/svgs';

const MovieListScreen = ({}: any) => {
  const [movies, setMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  useEffect(() => {
    getMovies(page);
  }, [page]);

  const getMovies = async (pageNumber: number) => {
    const response = await MovieService.getMovies(pageNumber);
    setMovies((prev: any) => [...prev, ...response.results]);
  };

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() => navigation?.navigate('MovieDetail', {movieId: item.id})}>
        <ImageBackground
          source={{
            uri: `${IMAGE_URL_FROM_ENV}${item.poster_path}`,
          }}
          style={styles.image}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.shadowOverlay}
          />
          <Text style={styles.text}>{item.original_title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper>
      <CustomHeader
        onPress={() => navigation?.navigate('SearchMovie')}
        onPressLeft={() => navigation?.navigate('SearchMovie')}
        onPressRight={() => navigation?.navigate('SearchMovie')}
        title="Watch"
        IconRight={<Svgs.search />}
      />
      <View style={{flex: 1, paddingHorizontal: WP(5)}}>
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
};

export default MovieListScreen;
