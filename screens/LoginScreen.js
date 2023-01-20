import React, { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        navigation.replace('Home');
      }
    })
    
    return unsubscribe;
  }, [])

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 items-center justify-center p-10 bg-white">
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://links.papareact.com/wru",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input 
            placeholder="Password" 
            secureTextEntry 
            type="password" 
            value={password}
            onChangeText={text => setPassword(text)}
        />
      </View>

      <Button className="text-[#00CCBB]" containerStyle={styles.button} onPress={() => {navigation.navigate('Home')}} title="Login" />
      <Button containerStyle={styles.button} onPress={() => {navigation.navigate('Register')}} type="outline" title="Register" />
      <View style={{height: 100}} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  }
});
