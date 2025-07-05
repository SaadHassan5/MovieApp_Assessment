import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoadingImageBackground from '../../components/LoadingImageBackground/LoadingImageBackground';
import React, {useCallback, useEffect, useState} from 'react';
import {IMAGE_URL_FROM_ENV} from '@env';
import YoutubePlayer from 'react-native-youtube-iframe';
import MovieService from '../../services/movieService';
import {colors} from '../../assets/config/colors';
import {styles} from './styles';
import {HP} from '../../assets/config/space';
import Svgs from '../../assets/graphics/svgs';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {useNavigation} from '@react-navigation/native';

export default function MovieDetailScreen(props?: any) {
  const {movieId} = props.route.params;
  const [movieDetail, setMovieDetail] = useState<any>({});
  const [playing, setPlaying] = useState(false);
  const [videoDetail, setVideoDetail] = useState<any>({});
  const date = new Date(movieDetail?.release_date);
  const options: any = {year: 'numeric', month: 'long', day: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-US', options);
  const navigation = useNavigation();
  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    const response = await MovieService.getMovieDetails(movieId);
    setMovieDetail(response);
  };

  const playTrailer = async () => {
    const response = await MovieService.getMovieTrailer(movieId);
    setVideoDetail(response.results[response.results.length - 1]);
    setPlaying(true);
  };

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const getRandomColor = () => {
    const includedColors = [
      colors.robinEggBlue,
      colors.lemonCurry,
      colors.liberty,
      colors.chinaPink,
      colors.red,
    ];
    return includedColors[Math.floor(Math.random() * includedColors.length)];
  };

  return (
    <ScreenWrapper
      statusBarStyle="light-content"
      statusBarBackground={'transparent'}>
      <View style={styles().container}>
        {!playing ? (
          <ScrollView
            bounces={false}
            contentContainerStyle={styles().contentCont}>
            <LoadingImageBackground
              source={{
                uri: `${IMAGE_URL_FROM_ENV + movieDetail?.poster_path}`,
              }}
              resizeMode="cover"
              style={styles().coverImage}
              containerStyle={styles().coverImage}>
              <View style={styles().shadowOverlay} />
              <Text style={styles().inTheaters}>
                In Theaters {formattedDate}
              </Text>

              <TouchableOpacity
                activeOpacity={0.5}
                style={styles().ticketBtn}
                onPress={() =>
                  props?.navigation.navigate('Booking', {
                    title: movieDetail?.title,
                    date: formattedDate,
                  })
                }>
                <Text style={styles().btnTxt}>Get Tickets</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                style={styles().watchBtn}
                onPress={playTrailer}>
                <Svgs.play />
                <Text style={styles().btnTxt}>Watch Trailer</Text>
              </TouchableOpacity>
            </LoadingImageBackground>
            <View style={{position:'absolute',top:StatusBar.currentHeight}}>
            <CustomHeader
              key={'header'}
              onPressLeft={() => navigation.goBack()}
              title={'Watch'}
              style={{backgroundColor:'transparent'}}
              txtStyle={{color:colors.white}}
              IconLeft={<Svgs.backArrow color={colors.white} />}
            />
            </View>
            <View style={styles().bottomView}>
              <Text style={styles().genreTxt}>Genres</Text>
              <View style={styles().mapCont}>
                {movieDetail?.genres?.map((genre: any) => {
                  const randomColor = getRandomColor();
                  return (
                    <Text
                      key={genre.id}
                      style={styles(randomColor).mapGenreTxt}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
              <View style={styles().border} />

              <Text style={styles().genreTxt}>Overview</Text>
              <Text style={styles().overViewTxt}>{movieDetail?.overview}</Text>
            </View>
          </ScrollView>
        ) : (
          <View style={styles().youtubeCont}>
            <YoutubePlayer
              height={HP(78)}
              play={playing}
              videoId={videoDetail?.key}
              onChangeState={onStateChange}
              allowWebViewZoom={true}
              webViewProps={{
                injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  element.style.paddingBottom = 'unset';
                  true;
                `,
              }}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
