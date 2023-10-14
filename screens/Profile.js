import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../styles/COLORS";
import Global from "../styles/Global";
//import ReactNativeBlobUtil from 'react-native-blob-util'


const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const Profile = ({ navigation, route }) => {
  const { user } = route.params;
  const [img, setImg] = useState("../components/default.jpg");

  useEffect(() => {
    //loadImages();
    // fetchUser()
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImg(files.map((f) => imgDir + f));
    }
  };


  const selectImage = async () => {
    let result;

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    
    setImg(uri);
    await route.params?.setImage(uri);
    
    
    console.log();
    saveToDB();
  };

  const saveToDB = async () => {
    // sth sth database
  };

  const handleOnLogOut = async () => {
    await AsyncStorage.removeItem("appUser");
    alert("Log out");
    navigation.navigate("Drawer");
    route.params.setUser();
  };

  return (
    <View style={[Global.container]}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={[styles.circle]}
          onPress={() => selectImage(true)}
        >
          <Image
            source={{
              uri: img,
            }}
            style={[styles.circle, styles.pic]}
          />
        </TouchableOpacity>
        <Text style={[Global.h2, { marginLeft: 40, marginTop: 0 }]}>
          {user.username}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity style={Global.buttonSub} onPress={handleOnLogOut}>
          <Text style={Global.textButton}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    backgroundColor: COLORS.dicBlack2,
    borderRadius: 18,
    marginVertical: 20,
  },
  circle: {
    backgroundColor: COLORS.dicBlack3,
    borderRadius: 100,
  },
  pic: {
    width: 100,
    height: 100,
    margin: 3,
    resizeMode: "cover",
  },
});
