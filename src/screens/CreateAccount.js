import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setIdToken, setUser } from '../redux/slice/authSlice';
import { firebase_auth } from "../firebase/firebase_auth";
import { get, getDatabase, ref, set } from 'firebase/database';

const CreateAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    correo: '',
    contraseña: '',
    repetirContraseña: '',
  });
  const [touchedFields, setTouchedFields] = useState({
    nombre: false,
    apellido: false,
    nombreUsuario: false,
    correo: false,
    contraseña: false,
    repetirContraseña: false,
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Función para agregar los datos del usuario a la base de datos
  const addUserDataToDatabase = async (userId, nombreUsuario, correo) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    const userData = {
      nombreUsuario: nombreUsuario,
      correo: correo,
    };

    try {
      await set(userRef, userData);
      console.log("Datos del usuario agregados a la base de datos con éxito");
    } catch (error) {
      console.error("Error al agregar datos del usuario a la base de datos:", error);
    }
  };

  const handleRegister = async () => {
    setTouchedFields({
      nombre: true,
      apellido: true,
      nombreUsuario: true,
      correo: true,
      contraseña: true,
      repetirContraseña: true,
    });
  
    // Verificar si el nombre de usuario ya existe en la base de datos
    const usernameExists = await checkUsernameExists(formData.nombreUsuario);
  
    if (usernameExists) {
      Alert.alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
      return; // Evitar continuar con el registro
    }
  
    // Validar que los campos de nombre y apellido estén completos
    if (formData.nombre.trim() === '' || formData.apellido.trim() === '') {
      Alert.alert("Por favor, ingresa un nombre y un apellido válidos.");
      return; // Evitar continuar con el registro
    }
  
    try {
      const response = await createUserWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
  
      await updateProfile(response.user, {
        displayName: formData.nombreUsuario,
      });
  
      // Agrega los datos del usuario a la base de datos
      await addUserDataToDatabase(response.user.uid, formData.nombreUsuario, email);
  
      dispatch(setUser(response.user.email));
      dispatch(setIdToken(response._tokenResponse.idToken));
      console.log(response);
    } catch (e) {
      // Maneja la excepción cuando se ingresa un correo electrónico no válido
      if (e.code === 'auth/invalid-email') {
        Alert.alert("Email inválido. Por favor, ingresa un correo electrónico válido.");
      } else {
        Alert.alert("Error al crear la cuenta", e.message);
      }
    }
  };
  
  const checkUsernameExists = async (username) => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
  
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const usernames = Object.keys(usersData).map((userId) => usersData[userId].nombreUsuario);
      return usernames.includes(username);
    }
  
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Ingresa tus datos</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder='Damian'
            onChangeText={(text) => handleInputChange('nombre', text)}
          />
          {touchedFields.nombre && formData.nombre.trim() === '' ? (
            <Text style={styles.errorText}>Por favor, ingresa un nombre</Text>
          ) : null}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder='Pérez'
            onChangeText={(text) => handleInputChange('apellido', text)}
          />
          {touchedFields.apellido && formData.apellido.trim() === '' ? (
            <Text style={styles.errorText}>Por favor, ingresa un apellido</Text>
          ) : null}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder='DamianPérez'
            onChangeText={(text) => handleInputChange('nombreUsuario', text)}
          />
          {touchedFields.nombreUsuario && formData.nombreUsuario.trim() === '' ? (
            <Text style={styles.errorText}>Por favor, ingresa un nombre de usuario</Text>
          ) : null}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            value={email}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder='damianperez@gmail.com'
            onChangeText={(text) => setEmail(text)}
          />
          {touchedFields.nombreUsuario && formData.nombreUsuario.trim() === '' ? (
            <Text style={styles.errorText}>Por favor, ingresa un correo electrónico</Text>
          ) : null}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder='*******'
            secureTextEntry
            onChangeText={(text) => handleInputChange('contraseña', text)}
          />
          {touchedFields.contraseña && formData.contraseña.trim() === '' ? (
            <Text style={styles.errorText}>Por favor, ingresa una contraseña con más de 7 caracteres, incluyendo letras y números</Text>
          ) : null}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Repetir contraseña</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder='*******'
            secureTextEntry
          />
          {formData.contraseña !== password ? (
            <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
          ) : null}
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginLeft: 4,
  },
});

export default CreateAccount;









