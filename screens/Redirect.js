import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 

const Redirect = ({navigation}) => {
  return (
    <View style = {styles.container}>
      <View style = {{alignItems: 'center', justifyContent: 'center', marginBottom: 80}}>
      <Ionicons name="ios-warning" size={90} color="#999999" />
      <Text style = {{fontSize: 15, color: "#999", marginVertical: 25}}>You need an account to use this feature</Text>
      </View>
      <View style ={{alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity  style = {[styles.button]}
      onPress={() => navigation.navigate('Login')}>
        <Text style = {styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style = {{color: '#999'}}>Or</Text> 
      <TouchableOpacity style = {[styles.button, {backgroundColor: null, borderWidth: 1, borderColor: '#3C687A'}]}
      onPress={() => navigation.goBack()}>
        <Text style = {[styles.buttonText]}>Go Back</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  )
}

export default Redirect

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#0e0e0e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#3C687A',
    width: 300,
    height: 35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
})