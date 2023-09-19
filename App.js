import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, onPress, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import TabNavigation from './src/navigation/TabNavigation';



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
    <TabNavigation/>
    </>
  );
}




