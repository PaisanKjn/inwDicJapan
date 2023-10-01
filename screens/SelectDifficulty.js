import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Global from "../styles/Global";
import { COLORS } from "../styles/COLORS";
import { AntDesign } from '@expo/vector-icons';
import Animated from "react-native-reanimated";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const SelectDifficulty = ({ navigation }) => {
  const [difficulty, setDifficulty] = useState(0);
  const width= useSharedValue(330);

  useEffect(() => {

  }, [difficulty])

  const upScale5 = useAnimatedStyle(() => {
    return {
      width: withSpring(difficulty == 5? 360: 330, { damping: 20 }),
      height: withSpring(difficulty == 5? 80: 70, {damping: 20}),
      elevation: withSpring(difficulty == 5? 10: 0, {damping: 20}),
    };
  });

  const upScale4 = useAnimatedStyle(() => {
    return {
      width: withSpring(difficulty == 4? 360: 330, { damping: 20 }),
      height: withSpring(difficulty == 4? 80: 70, {damping: 20}),
      elevation: withSpring(difficulty == 4? 10: 0, {damping: 20}),
    };
  });

  const upScale3= useAnimatedStyle(() => {
    return {
      width: withSpring(difficulty == 3? 360: 330, { damping: 20 }),
      height: withSpring(difficulty == 3? 80: 70, {damping: 20}),
      elevation: withSpring(difficulty == 3? 10: 0, {damping: 20}),
    };
  });

  const upScale2 = useAnimatedStyle(() => {
    return {
      width: withSpring(difficulty == 2? 360: 330, { damping: 20 }),
      height: withSpring(difficulty == 2? 80: 70, {damping: 20}),
      elevation: withSpring(difficulty == 2? 10: 0, {damping: 20}),
    };
  });

  const upScale1 = useAnimatedStyle(() => {
    return {
      width: withSpring(difficulty == 1? 360: 330, { damping: 20 }),
      height: withSpring(difficulty == 1? 80: 70, {damping: 20}),
      elevation: withSpring(difficulty == 1? 10: 0, {damping: 20}),
    };
  });

  const Line = () => {
    return(
         <View style = {styles.Line}/>
    )
  }

  return (
    <ScrollView style={Global.container}>
      <Text style={Global.h2}>Select Difficulty</Text>
      <View style={{ alignItems: "center", marginVertical: 40 }}>
        <TouchableOpacity
          onPress={() => {
            setDifficulty(5);
          }}
        >
          <Animated.View
            style={[upScale5,
              styles.button,
              difficulty == 5 ? styles.buttonSelected : styles.buttonUnselected,
              { borderTopLeftRadius: 18, borderTopRightRadius: 18},
            ]}
          >
            <Text
              style={
                difficulty == 5
                  ? styles.buttonTextSelected
                  : styles.buttonTextUnselected
              }
            >
              N5
            </Text>
          </Animated.View>
        </TouchableOpacity>
        <Line/>
        <TouchableOpacity
         
          onPress={() => {
            setDifficulty(4);
          }}
        >
          <Animated.View
           style={[upScale4,
            styles.button,
            difficulty == 4 ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          >
          <Text
            style={
              difficulty == 4
                ? styles.buttonTextSelected
                : styles.buttonTextUnselected
            }
          >
            N4
          </Text>
          </Animated.View>
        </TouchableOpacity>
        <Line/>
        <TouchableOpacity
         
         onPress={() => {
           setDifficulty(3);
         }}
       >
         <Animated.View
          style={[upScale3,
           styles.button,
           difficulty == 3 ? styles.buttonSelected : styles.buttonUnselected,
         ]}
         >
         <Text
           style={
             difficulty == 3
               ? styles.buttonTextSelected
               : styles.buttonTextUnselected
           }
         >
           N3
         </Text>
         </Animated.View>
       </TouchableOpacity>
       <Line/>
       <TouchableOpacity
         
          onPress={() => {
            setDifficulty(2);
          }}
        >
          <Animated.View
           style={[upScale2,
            styles.button,
            difficulty == 2 ? styles.buttonSelected : styles.buttonUnselected,
          ]}
          >
          <Text
            style={
              difficulty == 2
                ? styles.buttonTextSelected
                : styles.buttonTextUnselected
            }
          >
            N2
          </Text>
          </Animated.View>
        </TouchableOpacity>
        <Line/>
        <TouchableOpacity
          
          onPress={() => {
            setDifficulty(1);
          }}
        >
          <Animated.View style={[
            upScale1,
            styles.button,
            difficulty == 1 ? styles.buttonSelected : styles.buttonUnselected,
            { borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
          ]}>
          <Text
            style={
              difficulty == 1
                ? styles.buttonTextSelected
                : styles.buttonTextUnselected
            }
          >
            N1
          </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* START Button */}
      <TouchableOpacity
        style={styles.buttonCicle}
        onPress={() => {
          navigation.navigate("timer");
        }}
      >
       <AntDesign name="caretright" size={24} color= {COLORS.dicWhite} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SelectDifficulty;

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: 330,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSelected: {
    backgroundColor: COLORS.dicBlue,
  },
  buttonUnselected: {
    backgroundColor: COLORS.dicBlack2,
  },
  buttonTextSelected: {
    color: COLORS.dicWhite,
    fontSize: 24,
  },
  buttonTextUnselected: {
    color: COLORS.dicBlack4,
    fontSize: 24,
  },
  buttonCicle: {
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: COLORS.dicBlue,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  Line: {height: 1, width: 330, backgroundColor: COLORS.dicBlack4}
});
