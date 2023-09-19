import React from 'react';
import { FlatList, StyleSheet, Text, View, Image, SafeAreaView, Pressable } from 'react-native';
import Header from '../components/header/Header';
import { Categories } from '../data/Categories';

const Shop = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>Shop</Text>
        </Header>
        <Text style={styles.select}>Seleccione un equipo</Text>
        <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={Categories}
        key={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Pressable onPress={() => navigation.navigate("categoryItem", { category: item.category })}>
              <Image 
                style={styles.categoryImage}
                source={{ uri: item.img }}
              />
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

