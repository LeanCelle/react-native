import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../button/Button';
import Theme from '../../utils/Themes';

const Item = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.productImage}
          source={{ uri: item.img }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button/>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.darkgrey,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  price: {
    color: 'white',
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
    borderRightColor: 'white',
  },
  buttonContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


