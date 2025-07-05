import React, {useState, useEffect, useContext} from 'react';
import { useLoading } from '../../context/LoadingContext';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import LoadingImageBackground from '../../components/LoadingImageBackground/LoadingImageBackground';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import MovieService from '../../services/movieService';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp, WatchStackNavigationProp} from '../../types/navigatorTypes';
import {Movie, MovieListResponse} from '../../types/movieTypes';
import {HP, WP} from '../../assets/config/space';
import {colors} from '../../assets/config/colors';
import Svgs from '../../assets/graphics/svgs';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGE_URL_FROM_ENV} from '@env';

const MovieListScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const { showLoading, hideLoading } = useLoading();
  const watchStackNavigation = useNavigation<WatchStackNavigationProp<'SearchMovie'>>();
  const rootNavigation = useNavigation<RootStackNavigationProp<'MovieDetail'>>();
  
  useEffect(() => {
    getMovies(page);
  }, [page]);
  
  const getMovies = async (pageNumber: number) => {
    try {
      showLoading();
      const response = await MovieService.getMovies(pageNumber);
      if (pageNumber === 1) {
        setMovies(response.results);
      } else {
        setMovies(prevMovies => [...prevMovies, ...response.results]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      hideLoading();
    }
  };

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() => rootNavigation.navigate('MovieDetail', {movieId: item.id})}>
        <LoadingImageBackground
          source={{
            uri: `${IMAGE_URL_FROM_ENV}${item.poster_path}`,
          }}
          style={styles.image}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.shadowOverlay}
          />
          <Text style={styles.text}>{item.original_title}</Text>
        </LoadingImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper>
      <CustomHeader
        onPress={() => watchStackNavigation.navigate('SearchMovie')}
        onPressLeft={() => watchStackNavigation.navigate('SearchMovie')}
        onPressRight={() => watchStackNavigation.navigate('SearchMovie')}
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
