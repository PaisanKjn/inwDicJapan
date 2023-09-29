import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { COLORS } from "../styles/COLORS";

const wordlist = [
  {
    vocab: "食べる",
    hiragana: "たべある",
    type: "คำกริยา (Verb)",
    meaning: "กิน",
    jlpt: "N5",
  },
  {
    vocab: "寝る",
    hiragana: "ねる",
    type: "คำกริยา (Verb)",
    meaning: "นอน",
    jlpt: "N5",
  },
  {
    vocab: "分かる",
    hiragana: "分かる",
    type: "คำกริยา (Verb)",
    meaning: "เข้าใจ",
    jlpt: "N5",
  },
  {
    vocab: "起きる",
    hiragana: "おきる",
    type: "คำกริยา (Verb)",
    meaning: "ตื่น",
    jlpt: "N5",
  },
];
const Quiz = ({navigation}) => {
  const [listItems, setListItems] = useState(wordlist);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(7);
  const [isAnswered, setIsAnswered] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const { height, width } = useWindowDimensions();
  const [word, setWord] = useState(wordlist[Math.floor(Math.random() * 4)].vocab);
  let interval = null;
  const animation = useSharedValue({ width: width });

  // If answer/timeout -> set answer
  useEffect(() => {
    if (isAnswered) {
      if (answer == word) {
        setScore((score) => score + 1);
      }
      else {
        setTimeout(() => {
         navigation.replace('score', {score: score})
        }, 3000);
      }
      setTime(0);
    }
  }, [isAnswered]);

  // if the question change > reset isAnswer and answer
  useEffect(() => {
    setIsAnswered(null);
    setAnswer(null);
  }, [index]);

  // the main countdown, if answered > set cooldown to 3 secs
  useEffect(() => {
    if (time >= 1) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      animation.value = { width: 0 };
      console.log(animation.value.width)
    } else {
      setIsAnswered(true);
      setTimeout(() => {
        setIndex((index) => index + 1);
        setWord(wordlist[Math.floor(Math.random() * 4)].vocab)
       
      }, 3000);
      animation.value = { width: width };
      console.log(animation.value.width)
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  // set countdown time
  useEffect(() => {
    if (!interval) {
      setTime(7);
    }
  }, [index]);


  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: !isAnswered?
            COLORS.dicBlack2
            : item.vocab == word?
            COLORS.dicGreen
              : answer == null?
              COLORS.dicBlack2
                : answer == item.vocab?
                COLORS.dicRed
                  : COLORS.dicBlack2
          },
        ]}
        onPress={() => getAnswer(item)}
        disabled={isAnswered ? true : false}
      >
        <Text style={{ color: COLORS.dicBlack5, fontSize: 20 }}>{item.meaning}</Text>
      </TouchableOpacity>
    );
  };

  const getAnswer = (item) => {
    setIsAnswered(true);
    setAnswer(item.vocab);
  };

  // duration of animation
  const reducedWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, {
        duration: !isAnswered?7000:1000,
      }),
    };
  });

  // duration of reset animation
  const resetWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(0, {
        duration: 3000,
      }),
    };
  });

  return (
    
    <View style={[{ backgroundColor: COLORS.dicBlack1, flex: 1 }]}>
      {/* timer bar */}
      <Animated.View
        style={[
          reducedWidth,
          { backgroundColor: COLORS.dicWhite, height: 15 },
        ]}
      >
        <Text>{time}</Text>
      </Animated.View>
      <Text style={[styles.question]}>{word}</Text>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <FlatList
            numColumns={2}
            data={listItems}
            renderItem={ItemView}
            keyExtractor={(item) => item.meaning.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
    alignItems: "center",
    marginTop: 50,
  },
  item: {
    padding: 20,
    height: 210,
    width: 160,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    color: COLORS.dicWhite,
    fontSize: 48,
    marginTop: 50,
    textAlign: "center",
  },
});
