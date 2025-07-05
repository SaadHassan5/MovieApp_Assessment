import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../assets/config/colors';
import WatchStack from './WatchStack';
import { HP, mvs } from '../assets/config/space';
import Svgs from '../assets/graphics/svgs';
import fontFamily from '../assets/config/fontFamily';
import { BottomTabParamList } from '../types/navigatorTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {

  return (
    <Tab.Navigator
    initialRouteName='WatchStack'
      screenOptions={{
        tabBarStyle: styles().tabBarStyle,
        tabBarActiveTintColor: colors.white,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={() => <></>}
        options={{
          tabBarIcon: ({focused}) => (
            <Svgs.dashboard color={focused ? colors.white : colors.gray} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchStack"
        component={WatchStack}
        options={{
          title: 'Watch',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Svgs.watch color={focused ? colors.white : colors.gray} />
          ),
        }}
      />
      <Tab.Screen
        name="Media Library"
        component={() => <></>}
        options={{
          tabBarIcon: ({focused}) => (
            <Svgs.media color={focused ? colors.white : colors.gray} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={() => <></>}
        options={{
          tabBarIcon: ({focused}) => (
            <Svgs.more color={focused ? colors.white : colors.gray} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = (props?: boolean) =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: colors.gunmetal,
      borderRadius: 27,
      paddingTop: HP(.5),
      height: Platform.OS == 'ios' ? HP(10) : HP(8),
    },
    tabIcon: {
      width: 16,
      height: 16,
      tintColor: props ? colors.white : colors.gray,
    },
    tabIconMore: {
      width: 24,
      height: 24,
      tintColor: props ? colors.white : colors.gray,
    },
    searchIcon: {width: 45, height: 45},
    // Removed as we're now applying headerTitleStyle directly in the options
  });
