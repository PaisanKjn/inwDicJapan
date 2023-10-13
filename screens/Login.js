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

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dis = username == "" || password == "" ? true : false;

  /* For now logging*/
  useEffect(() => {
    //findUsers();
  }, []);

  /* register/store users in the DB */
  const handleSubmit = () => {
    // 1. Fetch username if it exists
    // 2. check if password == username
    // 3. Store in async
    checkPass(); // will use findUser instead
  };

  // const isAlreadyExisted = () => {
  //   const userResult = users.filter((users) => {
  //     if (username === users.username) {
  //       return users;
  //     }
  //   });
  //   console.log(userResult);
  //   return userResult.length > 0
  //     ? checkPass(userResult)
  //     : alert("This username doesn't exist!");
  // };

  const checkPass = async (userResult) => {
    let url =
      "http://192.168.1.100:8080/user?name=" + username + "&password=" + password;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.user.name == "") {
        alert("Your username or password is incorrect");
      } else {
        const user = {username: data.user.name,
                      password: data.user.password}
        storeAppUser(user);
        alert("Logged in!");
        navigation.navigate("Drawer");
        route.params.setUser(user);
      }
    } catch (err) {
      console.log("Error logging user in");
    }

  };


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

  return (
    <View style={Global.container}>
      {/* Input Container */}
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
      </View>

      {/* Button container */}
      <View>
        <TouchableOpacity
          style={[Global.buttonMain, { marginVertical: 10 }]}
          onPress={() => {
            handleSubmit();
          }}
          disabled={dis}
        >
          <Text style={Global.textButton}>Login</Text>
        </TouchableOpacity>
        <Text style={[Global.h3, { color: COLORS.dicBlack5 }]}>Or</Text>
        <TouchableOpacity
          style={[Global.buttonSub, { marginVertical: 10 }]}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={Global.textButton}>Register</Text>
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

export default Login;
