import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Back = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={24} color="white" />
    </Pressable>
  )
}

export default Back

const styles = StyleSheet.create({})

