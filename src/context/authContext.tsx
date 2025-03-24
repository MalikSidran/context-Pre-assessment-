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

interface AuthContextType {
  user: {name: string; email: string} | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<{name: string; email: string} | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email == '' || email == undefined || email == null || email == ' ') {
      Alert.alert('', 'Please Enter Email');
      return;
    } else if (!emailRegex.test(email)) {
      Alert.alert('', 'Please Enter Valid Email');
      return;
    } else if (!password || password.length < 6) {
      Alert.alert('', 'Password atleast 6 characters');
      return;
    }
    const storedUser = await AsyncStorage.getItem('user');
    console.log('storedUser:::', storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        setUser(parsedUser);
        Alert.alert('', 'Login Successful');
      } else {
        Alert.alert('', 'Invalid credentials');
      }
    } else {
      Alert.alert('', 'No user found please signup');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name) {
      Alert.alert('', 'Please Enter Name');
      return;
    }
    if (email == '' || email == undefined || email == null || email == ' ') {
      Alert.alert('', 'Please Enter Email');
      return;
    } else if (!emailRegex.test(email)) {
      Alert.alert('', 'Please Enter Valid Email');
      return;
    } else if (!password || password.length < 6) {
      Alert.alert('', 'Password atleast 6 characters');
      return;
    }
    const newUser = {name, email, password};
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    Alert.alert('', 'Signup Successful');
  };

  const logout = async () => {
    setUser(null);
    // await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{user, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
