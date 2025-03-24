import React, {createContext, useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../context/authContext';

const HomeScreen = () => {
  const {user, logout} = useAuth();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
      <Text style={{color:'black',marginTop:16}}>Welcome, {user?.name}</Text>
      <Text style={{color:'black',marginVertical:8,}}>Email: {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
export default HomeScreen
