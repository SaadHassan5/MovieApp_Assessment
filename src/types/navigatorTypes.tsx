import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps as BottomTabScreenPropsBase } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

// Root Stack Navigator Types
export type RootStackParamList = {
  MainTabs: undefined;
  MovieDetail: { 
    movieId: number;
    title?: string;
    posterPath?: string;
    releaseDate?: string;
  };
  Booking: { 
    title: string; 
    date: string;
    movieId: number;
  };
  SeatSelection: {
    date: string;
    title: string;
    hall: {
      time: string;
      hallNo: number;
      statingPrice: number;
      bonus: number;
      index?: number;
    };
    selectedDate: string;
    movieId: number;
  };
};

// Watch Stack Navigator Types
export type WatchStackParamList = {
  MovieList: undefined;
  SearchMovie: undefined;
  CategoryMovies: { 
    category: {
      id: number;
      name: string;
      image?: string;
    };
  };
};

// Bottom Tab Navigator Types
export type BottomTabParamList = {
  Dashboard: undefined;
  WatchStack: undefined;
  'Media Library': undefined;
  More: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

export type WatchStackScreenProps<T extends keyof WatchStackParamList> = 
  StackScreenProps<WatchStackParamList, T>;

export type BottomTabScreenProps<T extends keyof BottomTabParamList> = 
  BottomTabScreenPropsBase<BottomTabParamList, T>;

export type AppTabScreenProps<T extends keyof BottomTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Navigation Hook Types
export type RootStackNavigationProp<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>['navigation'];

export type WatchStackNavigationProp<T extends keyof WatchStackParamList> = 
  StackScreenProps<WatchStackParamList, T>['navigation'];

export type BottomTabNavigationProp<T extends keyof BottomTabParamList> = 
  BottomTabScreenProps<T>['navigation'];

// Route Prop Types
export type RootStackRouteProp<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>['route'];

export type WatchStackRouteProp<T extends keyof WatchStackParamList> = 
  StackScreenProps<WatchStackParamList, T>['route'];

export type BottomTabRouteProp<T extends keyof BottomTabParamList> = 
  BottomTabScreenProps<T>['route'];
