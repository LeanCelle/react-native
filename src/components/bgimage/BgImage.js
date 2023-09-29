import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const BgImage = ( {children} ) => {
  return (
    <ImageBackground
    source={{uri: 'https://i.postimg.cc/1tvk7tH3/photo-1546608235-3310a2494cdf.jpg'}}
    style={styles.imageBackground}>
        {children}
    </ImageBackground>
  )
}

export default BgImage

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
    },
})