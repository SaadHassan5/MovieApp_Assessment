import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  Keyboard,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import {IMAGE_URL_FROM_ENV} from '@env';
import MovieService from '../../services/movieService';
import {styles} from './styles';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Svgs from '../../assets/graphics/svgs';
import {WP} from '../../assets/config/space';
import {colors} from '../../assets/config/colors';

const SearchMovieScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<any>([]);
  const [showMovies, setShowMovies] = useState<boolean>(false);
  useEffect(() => {
    getMovies();
  }, [searchQuery]);

  const getMovies = async () => {
    const response = await MovieService.searchMovies(searchQuery);
    // const moviesWithGenres = response.results.map((movie: any) => {
    //   const firstGenreId = movie.genre_ids[0];

    //   const firstGenreName =
    //     categories.find((genre: any) => genre.id === firstGenreId)?.name ||
    //     'Unknown Genre';

    //   return {...movie, genreName: firstGenreName};
    // });

    setMovies(response.results);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const genreResponse = await MovieService.getCategories();

    const genreImages = await Promise.all(
      genreResponse.genres.map(async (genre: any) => {
        const movieResponse = await MovieService.getCategoryImages(genre.id, 1);
        const posterPath = movieResponse.results[0]?.poster_path || null;
        return {
          id: genre.id,
          name: genre.name,
          image: posterPath,
        };
      }),
    );
    setCategories(genreImages);
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() =>
          navigation?.navigate('CategoryMovies', {category: item})
        }>
        <ImageBackground
          source={{uri: `${IMAGE_URL_FROM_ENV + item.image}`}}
          style={styles.image}>
          <View style={styles.shadowOverlay} />
          <Text style={styles.text}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const renderMovieItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.movieItem}
        onPress={() => navigation?.navigate('MovieDetail', {movieId: item.id})}>
        <Image
          source={{
            uri: `${IMAGE_URL_FROM_ENV + item.poster_path}`,
          }}
          style={styles.movieImage}
        />
        <View style={styles.titleCont}>
          <Text style={styles.title}>{item.original_title}</Text>
          <Text numberOfLines={1} style={styles.genre}>
            {item.overview}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      {searchQuery?.length > 0 && showMovies ? (
        <CustomHeader
          key={'header'}
          onPressLeft={() => {
            setSearchQuery('');
            setShowMovies(false);
          }}
          title={`${movies?.length} results found`}
          IconLeft={<Svgs.backArrow color={colors.black} />}
        />
      ) : (
        <SearchHeader
          key={'search'}
          onCross={() => {
            setSearchQuery('');
            setShowMovies(false);
          }}
          value={searchQuery}
          OnTextChange={e => setSearchQuery(e)}
          onSubmit={() => setShowMovies(true)}
        />
      )}
      <View style={[styles.container, {paddingHorizontal: WP(4)}]}>
        {searchQuery?.trim().length === 0 ? (
          <FlatList
            keyExtractor={(item, index) => `${item.id}_${index}`}
            data={categories}
            renderItem={renderItem}
            key={'categories'}
            numColumns={2}
            contentContainerStyle={styles.contentCont}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <FlatList
            key={'movies'}
            ListHeaderComponent={() => (
              <>
                {movies.length > 0 &&
                searchQuery?.length > 0 &&
                !Keyboard.isVisible() ? (
                  <>
                    <Text style={styles.result}>Top Results</Text>
                    <View style={styles.borderLine} />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            data={movies}
            maxToRenderPerBatch={50}
            updateCellsBatchingPeriod={50}
            renderItem={renderMovieItem}
            contentContainerStyle={styles.contentCont}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default SearchMovieScreen;
