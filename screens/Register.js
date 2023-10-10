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
  const [users, setUsers] = useState([]); // won't be used
  const dis = username == "" || password == "" ? true : false;
  const user = {
    username: username,
    password: password,
    profilePic: "",
  };

  /* For now logging*/
  useEffect(() => {
    findUsers(); // will use this method for fetching user instead
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
      // 1. Check Password/PasswordConfirm
      // 2. Fetch username if it exists
      // 3. check if password == username
      // 4. Save to DB & Store in async
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

    // fetch("https://mywebsite.com/endpoint/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // });
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

    // return fetch('')
    // .then(response => response.json())
    // .then(json => {
    //   return json.user;
    // })
    // .catch(error => {
    //   console.error(error);
    // });
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
