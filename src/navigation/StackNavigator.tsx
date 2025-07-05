import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import MovieDetailScreen from '../screens/MovieDetailScreen/MovieDetailScreen';
import BookingScreen from '../screens/BookingScreen/BookingScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen/SeatSelectionScreen';
import { RootStackParamList } from '../types/navigatorTypes';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SeatSelection"
        component={SeatSelectionScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* Add more screens here as needed */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
