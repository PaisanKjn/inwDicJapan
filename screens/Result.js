import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useState } from "react";
import Global from "../styles/Global";
import { COLORS } from "../styles/COLORS";
import SeparateLine from "../components/SeparateLine";
import { useEffect } from "react";

const Result = ({ navigation, route }) => {
  const { searchQuery } = route.params;
  const [sound, setSound] = useState(null);
  const [result, setResult] = useState();
  // const result = [
  //   {
  //     vocab: "来ます",
  //     hiragana: "きます",
  //     type: "คำกริยา (Verb 3)",
  //     forms: {
  //       dict: "くる",
  //       ta: "きた",
  //       te: "きて",
  //       nai: "こない",
  //     },
  //     meaning: "มา",
  //     jlpt: "N5",
  //   },
  //   {
  //     vocab: "きます",
  //     hiragana: "きます",
  //     type: "คำกริยา (Verb 2)",
  //     forms: {
  //       dict: "きる",
  //       ta: "きた",
  //       te: "きて",
  //       nai: "きない",
  //     },
  //     meaning: "ใส่ (เสื้อผ้า)",
  //     jlpt: "N5",
  //   },
  //   {
  //     vocab: "きれい",
  //     hiragana: "きれい",
  //     type: "คำคุณศัพท์ na",
  //     forms: {
  //       dict: "",
  //       ta: "",
  //       te: "",
  //       nai: "",
  //     },
  //     meaning: "สวย, สะอาด",
  //     jlpt: "N5",
  //   },
  // ];

  useEffect(() => {
   fetchWord();
  }, [])

  const fetchWord = async () => {
    try {
      const url = 'http://192.168.1.100:8080/?vocab=' + route.params.searchQuery.toString()
      const response = await fetch(url)
      const data = await response.json();
      setResult(data);
      console.log(url)
    } catch(err) {
      console.log('Error fetching results', err)
    }
   
  }

  const separator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: COLORS.dicBlack3,
          alignSelf: "center",
        }}
      />
    );
  };
  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <View style={{ marginVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 32,
                color: COLORS.dicWhite,
              }}
            >
              {item.vocab}
            </Text>
            {item.vocab != item.hiragana ? (
              <Text style={{ color: COLORS.dicBlack4, fontSize: 15 }}>
                {item.hiragana}
              </Text>
            ) : (
              ""
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOnAdd(item)}
            >
              <AntDesign name="plus" size={35} color={COLORS.dicWhite} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                playSound(item.vocab);
              }}
            >
              <Ionicons
                name="volume-medium"
                size={35}
                color={COLORS.dicWhite}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ color: COLORS.dicWhite, fontSize: 24, marginTop: 10 }}>
          {item.meaning}
        </Text>
        <Text style={{ color: COLORS.dicBlack4, fontSize: 15 }}>
          {item.type}
        </Text>

        {item.forms.dict ? (
          <>
            <Text style={{ color: COLORS.dicWhite, fontSize: 22 }}>
              {item.forms.dict}
            </Text>
            <Text style={{ color: COLORS.dicWhite, fontSize: 22 }}>
              {item.forms.te}
            </Text>
            <Text style={{ color: COLORS.dicWhite, fontSize: 22 }}>
              {item.forms.ta}
            </Text>
            <Text style={{ color: COLORS.dicWhite, fontSize: 22 }}>
              {item.forms.nai}
            </Text>
          </>
        ) : (
          ""
        )}
      </View>
    );
  };

  // Play the sound with an onEnd callback
  const playSound = async (word) => {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({
        uri:
          "http://api.voicerss.org/?key=3d4781b06455498f835c40ad18642941&hl=ja-jp&c=MP3&v=Akira&src=" +
          word,
      });
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (e) {
      console.log("Failed for some fucking reason");
      console.log(e);
    }
  };

  const handleOnAdd = (item) => {
    if (route.params?.user == null) {
      alert("You need an account to use this feature");
    } else {
      navigation.navigate("VocabList", { item: item });
    }
  };

  return (
    <View style={Global.container}>
      <Text style={[styles.head]}>{searchQuery}</Text>
      <SeparateLine />
      <View style={[styles.container]}>
        {result != null ? (
          <>
            <FlatList
              data={result}
              renderItem={ItemView}
              ItemSeparatorComponent={separator}
              keyExtractor={(item) => item.meaning.toString()}
            />
          </>
        ) : (
          <>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Entypo
                name="magnifying-glass"
                size={90}
                color={COLORS.dicBlack4}
              />
              <Text style={styles.disabledText}>Cannot find any matching words</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  head: {
    color: "white",
    fontSize: 40,
    marginTop: 20,

    textAlign: "left",
  },
  button: {
    height: 55,
    width: 55,
    backgroundColor: COLORS.dicBlue,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  disabledText: {
    fontSize: 15,
    color: COLORS.dicBlack4,
    marginVertical: 25,
  },
});
