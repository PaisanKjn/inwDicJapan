import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import VocabList from "./VocabList";
import { Pressable, Text, Image, View, StyleSheet,SafeAreaView} from "react-native";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Wordlist from "./Wordlist";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CreateVocabList from "./createVocabList";
import Redirect from "./Redirect";
import SelectDifficulty from "./SelectDifficulty";
import Timer from "./Timer";
import Quiz from "./Quiz";
import Score from "./Score";
import Result from "./Result";
import { COLORS } from "../styles/COLORS";
import * as NavigationBar from 'expo-navigation-bar'

NavigationBar.setBackgroundColorAsync(COLORS.dicBlack1)

const Stack = createNativeStackNavigator();
const _Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Nav = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getAppUser();
    console.log("Current user! ");
    console.log(user);
  }, []);

  /*get current user*/
  const getAppUser = async () => {
    try {
      const value = await AsyncStorage.getItem("appUser");
      if (value !== null) {
        _value = JSON.parse(value);
        setUser(_value);
        console.log("GETTING DA USER");
        console.log(_value);
      }
    } catch (e) {
      // error reading value
      alert("ERROR RETREIVING");
      console.log(e);
    }
    console.log("Done!");
  };

  function CustomDrawerContent(props) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/*Top Image */}
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={styles.sideMenuProfileIcon}
        />
  
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
  
        </DrawerContentScrollView>
        <Text style = {{color: COLORS.dicBlack5}}>Version 0.0.5</Text>
      </SafeAreaView>
    );
  }

  /* Drawer */
  function AppDrawer({ navigation }) {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent = {(props) => <CustomDrawerContent {...props}/>}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.dicBlack1,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: COLORS.dicWhite,
          },
          headerTitle: "InwDicJapan",
          drawerStyle: {
            backgroundColor: COLORS.dicBlack2,
          },
          headerTintColor: COLORS.dicWhite,
          drawerActiveBackgroundColor: COLORS.dicBlack2,
          drawerInactiveBackgroundColor: COLORS.dicBlack3,
          drawerActiveTintColor: COLORS.dicWhite,
          drawerInactiveTintColor: COLORS.dicBlack5,
          headerShadowVisible: false,
          unmountOnBlur: true,
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigation.navigate(
                  user ? "Profile" : "Login",
                  user ? { user: user } : ""
                )
              }
            >
              <Image
                source={{
                  uri: "https://reactnative.dev/img/tiny_logo.png",
                }}
                style={{ width: 40, height: 40, margin: 15 }}
              />
            </Pressable>
          ),
        }}
      >
        <Drawer.Screen
          name="Search"
          component={SearchStack}
          options={{ title: "Home",  drawerIcon: ({focused, size}) => (
            <AntDesign name="home" size={size} color= {focused? COLORS.dicWhite: COLORS.dicBlack4} />
         ) }}
        />
        <Drawer.Screen
          name="vocabStack"
          component={user ? VocabStack : Redirect}
          options={{ title: "Vocab List", drawerIcon: ({focused, size}) => (
            <Entypo name="list" size={size} color= {focused?COLORS.dicWhite: COLORS.dicBlack4} />
          ) }}
        />
        <Drawer.Screen
          name="quizStack"
          component={QuizStack}
          options={{ title: "Quiz", drawerIcon: ({focused, size}) => (
            <Ionicons name="game-controller-outline" size={size} color={focused?COLORS.dicWhite: COLORS.dicBlack4}  />
          ) }}
        />
      </Drawer.Navigator>
    );
  }

  // Register and Login (Bigger than the Drawer -> Drawer is nested inside)
  function UserStack() {
    return (
      <Stack.Navigator
        initialRouteName="Drawer"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.dicBlack1,
          },
          headerTintColor: COLORS.dicWhite,
          headerTitleStyle: {
            color: COLORS.dicWhite,
          },
          statusBarStyle: "light",
          statusBarColor: COLORS.dicBlack1,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          initialParams={{ setUser: setUser }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          initialParams={{ setUser: setUser }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{ setUser: setUser }}
        />
        <Stack.Screen name="WordList" component={Wordlist} />
      </Stack.Navigator>
    );
  }

  // Search screen and result
  function SearchStack() {
    return (
      // using a different stack because of a Modal
      <_Stack.Navigator>
        <_Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <_Stack.Screen
          name="Result"
          component={Result}
          initialParams={{ user: user }}
          options={{ headerShown: false }}
        />
        <_Stack.Screen
          name="VocabList"
          component={VocabList}
          initialParams={{ user: user }}
          options={{ headerShown: false }}
        />

        <_Stack.Screen
          name="createList"
          component={CreateVocabList}
          options={{
            presentation: "transparentModal",
            headerShown: false,
          }}
        />
      </_Stack.Navigator>
    );
  }

  // Vocab list and creating list
  function VocabStack() {
    return (
      <_Stack.Navigator>
        <_Stack.Screen
          name="VocabList"
          component={VocabList}
          initialParams={{ user: user }}
          options={{ headerShown: false }}
        />

        <_Stack.Screen
          name="createList"
          component={CreateVocabList}
          options={{
            presentation: "transparentModal",
            headerShown: false,
          }}
        />
      </_Stack.Navigator>
    );
  }

  // Difficulty, timer and score
  function QuizStack() {
    return (
      <_Stack.Navigator initialRouteName="selectDifficulty">
        <_Stack.Screen
          name="selectDifficulty"
          component={SelectDifficulty}
          options={{ headerShown: false }}
        />

        <_Stack.Screen
          name="timer"
          component={Timer}
          options={{
            headerShown: false,
          }}
        />
        <_Stack.Screen
          name="quiz"
          component={Quiz}
          options={{
            headerShown: false,
          }}
        />
        <_Stack.Screen
          name="score"
          component={Score}
          options={{
            headerShown: false,
          }}
        />
      </_Stack.Navigator>
    );
  }
  return (
    <NavigationContainer
    >
      <UserStack />
    </NavigationContainer>
  );
};

export default Nav;


const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'cover',
    padding: 10,
    width: 100,
    height: 100,
    margin: 10,
    alignSelf: "center",
  }
});