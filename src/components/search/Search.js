import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import Theme from '../../utils/Themes';

const Search = ({ text, setText }) => {

    const clearText = () => {
        setText(null);
      };

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        onChangeText={(value) => setText(value)}
        value={text}
        style={styles.input}
        placeholder="Busca un producto aquí.."
        placeholderTextColor={'black'}
      />
      <Pressable onPress={() => clearText()}>
        <AntDesign name="close" size={20} color="black" />
      </Pressable>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.darkgrey,
        paddingVertical: 12,
        gap: 10,
    },

})