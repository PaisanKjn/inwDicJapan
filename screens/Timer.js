import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const Timer = ({navigation}) => {
  const [time, setTime] = useState(3);

  useEffect(() => {
    let interval = null;

    if (time > -1) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      navigation.replace('quiz')
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${remainingSeconds.toString().padStart(1, "0") + "!"}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black'
  },
  timer: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
  },
});

export default Timer;
