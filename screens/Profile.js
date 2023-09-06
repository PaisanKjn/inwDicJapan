import React from 'react' 
import { View, Text, TouchableOpacity, TextInput , StyleSheet} from 'react-native'
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
    <View>
      <Text>Hello {user}</Text>
      <TouchableOpacity
      onPress={handleOnLogOut}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})