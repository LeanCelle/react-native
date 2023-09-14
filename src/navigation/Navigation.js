import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Live from '../screens/Live';
import Shop from '../screens/Shop';
import CategoryItem from '../screens/CategoryItem';
import Home from '../screens/Home';
import ItemDetail from '../screens/ItemDetail';

const Navigation = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='shop' screenOptions={{headerShown: false,}}>
            <Stack.Screen name="home" component={Home}/>
            <Stack.Screen name="live" component={Live}/>
            <Stack.Screen name="shop" component={Shop}/>
            <Stack.Screen name="categoryItem" component={CategoryItem}/>
            <Stack.Screen name="itemDetail" component={ItemDetail}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation