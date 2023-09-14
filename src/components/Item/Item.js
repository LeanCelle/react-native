import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../button/Button';
import Theme from '../../utils/Themes';

const Item = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.productImage}
          source={{ uri: item.img[0] }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate("itemDetail", { item: item })} />
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 0,
    gap: 10,
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  price: {
    color: 'black',
    fontStyle: 'italic',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    gap: 10,
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  buttonContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


