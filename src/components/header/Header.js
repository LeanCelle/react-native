import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ children }) => {
  return (
    <View style={styles.header}>
      { children }
    </View>
  );
}

const styles = {
  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'start',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    paddingLeft: 15,
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 15,
    gap: 10,
  },
};

export default Header;
