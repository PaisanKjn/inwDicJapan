import React from 'react' 
import { View, Text, TouchableOpacity, TextInput , StyleSheet} from 'react-native'
import {PropsWithChildren} from 'react'
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

  // useEffect(() => {
  //   console.log(user)
  // }, [])

  // /*store data*/
  // const storeData = async (userValue) => {
  //   try {
  //     const jsonValue = JSON.stringify(userValue);
  //     await AsyncStorage.setItem('appUser', jsonValue);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  // /*Getting object???*/
  // getMyObject = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('user')
  //     jsonValue != null ? JSON.parse(jsonValue) : null
  //     alert(jsonValue.username)
  //   } catch(e) {
  //     // read error
  //   }
  
  //   console.log('Done.')
  // }


  return (
    <View style={[styles.container, {backgroundColor: 'black'}]}>
      <Text style={styles.head}>Register</Text>
      <View style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
      <TextInput style={styles.input}
      value = {username}
      onChangeText = {(value) => setUsername(value)}
      placeholder='Enter username'
      />
      <TextInput style={styles.input}
      value = {password}
      onChangeText = {(value) => setPassword(value)}
      placeholder ='Enter password'
      secureTextEntry = {true}
      />
      <TextInput style={styles.input}
      value = {password}
      onChangeText = {(value) => setPassword(value)}
      placeholder ='Confirm password'
      secureTextEntry = {true}
      />
      </View>
      <View style={[{flexDirection: 'row-reverse', marginLeft: 200, marginBottom: 1000}]}>
      <TouchableOpacity
      onPress={() => {navigation.navigate('Login')}}>
        <Text style={styles.button} className = "text-xl">Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  input: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '100',
    backgroundColor: 'white',
    width: 300,
    height: 30,
    borderRadius: 100
  },
  button: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: '500',
    backgroundColor: 'white',
    width: 100,
    height: 35,
    borderRadius: 100
  },
  head: {
    textAlign: 'center',
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20
  }
})

export default Register 