import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import Header from '../components/header/Header';
import Theme from '../utils/Themes';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Back from '../components/backbutton/Back';

const ItemDetail = ({ route, navigation }) => {
  const { item } = route.params;

  const productDetail = () => (
    <View style={styles.productContainer}>
      <View style={styles.imgContainer}>
        <FlatList
          horizontal
          data={item.img}
          keyExtractor={(image) => image}
          renderItem={({ item: image }) => (
            <Image
              style={styles.productImg}
              source={{ uri: image }}
            />
          )}
        />
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
      </View>
      <View>
        <Text style={styles.size}>Talle: {item.size}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Descripción:</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Back navigation={navigation}/>
        <Text style={styles.text}>{item.category}</Text>
      </Header>
      <FlatList
        style={styles.flatList}
        data={[item]}
        renderItem={productDetail}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buyPressableContainer}>
        <Pressable style={styles.buyPressable}>
          <Text style={styles.buy}>AGREGAR AL CARRITO</Text>
          <MaterialCommunityIcons name="shopping-outline" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default ItemDetail;

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
  productContainer: {
    flex: 1,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImg: {
    backgroundColor: 'white',
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  name: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    gap: 40,
    marginBottom: 30,
  },
  price: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  brand: {
    letterSpacing: 3,
    color: Theme.colors.lightgrey,
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  size: {
    color: 'white',
    marginBottom: 50,
    paddingLeft: 10,
    fontWeight: '500',
  },
  descriptionContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
    gap: 8,
  },
  descriptionText: {
    color: 'white',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  description: {
    color: 'white',
  },
  buyPressableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyPressable: {
    width: '75%',
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buy: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
