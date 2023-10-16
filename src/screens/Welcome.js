import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import Theme from '../utils/Themes';

const Welcome = ({ navigation }) => {

  return (
    <View style={styles.generalContainer}>
      <ImageBackground
        source={{uri: 'https://i.postimg.cc/d1WFj7GL/DE-4.png'}}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("iniciarSesion",)}>
              <Text style={styles.text}>Compartí tu pasión <Text style={styles.dePrimera}>De Primera!</Text></Text>
              <Feather name="arrow-right-circle" size={25} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1, 
  },
  backgroundGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  touchable: {
    width: '95%',
    backgroundColor: 'rgba(100,100,90,0.8)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
  dePrimera: {
    color: Theme.colors.darkgrey,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

export default Welcome;