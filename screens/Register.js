import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../styles/Global";
import { COLORS } from "../styles/COLORS";

const Register = ({ route, navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const dis = username == "" || password == "" ? true : false;
  const user = {
    username: username,
    password: password,
  };

  

  /* For now logging*/
  useEffect(() => {
    // findUsers(); will use this method for fetching user instead
  }, []);

  /* register/store users in the DB */
  const handleSubmit = async () => {
    // 1. Check Password/PasswordConfirm
    // 2. Fetch username if it exists
    // 3. check if password == username
    // 4. Save to DB & Store in async

    if (passCheck()) {
      if (!isAlreadyExisted) {
        if (password != username) {
          saveToDB();
        } else {
          alert("The password can't be your username")
        }
      } else {
        alert('This username is already taken');
      }
    }
  };

  const passCheck = () => {
    if(password != passwordCheck) {
      alert("Your passwords don't match");
      return(false);
    }
    if(password.trim().length < 8) {
      alert("The password must be at least 8 characters")
      return(false)
    }
    return(true);

  }
   const isAlreadyExisted = () => {
    // Sendg a request to check if the user exists or not
    try {
      const response = fetch("http://localhost:8080/username?name=" + username)
      return response
    } catch (err) {
      console.log("Error fetching user", err)
    }
   
  };

  const saveToDB = () => {
    try {
      fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
      })
      .done();

      storeAppUser();
    } catch (err) {
      console.log('Error saving user to a database');
    }
    
  };

   /*store current user*/
   const storeAppUser = async () => {
    try {
      await AsyncStorage.setItem("appUser", JSON.stringify(user));
      // alert("SAVED");
    } catch (e) {
      // saving error
      alert("ERROR SAVING");
    }
  };


  return (
    <View style={Global.container}>
      {/* Input container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={Global.input}
          value={username}
          onChangeText={(value) => setUsername(value)}
          placeholder="Enter username"
          placeholderTextColor={COLORS.dicBlack4}
        />
        <TextInput
          style={Global.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter password"
          placeholderTextColor={COLORS.dicBlack4}
          secureTextEntry={true}
        />
        <TextInput
          style={Global.input}
          value={passwordCheck}
          onChangeText={(value) => setPasswordCheck(value)}
          placeholder="Confirm password"
          placeholderTextColor={COLORS.dicBlack4}
          secureTextEntry={true}
        />
      </View>

      {/* Button Container */}
      <View>
        <TouchableOpacity
          style={[Global.buttonMain, { marginVertical: 10 }]}
          onPress={() => {
            handleSubmit();
          }}
          disabled={dis}
        >
          <Text style={Global.textButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default Register;
