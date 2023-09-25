import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HeadToHead from '../HeadToHead/HeadToHead';

const ModalSquad = ({ navigation, match, matches }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.centeredView}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
              <View style={styles.modalView}>
                <HeadToHead navigation={navigation} match={match}  matches={matches}/>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <AntDesign name="close" size={30} color="black" />
                </Pressable>
              </View>
            </Modal>
            </View>
            <View style={styles.pressableView}>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                        setModalVisible(true);
                    }}>
                    <AntDesign name="plus" size={15} color="black" />
                </Pressable>
            </View>
        </>
    );
}

export default ModalSquad;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingVertical: 50,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
  },
  
    button: {
        padding: 10,
        elevation: 2,
    },
    pressableView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOpen: {
        height: 60,
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: 'white',
        backgroundColor: 'white',
    },
    buttonClose: {
        borderRadius: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});