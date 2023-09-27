import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/header/Header'
import { AntDesign } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker'; // Importa react-native-image-picker

const Post = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Función para abrir la galería y seleccionar una imagen
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Selección de imagen cancelada');
      } else if (response.error) {
        console.log('Error al seleccionar la imagen: ', response.error);
      } else {
        // `response.uri` contiene la URL de la imagen seleccionada
        setSelectedImage(response.uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>Publicaciones</Text>
        {/* Agrega un botón o ícono para abrir la galería */}
        <TouchableOpacity onPress={openImagePicker}>
          <AntDesign style={styles.plus} name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Header>

      {/* Muestra la imagen seleccionada */}
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </View>
      )}
    </SafeAreaView>
  )
}

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
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
  },
});

export default Post;
