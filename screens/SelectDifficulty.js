import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";

const SelectDifficulty = ({ navigation }) => {
  const [difficulty, setDifficulty] = useState(5);
  return (
    <View style={{ backgroundColor: "#0e0e0e", flex: 1 }}>
      <Text style = {{fontSize: 25, color: 'white', textAlign: 'center', marginVertical: 20, fontWeight: "bold"}}>Select Difficulty</Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty == 5 ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => {
            setDifficulty(5);
          }}
        >
          <Text style = {styles.buttonText}>N5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty == 4 ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => {
            setDifficulty(4);
          }}
        >
          <Text style = {styles.buttonText}>N4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty == 3 ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => {
            setDifficulty(3);
          }}
        >
          <Text style = {styles.buttonText}>N3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty == 2 ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => {
            setDifficulty(2);
          }}
        >
          <Text style = {styles.buttonText}>N2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty == 1 ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          onPress={() => {
            setDifficulty(1);
          }}
        >
          <Text style = {styles.buttonText}>N1</Text>
        </TouchableOpacity>

        {/* START Button */}
        <TouchableOpacity
          style={[
            styles.button,styles.buttonSelected, {marginTop: 20, backgroundColor: '#3C687A', height: 60}
          ]}
          onPress={() => {
            navigation.navigate('timer')
          }}
        >
          <Text style = {[styles.buttonText, {color: 'white'}]}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectDifficulty;

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 20
  },
  buttonSelected: {
    backgroundColor: "white",
  },
  buttonUnselected: {
    backgroundColor: "#0e0e0e",
    borderColor: "#3C687A",
    borderWidth: 1,
  },
  buttonText: {
    color: '#3C687A',
    fontSize: 18
  }
});
