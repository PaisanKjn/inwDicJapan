import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import VocabList from "./VocabList";
import { Pressable, Text, Image } from "react-native";
import Register from "./Register";
import Login from "./Login";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/* Drawer */
function AppDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#b3aaaa",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "InwDicJapan",
        drawerActiveTintColor: '#aa4',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('Register')}>
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
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={AppDrawer} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const Nav = () => {
  return (
    <NavigationContainer>
      <UserStack />
    </NavigationContainer>
  );
};

export default Nav;
