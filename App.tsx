import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import { LoadingProvider, useLoading } from './src/context/LoadingContext';
import Loading from './src/components/Loading/Loading';

const AppContent = () => {
  const { isLoading } = useLoading();
  
  return (
    <>
      <StatusBar barStyle="light-content" />
      <StackNavigator />
      <Loading visible={isLoading} />
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <LoadingProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </LoadingProvider>
    </SafeAreaProvider>
  );
};

export default App;
