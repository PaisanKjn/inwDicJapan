import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = {
    username: {username},
    password: {password},
    profilePic: ''
  }

  useEffect(() => {
    console.log(user)
  }, [])

  /*store data*/
  const storeData = async (userValue) => {
    try {
      const jsonValue = JSON.stringify(userValue);
      await AsyncStorage.setItem('appUser', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      jsonValue != null ? JSON.parse(jsonValue) : null
      alert(jsonValue.username)
    } catch(e) {
      // read error
    }
  
    console.log('Done.')
  }


  return (
    <View>
      <Text>Register</Text>
      <TextInput
      value = {username}
      onChangeText = {(value) => setUsername(value)}
      placeholder='Enter username'
      />
      <TextInput
      value = {password}
      onChangeText = {(value) => setPassword(value)}
      placeholder ='Enter password'
      secureTextEntry = {true}
      />
      <View>
      <TouchableOpacity className = "m-3 rounded-xl bg-slate-400"
      onPress={() => {navigation.navigate('Login')}}>
        <Text className = "text-xl">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity className = "m-3 rounded-xl bg-slate-400"
      onPress = {() => {
        alert('Success')
        console.log(user)
        storeData(user)
        /*navigation.navigate('Home')*/}}>
        <Text className = "text-xl">Register</Text>
      </TouchableOpacity>
      <TouchableOpacity className = "m-3 rounded-xl bg-slate-400"
      onPress = {() => {
        getMyObject()
        }}>
        <Text className = "text-xl">CHevk shit</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Register