import { StyleSheet, Text, View, FlatList, SafeAreaView, Touchable } from "react-native";
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity } from "react-native-web";

const ChooseWordlist = () => {
  return (
    <View style={styles.container}>
            <Text style={[styles.head,{}]}>
                Wordlist
            </Text>
            <View style={[{flexDirection: 'row'}]}>
                <Text style={[styles.id,{}]}>
                    1
                </Text>
                <TouchableOpacity style={[styles.text,{fontWeight: '300'}]}>
                    New Wordlist
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.plus,{}]}>
                +
                </TouchableOpacity>
                <Text style={[styles.text,{}]}>
                    Create Wordlist
                </Text>
            </View>
    </View>
  )
}

export default ChooseWordlist

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3C687A',
        flex: 1
    },
    head: {
        color: 'white',
        fontSize: 40,
        marginTop: 20,
        marginLeft: 60,
        fontWeight: '500'
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: '300',
        textAlign: 'center',
        marginTop: 15,
    },
    id: {
        color: 'white',
        width: 50,
        height: 50,
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: '100',
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20
    },
    plus: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 36,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        padding: 5
        
    }
})