import React, {createContext, useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useAuth} from '../context/authContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const LoginScreen = ({navigation}: any) => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex:0.8,justifyContent:'center',alignItems:"center",paddingHorizontal:20}}>
        <Image
          source={require('../assets/images/Home.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Login</Text>

        <>
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/images/email.png')}
              style={styles.emailIcon}
            />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/images/lock.png')}
              style={styles.emailIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              // onChangeText={handleChange('password')}
              // onBlur={handleBlur('password')}
              // value={values.password}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              Alert.alert('No Forget Screen');
            }}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => login(email, password)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signUp}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emailIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth:1,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUp: {
    color: '#000',
  },
  signUpLink: {
    color: '#1E90FF',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default LoginScreen;
