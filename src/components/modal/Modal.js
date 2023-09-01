import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ModalSquad = () => {
    
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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Proximamente: Alineaciones</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>CERRAR</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>
        </View>
        <View style={styles.pressableView}>
            <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <AntDesign name="plus" size={15} color="black" />
            </Pressable>
        </View>
        </>
    );
}

export default ModalSquad

const styles = StyleSheet.create({
    centeredView: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
        gap: 10,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.25,
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
        borderTopColor: 'black',
        backgroundColor: 'white',
    },
    buttonClose: {
      backgroundColor: 'red',
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