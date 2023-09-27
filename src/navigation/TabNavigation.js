import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigation from './ShopNavigation';
import Live from '../screens/Live';
import Cart from '../screens/Cart';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Theme from '../utils/Themes';
import Home from '../screens/Home';
import Post from '../screens/Post';

const TabNavigation = () => {
    
    const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer styles={styles.tabBar}>
        <Tab.Navigator initialRouteName="shopNavigation" screenOptions={{ title: "", headerShown: false, tabBarStyle: styles.tabBar }}>
            <Tab.Screen options={{tabBarIcon: ({ focused }) => ( 
            <Ionicons name="ios-football-outline" size={30} color={focused ? Theme.colors.darkgreen : "white"} /> )}} 
            name="home" 
            component={Home}/>

            <Tab.Screen options={{tabBarIcon: ({ focused }) => ( <MaterialIcons name="live-tv" size={30} color={focused ? Theme.colors.darkgreen : "white"} /> )}} 
            name="live" 
            component={Live}/>

            <Tab.Screen options={{tabBarIcon: ({ focused }) => ( <MaterialCommunityIcons name="shopping-outline" size={30} color={focused ? Theme.colors.darkgreen : "white"} /> )}} 
            name="shopNavigation" 
            component={Navigation}/>

            <Tab.Screen options={{tabBarIcon: ({ focused }) => ( <AntDesign name="shoppingcart" size={30} color={focused ? Theme.colors.darkgreen : "white"} /> )}} 
            name="post" 
            component={Post}/>

            <Tab.Screen options={{tabBarIcon: ({ focused }) => ( <FontAwesome5 name="user-circle" size={30} color={focused ? Theme.colors.darkgreen : "white"} /> )}} 
            name="login" 
            component={Login}/>

        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'black',
        borderTopColor: '#1A1A1A',
    },
})