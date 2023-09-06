import React from 'react' 
import { View, Text, TouchableOpacity, TextInput , StyleSheet, Image} from 'react-native'
import {PropsWithChildren} from 'react'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  const { user } = route.params;
  const handleOnLogOut = async () => {
    await AsyncStorage.removeItem('appUser')
    navigation.navigate('Drawer', {user: ''});
    alert('Log out')
  }

  

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
      <View style={[{ flexDirection: 'row'}]}>
      <TouchableOpacity style={[styles.circle,{ marginTop: 50, marginLeft: 40}]} className="text-xl">
      <Image
                source={{
                  uri: "https://reactnative.dev/img/tiny_logo.png",
                }}
                style={{width: 80, height: 80, margin: 10, resizeMode: 'center'}}
              />
      </TouchableOpacity>
      <Text style={styles.head}>Username</Text>
      </View>
      <View>
      <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={[styles.button,{marginLeft: 240, marginTop: 100}]} className="text-xl">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  head: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginTop: 75,
    marginLeft: 50,
    fontWeight: '500'
  },
  button: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: "white",
    width: 100,
    height: 35,
    borderRadius: 100
  },
  circle: {
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 100
  }
})