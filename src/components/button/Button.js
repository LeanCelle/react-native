import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 

const Button = () => {
  return (
    <View style={styles.viewPressable}>
      <Pressable>
        <AntDesign name="plus" size={24} color="white" />
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