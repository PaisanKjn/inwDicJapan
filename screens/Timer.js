import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Global from "../styles/Global";
import { COLORS } from "../styles/COLORS";

const Timer = ({navigation, route}) => {
  const [time, setTime] = useState(3);

  useEffect(() => {
    let interval = null;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      navigation.replace('quiz', {difficulty: route.params.difficulty})
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
    <View style={[Global.container, {justifyContent: 'center', alignItems: 'center'}]}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 72,
    fontWeight: "bold",
    color: COLORS.dicWhite
  },
});

export default Timer;
