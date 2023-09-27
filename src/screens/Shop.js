import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import Header from '../components/header/Header';
import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../services/RealAPI';

const Shop = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);

  const { data: Categories } = useGetCategoriesQuery();

  useEffect(() => {
    const loadImages = async () => {
      if (Categories) { // Check if Categories is defined
        const loadedImages = await Promise.all(
          Categories.map(async (item) => {
            const response = await fetch(item.img);
            const data = await response.blob();
            return URL.createObjectURL(data);
          })
        );

        setLoadedImages(loadedImages);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [Categories]); // Add Categories as a dependency

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>Shop</Text>
      </Header>
      <Text style={styles.select}>Seleccione un equipo</Text>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={Categories || []} // Provide an empty array as a fallback if Categories is undefined
        key={(item) => item.name} // Use keyExtractor instead of key
        renderItem={({ item, index }) => (
          <View style={styles.categoryContainer}>
            <Pressable onPress={() => navigation.navigate("categoryItem", { category: item.category })}>
              {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Image
                  style={styles.categoryImage}
                  source={{ uri: loadedImages[index] }}
                />
              )}
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Shop;

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
  select: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    paddingTop: 30,
  },
  flatListContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  categoryImage: {
    resizeMode: 'contain',
    height: 80,
    width: 80,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});
