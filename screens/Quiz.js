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
import Animated from "react-native-reanimated";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

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
  const [time, setTime] = useState(3);
  const [isAnswered, setIsAnswered] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const { height, width } = useWindowDimensions();
  const [word, setWord] = useState(wordlist[Math.floor(Math.random() * 4)].vocab);
  let interval = null;
  const animation = useSharedValue({ width: width });

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

  useEffect(() => {
    setIsAnswered(null);
    setAnswer(null);
  }, [index]);

  useEffect(() => {
    if (time >= 1) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      animation.value = { width: 0 };
    } else {
      setIsAnswered(true);
      setTimeout(() => {
        setIndex((index) => index + 1);
        setWord(wordlist[Math.floor(Math.random() * 4)].vocab)
       
      }, 3000);
      animation.value = { width: width };
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    if (!interval) {
      setTime(3);
    }
  }, [index]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${remainingSeconds.toString().padStart(1, "0") + "!"}`;
  };

  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: !isAnswered?
            'white'
            : item.vocab == word?
              'green'
              : answer == null?
                'white'
                : answer == item.vocab?
                  'red'
                  :'white'
          },
        ]}
        onPress={() => getAnswer(item)}
        disabled={isAnswered ? true : false}
      >
        <Text style={{ color: "black", fontSize: 20 }}>{item.meaning}</Text>
      </TouchableOpacity>
    );
  };

  const getAnswer = (item) => {
    setIsAnswered(true);
    setAnswer(item.vocab);
  };

  const reducedWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, {
        duration: 3000,
      }),
    };
  });

  const resetWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, {
        duration: 100,
      }),
    };
  });

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
      <Animated.View
        style={[
          time === 0 ? resetWidth : reducedWidth,
          { backgroundColor: "white", height: 15 },
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
    height: 130,
    width: 130,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    color: "white",
    fontSize: 48,
    marginTop: 50,
    textAlign: "center",
  },
});
