import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch } from "react-redux";
import { setIdToken, setUser } from '../redux/slice/authSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from '../firebase/firebase_auth';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; 
import Theme from '../utils/Themes';

const IniciarSesion = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Nuevo estado para el mensaje de error

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        firebase_auth,
        email,
        password,
      );

      dispatch(setUser(response.user.email));
      dispatch(setIdToken(response._tokenResponse.idToken));
      setError(""); // Limpiar el mensaje de error si el inicio de sesión es exitoso
      console.log(response);
    } catch (e) {
      setError("Correo electrónico o contraseña incorrectos"); // Establecer el mensaje de error en caso de error
      console.log("Error en Login", e);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.backgroundGradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <FontAwesome style={styles.userIcon} name="user" size={100} color="white" />
          <Text style={styles.title}>DE PRIMERA</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su email"
            placeholderTextColor={'white'}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={'white'}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <Text style={styles.createAccountText}>
            ¿No tiene cuenta?
            <Text style={styles.link} onPress={() => navigation.navigate("createAccount",)}>
             Crear cuenta
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  userIcon: {
    textAlign: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: Theme.fontFamily.QuicksandBold,
    letterSpacing: 2,
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  createAccountText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default IniciarSesion;