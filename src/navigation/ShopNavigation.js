import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Shop from '../screens/Shop';
import CategoryItem from '../screens/CategoryItem';
import ItemDetail from '../screens/ItemDetail';

const Navigation = () => {

    const Stack = createNativeStackNavigator();

  return (
        <Stack.Navigator initialRouteName="shop" screenOptions={{headerShown: false,}}>
            <Stack.Screen name="shop" component={Shop}/>
            <Stack.Screen name="categoryItem" component={CategoryItem}/>
            <Stack.Screen name="itemDetail" component={ItemDetail}/>
        </Stack.Navigator>
  )
}

export default Navigation