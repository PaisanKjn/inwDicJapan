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

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  /* For now logging*/
  useEffect(() => {
    findUsers();
    console.log('Render')
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
    return userResult.length > 0 ? checkPass(userResult) : alert("This username doesn't exist!");
  };

  const checkPass = async (userResult) => {
    if(password !== userResult[0].password) {
      alert("Password doesn't match");
    } else {
      await storeAppUser(userResult[0]);
      console.log('Saved user is ')
      console.log(userResult[0])
      alert("Logged in!");
      //route.params.setLog(true);
      navigation.navigate("Drawer");
      route.params.setUser(userResult[0])
      
    }
  }


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
    <View style={[styles.container, { backgroundColor: "#0e0e0e", flex: 1 }]}>
      <Text style={styles.head}>Login</Text>
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(value) => setUsername(value)}
          placeholder="Enter username"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter password"
          secureTextEntry={true}
        />
      </View>
      <View style={[{ flexDirection: "row-reverse" }]}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.button} className="text-xl">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={[styles.button, { marginRight: 5 }]} className="text-xl">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    //alignItems: "center",
  },
  input: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "100",
    backgroundColor: "white",
    width: "100%",
    height: 30,
    borderRadius: 100,
  },
  button: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: "white",
    width: 100,
    height: 35,
    borderRadius: 100,
  },
  head: {
    textAlign: "center",
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default Login;
