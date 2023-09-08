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

const Register = ({route, navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [users, setUsers] = useState([]);
  const user = {
    username: username,
    password: password,
    profilePic: "",
  };

  /* For now logging*/
  useEffect(() => {
    findUsers();
  }, []);

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

  /* register/store users in the DB */
  const handleSubmit = async () => {
    try {
      // check if every field is filled NOT DONE YET

      if (password === passwordCheck) {
        if (isAlreadyExisted()) {
          alert("This username is already existed");
        } else {
          const updatedUsers = [...users, user];
          setUsers(updatedUsers);
          await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
          storeAppUser();
          alert("User is saved! :3");
          route.params.setUser(user);
          navigation.navigate("Home");
        }
      } else {
        alert("Passwords don't match");
      }
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
    return userResult.length > 0 ? true : false;
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
    <View style={[styles.container, { backgroundColor: "black" }]}>
      <Text style={styles.head}>Register</Text>
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
        <TextInput
          style={styles.input}
          value={passwordCheck}
          onChangeText={(value) => setPasswordCheck(value)}
          placeholder="Confirm password"
          secureTextEntry={true}
        />
      </View>
      <View
        style={[
          { flexDirection: "row-reverse", marginLeft: 200, marginBottom: 1000 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.button} className="text-xl">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "100",
    backgroundColor: "white",
    width: 300,
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

export default Register;
