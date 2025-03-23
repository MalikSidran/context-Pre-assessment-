import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/authContext';
import {AppNavigator} from './src/navigation/stack';
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
