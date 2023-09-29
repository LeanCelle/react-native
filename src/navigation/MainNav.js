import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import Authentication from './Authentication';
import { useSelector } from 'react-redux';

const MainNav = () => {
    const user = useSelector((state) => state.authSlice.user);

  return (
  <NavigationContainer>{user ? <TabNavigation /> : <Authentication />}</NavigationContainer>
  );
}

export default MainNav;
