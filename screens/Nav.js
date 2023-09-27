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
import { Pressable, Text, Image, View, StyleSheet,SafeAreaView } from "react-native";
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

const Stack = createNativeStackNavigator();
const _Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const theme = {
  colors: COLORS
}

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
        <Text style = {{color: '#ccc'}}>Version 0.0.4</Text>
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
            backgroundColor: theme.colors.dicBlack1,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme.colors.dicWhite,
          },
          headerTitle: "InwDicJapan",
          drawerStyle: {
            backgroundColor: theme.colors.dicBlue,
          },
          headerTintColor: theme.colors.dicWhite,
          drawerActiveBackgroundColor: theme.colors.dicWhite,
          drawerActiveTintColor: theme.colors.dicBlue,
          drawerInactiveTintColor: theme.colors.dicWhite,
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
            <AntDesign name="home" size={size} color= {focused? theme.colors.dicBlue: theme.colors.dicWhite} />
         ) }}
        />
        <Drawer.Screen
          name="vocabStack"
          component={user ? VocabStack : Redirect}
          options={{ title: "Vocab List", drawerIcon: ({focused, size}) => (
            <Entypo name="list" size={size} color= {focused?theme.colors.dicBlue: theme.colors.dicWhite} />
          ) }}
        />
        <Drawer.Screen
          name="quizStack"
          component={QuizStack}
          options={{ title: "Quiz", drawerIcon: ({focused, size}) => (
            <Ionicons name="game-controller-outline" size={size} color= {focused? theme.colors.dicBlue: theme.colors.dicWhite} />
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
            backgroundColor: theme.colors.dicBlack1,
          },
          headerTitleStyle: {
            color: theme.colors.dicWhite,
          },
          statusBarStyle: "light",
          statusBarColor: theme.colors.dicBlack1,
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
    <NavigationContainer>
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