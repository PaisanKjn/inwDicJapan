import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Pressable,
  } from "react-native";
  import React, { useEffect } from "react";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import { useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import { COLORS } from "../styles/COLORS";
  import Global from "../styles/Global";
  
  const Stack = createNativeStackNavigator();
  
  const SelectList = ({ navigation, route }) => {
    const [vocabLists, setVocabLists] = useState([]);
    const { word, user } = route.params;
    const [userID, setUserID] = useState(0);
  
    // Trigger Vocab lists fetch
    useEffect(() => {
      fetchUserID();
    }, []);
  
    // Fetching User ID (so we can fetch the whole vocab lists)
    const fetchUserID = async () => {
      try {
        const response = await fetch('http://192.168.1.100:8080/user?name=' + user.username + '&password=' + user.password)
        const data = await response.json();
        await getVocabLists(data.user.id);
        await setUserID(data.user.id)
      } catch(e) {
        console.log('Error fetching user ID', e);
      }
    }
  
    // Fetching Vocab lists
    const getVocabLists = async (userID) => {
      console.log("GETTING THE VOCAB LISTS");
      try {
        const response = await fetch('http://192.168.1.100:8080/vocablist?user_id=' + userID)
        const data = await response.json();
        await setVocabLists(data);
  
      } catch (e) {
        // error reading value
        alert("Error fetching vocab lists", e);
      }
      console.log("DONEZO");
    };
  
    // Render each vocab List
    const setView = ({ item }) => (
      <View>
      
          <Pressable
            onPress={() => handleOnAdd(item)}
            android_ripple={{ foreground: true, color: COLORS.dicBlack3 }}
            style={{
              backgroundColor: COLORS.dicBlack2,
              padding: 20,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={styles.text}>{item.name}</Text>
            <AntDesign name="right" size={30} color={COLORS.dicBlack4} />
          </Pressable>
       
      </View>
    );
  
    const handleOnAdd = async (vocabList) => {
        // make a POST request
        try {
            const formData = new FormData();
            formData.append('word_id', word.id );
            formData.append('vocablist_id', vocabList.id );
        
            await fetch("http://192.168.1.100:8080/vocabdetail",  {
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data", // Set content type to FormData
              },
              body: formData,
            })
              .then((response) => response.json())
              .then((responseData) => {
                console.log(JSON.stringify(responseData));
              })
            navigation.navigate("vocabStack", {screen: 'WordList', params: { vocabListID: vocabList.id, listName: vocabList.name} })
            alert('Vocab added to the list!');
        } catch(e) {
            console.log('Error adding a vocab to the list', e)
        }
    }
  
    // use "setList" for sample data otherwise use "vocabLists"
    return (
      <View style={[styles.container]}>
        <View>
          <FlatList data={vocabLists} renderItem={setView} />
        </View>
      </View>
    );
  };
  
  export default SelectList;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.dicBlack1,
      flex: 1,
      paddingTop: 30,
    },
    head: {
      color: COLORS.dicWhite,
      fontSize: 40,
      textAlign: "left",
      marginVertical: 10,
      marginHorizontal: 30,
    },
    text: {
      fontSize: 24,
      textAlignVertical: "center",
      color: COLORS.dicWhite,
    },
    button: {
      backgroundColor: COLORS.dicBlue,
      margin:20,
      borderRadius: 100,
      width: 55,
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      position: 'absolute',
      bottom: 0,
      right: 0
    },
  });
  