import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/firebase_auth';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import Back from '../components/backbutton/Back';
import Header from '../components/header/Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
        quality: 0,
      });

      if (result.canceled) {
        console.log('Selección de imagen cancelada');
      } else if (result.assets && result.assets.length > 0 && setDescription() !== '') {
        setSelectedImage(result.assets[0].uri);
        setPostReady(true);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);

    const storage = getStorage(app);
    const storageRef = ref(storage, 'images/' + new Date().getTime());

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      saveImageUrlToDatabase(downloadURL);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      setUploading(false);
    }
  };

  const saveImageUrlToDatabase = (imageUrl) => {
    const db = getDatabase(app);
    const postRef = dbRef(db, 'posts');

    const newPostRef = push(postRef);

    const postData = {
      imageUrl: imageUrl,
      userName: userDisplayName,
      description: description,
    };

    set(newPostRef, postData, (error) => {
      if (error) {
        console.error('Error al subir la publicación:', error);
      } else {
        console.log('Publicación subida con éxito.');
        setSelectedImage(null);
        setPostReady(false);
        setDescription('');
      }
    });
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
  
    uploadImage(selectedImage);
    navigation.navigate('post');
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
              <TouchableOpacity onPress={selectImageFromGallery} style={styles.changeImageButton}>
                <Text style={styles.changeImageText}>Cambiar imagen</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.plusContainer}>
              <TouchableOpacity onPress={selectImageFromGallery}>
                <AntDesign style={styles.plus} name="plus" size={24} color="black" />
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
  postContainer: {
    marginVertical: 20,
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
    marginLeft: 10,
    marginTop: 15,
    gap: 6,
  },
  userNameDescription: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionInput: {
    color: 'white',
  },
  shareTouchable: {
    backgroundColor: 'white',
    marginHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
  },
  shareText: {
    fontWeight: 'bold',
  },
});

export default CreatePost;







