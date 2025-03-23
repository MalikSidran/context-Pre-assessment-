import React, {createContext, useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAuth} from '../context/authContext';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/signup';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const {user} = useAuth();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
