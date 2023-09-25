import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import Button from '../button/Button';
import Theme from '../../utils/Themes';
import { useDispatch } from 'react-redux';
import { setCategory, setProductSelected } from '../../redux/slice/shopSlice';

const Item = ({ item, navigation }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const dispatch = useDispatch();

  const handleItem = () => {
    dispatch(setCategory(item))
    dispatch(setProductSelected(item))
    navigation.navigate("itemDetail", { item: item })
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!imageLoaded ? ( <ActivityIndicator size="small" color='grey' /> ) : null}
        <Image 
          style={styles.productImage}
          source={{ uri: item.img[0] }}
          onLoad={handleImageLoad}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleItem} />
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Theme.colors.lightgrey,
    flexDirection: 'row',
    alignItems: 'center',
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