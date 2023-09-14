import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker'

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if(!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
  }
}; 

const Profile = ({ navigation, route }) => {
  const { user } = route.params;
  const [img, setImg] = useState("https://reactnative.dev/img/tiny_logo.png");

  useEffect(()=> {
    loadImages();
  }, [])

  const loadImages = async ()  => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if(files.length>0) {
      setImg(files.map(f=>imgDir+f))
    }
  }

  const selectImage = async (useLibrary) => {
    let result;

    const options = ImagePicker.MediaTypeOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
    }

    if(useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options)
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync(options); 
    }
    
    if(!result.canceled) {
      console.log(result.assets[0].uri);
      saveImage(result.assets[0].uri)
    }
  };

  const saveImage = async(uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() +'.jpg';
    const dest = imgDir +filename;
    await FileSystem.copyAsync({from: uri, to:dest});
    setImg(dest);
    saveToDB();
  }

  const saveToDB = async() => {
    // sth sth database

  }


  const handleOnLogOut = async () => {
    await AsyncStorage.removeItem("appUser");
    alert("Log out");
    navigation.navigate("Drawer");
    route.params.setUser();
  };

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
      <View style={[{ flexDirection: "row"}]}>
        <TouchableOpacity
          style={[styles.circle, { marginTop: 50, marginLeft: 40 }]}
          onPress={() => selectImage(true)}
        >
          <Image
            source={{
              uri: img
            }}
            style={[styles.circle,{ width: 90, height: 90, margin: 5, resizeMode: "cover" }]}
          />
        </TouchableOpacity>
        <Text style={styles.head}>{user.username}</Text>
      </View>
      <View
        style={{
          margin: 30,
          marginTop: 100,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity style={[styles.button]} onPress={handleOnLogOut}>
          <Text style = {{fontSize: 20, color: 'white'}}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  head: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginTop: 75,
    marginLeft: 50,
    fontWeight: "500",
  },
  button: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: "#3C687A",
    width: 100,
    height: 35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    backgroundColor: "white",
    borderRadius: 100,
  },
});
