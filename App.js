import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, onPress, SafeAreaView } from 'react-native';
import Home from './src/screens/Home';
import Shop from './src/screens/Shop';
import Live from './src/screens/Live';
import CategoryItem from './src/screens/CategoryItem';
import { useFonts } from 'expo-font';
import Navigation from './src/navigation/Navigation';



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
    <Navigation/>
    </>
  );
}




