import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { getDatabase, ref as dbRef, set, onValue, off } from 'firebase/database';
import { app } from '../firebase/firebase_auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Post = ({ navigation }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const postRef = dbRef(db, 'posts');

    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const urls = Object.entries(data).map(([key, value]) => ({
          key,
          imageUrl: value?.imageUrl,
          userName: value?.userName,
          description: value?.description,
        }));
        setImageUrls(urls.reverse());
        setLoadingImages(false);
      } else {
        setImageUrls([]);
        setLoadingImages(false);
      }
    });

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
      off(postRef);
    };
  }, []);

  const deleteImageFromDatabase = (imageKey, imageUserName) => {
    Alert.alert(
      'Confirmación',
      '¿Seguro que desea eliminar la publicación?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            if (currentUser && currentUser.displayName === imageUserName) {
              const db = getDatabase(app);
              const postRef = dbRef(db, 'posts/' + imageKey);

              set(postRef, null)
                .then(() => {
                  Alert.alert('Publicación eliminada con éxito');
                })
                .catch((error) => {
                  console.error('Error deleting image from database:', error);
                });
            } else {
              Alert.alert('No tienes permiso para eliminar esta imagen.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Publicaciones</Text>
        <TouchableOpacity onPress={() => navigation.navigate("createPost")}>
          <AntDesign style={styles.plus} name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {loadingImages ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView>
          {imageUrls.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Text style={styles.userName}>{image.userName}</Text>
              <Image source={{ uri: image.imageUrl }} style={styles.image} />
              <TouchableOpacity
                onPress={() => deleteImageFromDatabase(image.key, image.userName)}
                style={styles.deleteButton}
              >
                <EvilIcons name="trash" size={24} color="red" />
              </TouchableOpacity>
              <View style={styles.descriptionContainer}>
                <Text style={styles.userNameDescription}>{image.userName}</Text>
                <Text style={styles.description}>{image.description || null}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  plus: {
    marginLeft: 10,
  },
  imageContainer: {
    width: '100%',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  userName: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 4,
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
  description: {
    color: 'white',
  },
});

export default Post;
