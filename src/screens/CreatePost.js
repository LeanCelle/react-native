import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import Back from '../components/backbutton/Back';
import Header from '../components/header/Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebase_auth';

const CreatePost = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [postReady, setPostReady] = useState(false);
  const [description, setDescription] = useState('');
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

  const selectImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        const base64Image = `data:${selectedAsset.type};base64,${selectedAsset.base64}`;

      if (selectedAsset.base64.length > 10485760) {
          Alert.alert('La imagen seleccionada supera el tamaño máximo permitido (10 MB).');
        } else {
          setSelectedImage(base64Image);
          setPostReady(true);
        }
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("No le has dado permiso a la Aplicación para acceder a tu cámara!");
      return;
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        setPostReady(true);
      }
    }
  };
  

  const saveImageToDatabase = async (base64Image) => {
    setUploading(true);

    const db = getDatabase(app);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const postsRef = dbRef(db, 'posts/');

      try {
        const newPostRef = push(postsRef);
        const postData = {
          userName: userDisplayName,
          imageUrl: base64Image,
          description: description,
          likes: {},
        };

        await set(newPostRef, postData);
        console.log('Publicación subida con éxito.');
        setSelectedImage(null);
        setPostReady(false);
        setDescription('');
      } catch (error) {
        console.error('Error al subir la publicación:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUploadPost = () => {
    if (!selectedImage) {
      console.log('Debes seleccionar una imagen antes de subir la publicación.');
      return;
    }

    if (!description) {
      Alert.alert('Debes ingresar una descripción antes de subir la publicación.');
      return;
    }

    saveImageToDatabase(selectedImage);
    navigation.navigate('post');
  };

  const showImagePickerAlert = () => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige la opción donde quiera seleccionar su imagen:',
      [
        {
          text: 'Abrir galería',
          onPress: () => {
            selectImageFromGallery();
          },
        },
        {
          text: 'Abrir cámara',
          onPress: () => {
            openCamera();
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Back navigation={navigation} />
        <Text style={styles.text}>Crear Publicación</Text>
      </Header>
      <ScrollView>
        <View style={styles.postContainer}>
          <Text style={styles.userName}>{userDisplayName}</Text>
          {selectedImage ? (
            <>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity onPress={showImagePickerAlert} style={styles.changeImageButton}>
                <Text style={styles.changeImageText}>Cambiar imagen</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.plusContainer}>
              <TouchableOpacity onPress={showImagePickerAlert}>
                <AntDesign style={styles.plus} name="plus" size={30} color="black" />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.descriptionContainer}>
            <Text style={styles.userNameDescription}>{userDisplayName}</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Escribe tu descripción aquí..."
              placeholderTextColor={'white'}
              value={description}
              onChangeText={(text) => setDescription(text)}
              />
          </View>
          <Text style={styles.preview}>(Previsualización de tu post)</Text>
          <TouchableOpacity
            onPress={handleUploadPost}
            style={styles.shareTouchable}
            disabled={!postReady}
          >
            <Text style={[styles.shareText, { color: postReady ? 'green' : 'gray' }]}>Compartir</Text>
          </TouchableOpacity>
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
  preview: {
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 10,
    marginVertical: 30,
    fontSize: 15,
  },
  postContainer: {
    marginVertical: 40,
  },
  userName: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 4,
  },
  plusContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  changeImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  changeImageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 15,
    gap: 6,
  },
  userNameDescription: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionInput: {
    color: 'white',
    width: '80%',
  },
  preview: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginVertical: 30,
    fontSize: 15,
  },
  shareTouchable: {
    backgroundColor: 'white',
    marginHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  shareText: {
    fontWeight: 'bold',
  },
});

export default CreatePost;