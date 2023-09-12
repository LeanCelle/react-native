import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/header/Header'
import BgImage from '../../components/bgimage/BgImage'
import Theme from '../../utils/Themes'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>DE PRIMERA</Text>
      </Header>
      <BgImage>
        <Text style={styles.proximamente}>Proximamente: partidos del día</Text>
      </BgImage>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
      },
      text: {
        fontFamily: Theme.fontFamily.QuicksandBold,
        letterSpacing: 4,
        fontSize: 20,
        color: 'white',
    },
    proximamente: {
        backgroundColor: 'black',
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 10,
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: [{ translateY: -10 }],
    },
})