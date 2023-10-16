import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { getDatabase, ref as dbRef, set, onValue, off, get, remove } from 'firebase/database';
import { app } from '../firebase/firebase_auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Theme from '../utils/Themes';

const Post = ({ navigation }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLikes, setUserLikes] = useState({});

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
          likes: value?.likes || {},
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

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase(app);
      const likesRef = dbRef(db, `likes/${currentUser.uid}`);

      onValue(likesRef, (snapshot) => {
        setUserLikes(snapshot.val() || {});
      });

      return () => {
        off(likesRef);
      };
    }
  }, [currentUser]);

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

  const handleLike = async (imageKey) => {
    if (!currentUser) {
      // El usuario no está autenticado, puedes mostrar un mensaje o redirigirlo a iniciar sesión
      return;
    }

    const db = getDatabase(app);
    const likesRef = dbRef(db, `likes/${currentUser.uid}/${imageKey}`);

    try {
      const snapshot = await get(likesRef);

      if (!snapshot.exists()) {
        // El usuario aún no ha dado "Me gusta", podemos registrar el "Me gusta"
        await set(likesRef, true);

        // Actualizar el contador de "Me gusta" en la publicación
        const postLikesRef = dbRef(db, `posts/${imageKey}/likes/${currentUser.uid}`);
        await set(postLikesRef, true);

        // Actualizar el estado local de likes para la imagen
        setImageUrls((prevImageUrls) =>
          prevImageUrls.map((imageItem) => {
            if (imageItem.key === imageKey) {
              return {
                ...imageItem,
                likes: { ...(imageItem.likes || {}), [currentUser.uid]: true },
              };
            }
            return imageItem;
          })
        );
      } else {
        // El usuario ya dio "Me gusta", podemos mostrar un mensaje o realizar otra acción
        await remove(likesRef);
        const postLikesRef = dbRef(db, `posts/${imageKey}/likes/${currentUser.uid}`);
        await remove(postLikesRef);

        // Actualizar el estado local de likes para la imagen
        setImageUrls((prevImageUrls) =>
          prevImageUrls.map((imageItem) => {
            if (imageItem.key === imageKey) {
              const newLikes = { ...(imageItem.likes || {}) };
              delete newLikes[currentUser.uid];
              return {
                ...imageItem,
                likes: newLikes,
              };
            }
            return imageItem;
          })
        );
      }
    } catch (error) {
      console.error('Error al manejar el "Me gusta":', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>DE PRIMERA</Text>
        <TouchableOpacity onPress={() => navigation.navigate('createPost')}>
          <AntDesign style={styles.plus} name="plus" size={26} color="white" />
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
              {currentUser && currentUser.displayName === image.userName && (
                <TouchableOpacity
                  onPress={() => deleteImageFromDatabase(image.key, image.userName)}
                  style={styles.deleteButton}
                >
                  <EvilIcons name="trash" size={24} color="red" />
                </TouchableOpacity>
              )}
              <View style={styles.likesContainer}>
                <TouchableOpacity onPress={() => handleLike(image?.key)} style={styles.likeButton}>
                  <AntDesign
                    name={image.likes?.[currentUser?.uid] ? 'heart' : 'hearto'}
                    size={22}
                    color={image.likes?.[currentUser?.uid] ? 'red' : 'white'}
                  />
                </TouchableOpacity>
                <Text style={styles.likesCount}>
                  {Object.keys(image.likes)?.length} Me gusta
                </Text>
              </View>
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
    paddingHorizontal: 15,
    paddingTop: 6,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  text: {
    fontFamily: Theme.fontFamily.QuicksandBold,
    letterSpacing: 2,
    fontSize: 20,
    color: 'white',
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
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    paddingVertical: 8,
  },
  likesCount: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
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
    gap: 6,
  },
  userNameDescription: {
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    width: '80%',
    color: 'white',
  },
});

export default Post;