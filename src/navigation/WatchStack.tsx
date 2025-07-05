import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieListScreen from '../screens/MovieListScreen/MovieListScreen';
import SearchMovieScreen from '../screens/SearchMovieScreen/SearchMovieScreen';
import CategoryMoviesScreen from '../screens/CategoryMoviesScreen/CategoryMoviesScreen';

const Stack = createStackNavigator();

const WatchStack = () => {
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
