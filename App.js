import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, onPress, SafeAreaView } from 'react-native';
import Home from './src/screens/Home/Home';
import Shop from './src/screens/Home/Shop';
import Live from './src/screens/Home/Live';
import CategoryItem from './src/components/categoryItem/CategoryItem';
import { useFonts } from 'expo-font';



export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'QuicksandBold': require('./assets/Fonts/Quicksand-Bold.ttf'),
    'QuicksandSemiBold': require('./assets/Fonts/Quicksand-SemiBold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <CategoryItem/>
    </>
  );
}




