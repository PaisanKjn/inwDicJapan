import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyle } from "../styles/Global";
import { COLORS } from "../styles/COLORS";

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const dis = (username == '' || password == '')? true: false;

  /* For now logging*/
  useEffect(() => {
    findUsers();
    console.log("Render");
  }, []);

  /*store current user*/
  const storeAppUser = async (user) => {
    try {
      await AsyncStorage.setItem("appUser", JSON.stringify(user));
      alert("SAVED");
    } catch (e) {
      // saving error
      alert("ERROR SAVING");
    }
  };

  /* register/store users in the DB */
  const handleSubmit = () => {
    try {
      // check if every field is filled NOT DONE YET
      isAlreadyExisted();
    } catch (e) {
      console.log(e);
    }
  };

  const isAlreadyExisted = () => {
    const userResult = users.filter((users) => {
      if (username === users.username) {
        return users;
      }
    });
    console.log(userResult);
    return userResult.length > 0
      ? checkPass(userResult)
      : alert("This username doesn't exist!");
  };

  const checkPass = async (userResult) => {
    if (password !== userResult[0].password) {
      alert("Password doesn't match");
    } else {
      await storeAppUser(userResult[0]);
      console.log("Saved user is ");
      console.log(userResult[0]);
      alert("Logged in!");
      //route.params.setLog(true);
      navigation.navigate("Drawer");
      route.params.setUser(userResult[0]);
    }
  };

  /* retrieving all users from DB so the users are in the const */
  const findUsers = async () => {
    try {
      const result = await AsyncStorage.getItem("users");
      console.log(result);
      console.log("POOP");
      if (result !== null) setUsers(JSON.parse(result));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={globalStyle.container}>
      {/* Input Container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={globalStyle.input}
          value={username}
          onChangeText={(value) => setUsername(value)}
          placeholder="Enter username"
          placeholderTextColor={COLORS.dicBlack4}
        />
        <TextInput
          style={globalStyle.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter password"
          placeholderTextColor={COLORS.dicBlack4}
          secureTextEntry={true}
        />
      </View>

      {/* Button container */}
      <View>
        <TouchableOpacity
          style={[globalStyle.buttonMain, {marginVertical: 10}]}
          onPress={() => {
            handleSubmit();
          }}
          disabled = {dis}
        >
          <Text style={globalStyle.textButton}>Login</Text>
        </TouchableOpacity>
        <Text style={[globalStyle.h3, {color: COLORS.dicBlack5}]}>Or</Text>
        <TouchableOpacity
          style={[globalStyle.buttonSub,  {marginVertical: 10}]}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={globalStyle.textButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginTop: 20
  },
});

export default Login;
