import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/header/Header'


const Cart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>Carrito</Text>
      </Header>
        <Text style={styles.cartEmpty}>Carrito vacío</Text>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
      text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    cartEmpty: {
      flex: 1,
      fontWeight: '600',
      justifyContent: 'center',
      textAlign: 'center',
      top: 318,
      paddingVertical: 10,
      color: 'white',
      fontSize: 18,
    },
})