import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import RegisterScreen from './screens/RegisterScreen';
import { Provider } from "react-redux";
import { store } from "./store";
import DeliveryScreen from "./screens/DeliveryScreen";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import LoginScreen from "./screens/LoginScreen";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const Stack = createNativeStackNavigator();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnfNG9kQcGAwMyTHh3AxLkKrHRaIYA77c",
  authDomain: "foodsup-v3.firebaseapp.com",
  projectId: "foodsup-v3",
  storageBucket: "foodsup-v3.appspot.com",
  messagingSenderId: "225083575823",
  appId: "1:225083575823:web:b52589a44c38f95a2add7a",
  measurementId: "G-L2PMB3Y3YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#00CCBB"},
  headerTitleStyle: { color: "white" },
  headerTintColor: "white"
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Lets Sign Up",
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "Register",
            }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PreparingOrder"
            component={PreparingOrderScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
