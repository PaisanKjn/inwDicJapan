import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Redirect = ({navigation}) => {
  return (
    <View>
      <Text>You must need an account to use this features</Text>
      <TouchableOpacity style = {{backgroundColor: '#34aaaa'}}
      onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {{backgroundColor: '#34aaaa'}}
      onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Redirect