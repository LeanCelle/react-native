import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View } from 'react-native';
import { Products } from '../data/Products';
import Item from '../components/Item/Item';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import Back from '../components/backbutton/Back';
import Navbar from '../components/navbar/Navbar';

const CategoryItem = ({ navigation, route }) => {
  const [categoryProd, setCategoryProd] = useState([]);
  const [text, setText] = useState(null);

  const { category } = route.params;

  // Elimino tildes
  const normalize = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    let filteredProducts = Products.filter((el) => el.category === category);

    if (text) {
      const normalizedText = normalize(text).toLowerCase();
      filteredProducts = filteredProducts.filter((el) =>
        normalize(el.name).toLowerCase().includes(normalizedText)
      );
    }

    setCategoryProd(filteredProducts);
  }, [text, category]);

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Back navigation={navigation} />
        <Text style={styles.text}>{category}</Text>
      </Header>
      <Search text={text} setText={setText} />
      {categoryProd.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No se encontraron resultados.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={categoryProd}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryItem;

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
  flatListContainer: {},
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 15,
    color: 'white',
  },
});
