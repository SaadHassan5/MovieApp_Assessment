import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieListScreen from '../screens/MovieListScreen/MovieListScreen';
import SearchMovieScreen from '../screens/SearchMovieScreen/SearchMovieScreen';
import CategoryMoviesScreen from '../screens/CategoryMoviesScreen/CategoryMoviesScreen';
import { WatchStackParamList } from '../types/navigatorTypes';

const Stack = createStackNavigator<WatchStackParamList>();

const WatchStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen 
        name="MovieList" 
        component={MovieListScreen} 
      />
      <Stack.Screen 
        name="SearchMovie" 
        component={SearchMovieScreen} 
      />
      <Stack.Screen 
        name="CategoryMovies" 
        component={CategoryMoviesScreen} 
      />
    </Stack.Navigator>
  );
};

export default WatchStack;
