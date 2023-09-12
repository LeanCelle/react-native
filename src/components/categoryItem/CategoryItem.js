import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View } from 'react-native';
import { Products } from '../../data/Products';
import Item from '../Item/Item';
import Header from '../header/Header';
import BgImage from '../bgimage/BgImage';
import Search from '../search/Search';


const CategoryItem = ({ category }) => {
  
  const [categoryProd, setCategoryProd] = useState([]);
  const [text, setText] = useState(null);

  // Elimino tildes
  const normalize = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    let filteredProducts = Products.filter((el) => el.category === "independiente");

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
        <Text style={styles.text}>Independiente</Text>
      </Header>
      <BgImage>
        <Search text={text} setText={setText} />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={categoryProd}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <Item item={item} />}
        />
      </BgImage>
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
  flatListContainer: {
    padding: 16,
  },
});





