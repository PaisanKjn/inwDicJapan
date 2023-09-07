import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { ImageBackground } from "react-native-web";

const Score = () => {
  return (
    <View style={styles.container}>
            <Text style={[styles.head,{}]}>
                Your Score is!
            </Text>
                <View
            style = {{
                height : 0.5,
                width : 240,
                marginTop: 10,
                marginLeft: 60,
                backgroundColor: '#3C687A'
            }}
            />
            <Text style={[styles.text,{}]}>
                14!
            </Text>
    </View>
  )
}

export default Score

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    head: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    text: {
        color: 'white',
        fontSize: 144,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 90
    }
})