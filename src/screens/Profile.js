import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native'; // Importa Image desde react-native
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/slice/authSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Profile = () => {

    const [userDisplayName, setUserDisplayName] = useState('Usuario');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserDisplayName(user.displayName || 'Usuario');
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, []);

    const dispatch = useDispatch();

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Seguro que desea cerrar sesión?',
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
                <Text style={styles.text}>{userDisplayName}</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <MaterialIcons name="logout" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Image
                source={{ uri: 'https://i.postimg.cc/0QjmNPFC/photo-1552318965-6e6be7484ada.jpg' }}
                style={styles.backgroundImage}
            />
            <Image
                source={{ uri: 'https://i.postimg.cc/2y2SLZWb/avatar-3814081-1280.webp' }}
                style={styles.centeredImage}
            />
        </SafeAreaView>
    );
}

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
        zIndex: 1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    backgroundImage: {
        width: '100%',
        height: 800,
        resizeMode: 'cover',
        position: 'absolute',
        opacity: 0.2,
    },
    centeredImage: {
        backgroundColor: 'white',
        marginTop: 200,
        width: 200,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
        borderRadius: 20,
    },
});

export default Profile;

