import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import VocabList from "./VocabList";
import { Pressable, Text, Image, View } from "react-native";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Wordlist from "./Wordlist";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import CreateVocabList from "./createVocabList";
import Redirect from "./Redirect";

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

  /* Drawer */
  function AppDrawer({ navigation }) {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0e0e0e",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          headerTitle: "InwDicJapan",
          drawerStyle: {
            backgroundColor: "#3C687A",
          },
          drawerActiveBackgroundColor: "#fff",
          drawerActiveTintColor: "#3C687A",
          drawerInactiveTintColor: "#fff",
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
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ focused}) => {
              <AntDesign
                name="home"
                size={24}
                color={focused ? "#fff" : "#3C687A"}
              />;
            },
            //drawerType: 'slide'
          }}
        />
        <Drawer.Screen name="vocabStack" component={user?VocabStack:Redirect} />
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
            backgroundColor: "#0e0e0e",
          },
          headerTitleStyle: {
            color: "#fff",
          },
          statusBarStyle: "light",
          statusBarColor: "#0e0e0e",
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

  function VocabStack() {
    return (
      <_Stack.Navigator>
        <_Stack.Screen
          name="VocabList"
          component={VocabList}
          initialParams={{ user: user }}
          options={{headerShown: false}}
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
  return (
    <NavigationContainer>
      <UserStack />
    </NavigationContainer>
  );
};

export default Nav;
