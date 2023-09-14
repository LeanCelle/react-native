import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Themes';
import { AntDesign } from '@expo/vector-icons'; 

const Search = ({ text, setText }) => {

    const clearText = () => {
        setText(null);
      };

  return (
    <View style={styles.inputContainer}>
        <View style={styles.textSearch}>
            <AntDesign name="search1" size={15} color="black" />
            <TextInput 
            onChangeText={(value) => setText(value)}
            value={text}
            style={styles.input}
            placeholder="Busca un producto aquí.."
            placeholderTextColor={'black'}
            />
        </View>
        <View style={styles.deleteAll}>
            <Pressable onPress={() => clearText()}>
                <AntDesign name="close" size={15} color="black" />
            </Pressable>
        </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.darkgrey,
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 10,
    },
    textSearch: {
        flexDirection: 'row',
        gap: 5,
        flex: 1,
    },

})