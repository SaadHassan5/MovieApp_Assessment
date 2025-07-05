import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLoading } from "../../context/LoadingContext";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_URL_FROM_ENV } from "@env";
import MovieService from "../../services/movieService";
import { styles } from "./styles";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Svgs from "../../assets/graphics/svgs";
import { WP } from "../../assets/config/space";
import { colors } from "../../assets/config/colors";
import {
  WatchStackNavigationProp,
  RootStackNavigationProp,
} from "../../types/navigatorTypes";
import { Movie, Category } from "../../types/movieTypes";

const SearchMovieScreen = () => {
  const watchStackNavigation =
    useNavigation<WatchStackNavigationProp<"SearchMovie">>();
  const rootNavigation =
    useNavigation<RootStackNavigationProp<"MovieDetail">>();
  const [categories, setCategories] = useState<
    Array<Category & { image: string }>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showMovies, setShowMovies] = useState<boolean>(false);
  const { showLoading, hideLoading } = useLoading();
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(true);

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setShowMovies(false);
      return;
    }
    showLoading();
    try {
      const response = await MovieService.searchMovies(query);
      setMovies(response.results);
      setShowMovies(true);
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
    };
  }, []);

  useEffect(() => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    if (!searchQuery.trim()) {
      setMovies([]);
      setShowMovies(false);
      return;
    }

    debounce.current = setTimeout(async () => {
      if (isMounted.current) {
        await searchMovies(searchQuery);
      }
    }, 500);

    return () => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
    };
  }, [searchQuery]);

  const getCategories = async () => {
    try {
      showLoading();
      const genreResponse = await MovieService.getCategories();
      const genreImages = await Promise.all(
        genreResponse.genres.map(async (genre: any) => {
          const movieResponse = await MovieService.getCategoryImages(
            genre.id,
            1
          );
          const posterPath = movieResponse.results[0]?.poster_path || null;
          return {
            id: genre.id,
            name: genre.name,
            image: posterPath,
          };
        })
      );
      setCategories(genreImages);
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const renderItem = ({ item }: { item: Category & { image: string } }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() =>
          watchStackNavigation.navigate("CategoryMovies", { category: item })
        }
      >
        <ImageBackground
          source={{ uri: `${IMAGE_URL_FROM_ENV + item.image}` }}
          style={styles.image}
        >
          <View style={styles.shadowOverlay} />
          <Text style={styles.text}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const navigation = useNavigation<RootStackNavigationProp<"MovieDetail">>();

  const renderMovieItem = ({ item }: { item: Movie }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.movieItem}
        onPress={() =>
          rootNavigation.navigate("MovieDetail", { movieId: item.id })
        }
      >
        <Image
          source={{
            uri: `${IMAGE_URL_FROM_ENV + item.poster_path}`,
          }}
          style={styles.movieImage}
        />
        <View style={styles.titleCont}>
          <Text style={styles.title}>{item.title}</Text>
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
          key={"header"}
          onPressLeft={() => {
            setSearchQuery("");
            setShowMovies(false);
          }}
          title={`${movies?.length} results found`}
          IconLeft={<Svgs.backArrow color={colors.black} />}
        />
      ) : (
        <SearchHeader
          key={"search"}
          onCross={() => {
            setSearchQuery("");
            setShowMovies(false);
          }}
          value={searchQuery}
          OnTextChange={(e) => setSearchQuery(e)}
          onSubmit={() => setShowMovies(true)}
        />
      )}
      <View style={[styles.container, { paddingHorizontal: WP(4) }]}>
        {searchQuery?.trim().length === 0 ? (
          <FlatList
            keyExtractor={(item, index) => `${item.id}_${index}`}
            data={categories}
            renderItem={renderItem}
            key={"categories"}
            numColumns={2}
            contentContainerStyle={styles.contentCont}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <FlatList
            key={"movies"}
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
