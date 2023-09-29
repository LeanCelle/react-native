import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Post from '../screens/Post';
import CreatePost from '../screens/CreatePost';

const PostNavigation = () => {

    const Stack = createNativeStackNavigator();

  return (
        <Stack.Navigator initialRouteName="post" screenOptions={{headerShown: false,}}>
            <Stack.Screen name="post" component={Post}/>
            <Stack.Screen name="createPost" component={CreatePost}/>
        </Stack.Navigator>
  )
}

export default PostNavigation