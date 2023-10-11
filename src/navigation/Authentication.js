import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from '../screens/CreateAccount';
import IniciarSesion from '../screens/IniciarSesion';
import Welcome from '../screens/Welcome';

const Authentication = () => {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="createAccount" component={CreateAccount} />
        <Stack.Screen name="iniciarSesion" component={IniciarSesion} />
      </Stack.Navigator>
  );
}

export default Authentication;
