import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 

const Button = ( { onPress }) => {
  return (
    <View style={styles.viewPressable}>
      <Pressable onPress={onPress}>
        <AntDesign name="plus" size={24} color="black" />
        </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  viewPressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },

})