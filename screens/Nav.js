import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import VocabList from "./VocabList";
import { Pressable, Text, Image } from "react-native";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Nav = () => {
  const [user, setUser] = useState('');
  const [endRoute, setEndRoute] = useState("Login");

  useEffect(() => {
    getAppUser();
    console.log('Current user is ')
    console.log(user)
  }, [user, endRoute]);

   /*get current user*/
  const getAppUser = async () => {
    try {
      const value = await AsyncStorage.getItem("appUser");
      if (value !== null) {
        alert(user);
        setUser(user);
        setEndRoute("Profile");
      } else {
        setEndRoute("Login");
      }
    } catch (e) {
      // error reading value
      alert("ERROR RETREIVING");
      console.log(e);
    }
    console.log("Done!");
  };

  /* Drawer */
  function AppDrawer({ navigation, route }) {
    console.log('The current param is ' + route.params);
    try {
      const {user} = route.params;
      setUser(user);
    } catch(e) {

    }
    console.log('The current user is ' + user);
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0e0e0e",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: '#fff'
          },
          headerTitle: "InwDicJapan",
          drawerStyle: {
            backgroundColor: '#3C687A'
          },
          drawerActiveBackgroundColor: '#fff',
          drawerActiveTintColor: '#3C687A',
          drawerInactiveTintColor: '#fff',
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate(endRoute, user?{user: user}:'')}>
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
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="VocabList" component={VocabList} />
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
          backgroundColor: '#0e0e0e'
        },
        headerTitleStyle: {
          color:'#fff'
        },
        statusBarStyle: 'light',
        statusBarColor: '#0e0e0e',
        animation: 'slide_from_right'
      }
      }>
        <Stack.Screen
          name="Drawer"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <UserStack />
    </NavigationContainer>
  );
};

export default Nav;
