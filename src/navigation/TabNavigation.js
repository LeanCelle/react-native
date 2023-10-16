import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';
import Navigation from './ShopNavigation';
import Live from '../screens/Live';
import Theme from '../utils/Themes';
import Home from '../screens/Home';
import PostNavigation from './PostNavigation';
import Profile from '../screens/Profile';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator initialRouteName="postNavigation" screenOptions={{ title: "", headerShown: false, tabBarStyle: styles.tabBar }}>

        <Tab.Screen
          name="postNavigation"
          component={PostNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="home" size={30} color={focused ? Theme.colors.darkgreen : "white"} />
            ),
          }}
        />

        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="ios-football-outline" size={30} color={focused ? Theme.colors.darkgreen : "white"} />
            ),
          }}
        />

        <Tab.Screen
          name="live"
          component={Live}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="live-tv" size={30} color={focused ? Theme.colors.darkgreen : "white"} />
            ),
          }}
        />

        <Tab.Screen
          name="shopNavigation"
          component={Navigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="shopping-outline" size={30} color={focused ? Theme.colors.darkgreen : "white"} />
            ),
          }}
        />

        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5 name="user-circle" size={28} color={focused ? Theme.colors.darkgreen : "white"} />
            ),
          }}
        />

      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
    borderTopColor: '#1A1A1A',
  },
});

export default TabNavigation;
