import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import VocabList from "./VocabList";
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Wordlist from "./Wordlist";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import CreateVocabList from "./createVocabList";
import Redirect from "./Redirect";
import SelectDifficulty from "./SelectDifficulty";
import Timer from "./Timer";
import Quiz from "./Quiz";
import Score from "./Score";
import Result from "./Result";
import WordOption from "./WordOption";
import ListOption from "./ListOption"
import { COLORS } from "../styles/COLORS";
import * as NavigationBar from "expo-navigation-bar";

NavigationBar.setBackgroundColorAsync(COLORS.dicBlack1);

const Stack = createNativeStackNavigator();
const _Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const config2 = {
  animation: "spring",
  config: {
    stiffness: 200,
    damping: 300,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Nav = ({route}) => {
  const [user, setUser] = useState();
  const [image, setImage] = useState("https://reactnative.dev/img/tiny_logo.png")

  useEffect(() => {
    getAppUser();
    console.log("Current user! ");
    console.log(user);
  }, []);

  /*get current user*/
  const getAppUser = async () => {
    try {
      // Store as username only
      const value = await AsyncStorage.getItem("appUser");
      if (value !== null) {
        // fetch from Backend, using async-str for the time being
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
        {/*Top Icon */}
        <View style = {{margin: 10, alignItems: 'flex-end'}}>
          
          <FontAwesome name="chevron-left" size={30} color= {COLORS.dicBlack4} />
    
       
        </View>
       

        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <Text style={{ color: COLORS.dicBlack4, margin: 10 }}>Version 0.1.0</Text>
      </SafeAreaView>
    );
  }

  /* Drawer */
  function AppDrawer({ navigation }) {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.dicBlack1,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: COLORS.dicWhite,
          },
          drawerStyle: {
            backgroundColor: COLORS.dicBlack2,
          },
          drawerLabelStyle: {fontSize: 20},
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
                  uri: image
                }}
                style  = {styles.sideMenuProfileIcon}
              />
            </Pressable>
          ),
        }}
      >
        <Drawer.Screen
          name="Search"
          component={SearchStack}
          options={{
            title: "Home",
            drawerIcon: ({ focused, size }) => (
              <AntDesign
                name="home"
                size={size}
                color={focused ? COLORS.dicWhite : COLORS.dicBlack4}
              />
            ),        
          }}
        />
        <Drawer.Screen
          name="vocabStack"
          component={user ? VocabStack : Redirect}
          options={{
            title: "Vocab List",
            drawerIcon: ({ focused, size }) => (
              <Entypo
                name="list"
                size={size}
                color={focused ? COLORS.dicWhite : COLORS.dicBlack4}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="quizStack"
          component={QuizStack}
          options={{
            title: "Quiz",
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="game-controller-outline"
                size={size}
                color={focused ? COLORS.dicWhite : COLORS.dicBlack4}
              />
            ),
          }}
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
          initialParams={{ setUser: setUser, setImage: setImage }}
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
      </Stack.Navigator>
    );
  }

  // Search screen and result
  function SearchStack() {
    return (
      // using a different stack because of a Modal
      <_Stack.Navigator >
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
      <_Stack.Navigator screenOptions={{cardOverlayEnabled: true, cardShadowEnabled: true}}>
        <_Stack.Screen
          name="VocabList"
          component={VocabList}
          initialParams={{ user: user }}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="WordList" component={Wordlist} options={{
            presentation: 'modal',
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config2,
            }

          }} />

        <_Stack.Screen
          name="createList"
          component={CreateVocabList}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            gestureEnabled: true,
            transitionSpec: {
              open: config,
              close: config2,
            },
          }}
        />
         <_Stack.Screen
          name="listOption"
          component={ListOption}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            gestureEnabled: true,
            transitionSpec: {
              open: config,
              close: config2,
            },
          }}
        />
        <_Stack.Screen
          name="wordOption"
          component={WordOption}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            gestureEnabled: true,
            transitionSpec: {
              open: config,
              close: config2,
            },
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
    resizeMode: "cover",
    height: 50,
    width: 50,
    margin: 20,
    alignSelf: "center",
    borderRadius: 100
  },
});
