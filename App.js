import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MainNav from './src/navigation/MainNav';

export default function App() {
  const [fontsLoaded] = useFonts({
    'QuicksandBold': require('./assets/Fonts/Quicksand-Bold.ttf'),
    'QuicksandSemiBold': require('./assets/Fonts/Quicksand-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNav/>
    </Provider>
  );
}






