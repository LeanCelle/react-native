import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/slice/authSlice';

const Profile = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            'Seguro que desea cerrar sesión?',
            [
              {
                text: 'Si',
                onPress: () => {
                    try {
                        dispatch(clearUser());
                
                    } catch (error) {
                        console.error('Error al cerrar la sesión:', error);
                        Alert.alert('Error', 'No se pudo cerrar la sesión. Inténtalo de nuevo.');
                    }
                },
              },
              {
                text: 'No',
              },
            ],
            { cancelable: false }
          );
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Perfil</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 6,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});