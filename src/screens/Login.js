import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, Pressable } from 'react-native';
import Header from '../components/header/Header';
import Theme from '../utils/Themes';
import { FontAwesome5 } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>Perfil</Text>
      </Header>
        <ScrollView contentContainerStyle={styles.content}>
          <FontAwesome5 style={styles.logo} name="user-alt" size={120} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="white"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.7}>
            <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
          <View style={styles.socialLogin}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Image
                source={{ uri: 'https://i.postimg.cc/Fs2z09B5/icons8-logo-de-google-48.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Iniciar sesión con Google</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>O</Text>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Image
                source={{ uri: 'https://i.postimg.cc/PxrY0XHV/icons8-facebook-nuevo-48.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Iniciar sesión con Facebook</Text>
            </TouchableOpacity>
          </View>
          <Pressable>
            <Text style={styles.forgotPassword}>¿Olvidaste tu Contraseña?</Text>
          </Pressable>
          <View style={styles.registerTouchable}>
            <Text style={styles.register}>¿No tienes una cuenta?</Text>
            <Pressable>
              <Text style={styles.registerHere}>Regístrate aquí</Text>
            </Pressable>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 40,
  },
  input: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Theme.colors.darkgreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  socialLogin: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 30,
    borderRadius: 5,
    gap: 10,
  },
  socialIcon: {
    width: 22,
    height: 22,
  },
  socialButtonText: {
    color: 'black',
    fontSize: 15,
  },
  forgotPassword: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginBottom: 6,
  },
  registerTouchable: {
    flexDirection: 'row',
    gap: 3,
  },
  register: {
    color: 'white',
    fontSize: 14,
  },
  registerHere: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Login;