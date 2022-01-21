import { Home, Like, Research, Result } from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";

const Stack = createStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTintColor: "#000",
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Research" component={Research} />
        <Stack.Screen
          name="Result"
          component={Result}
          options={({ navigation }) => ({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            statusbar: { visiable: false },
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Like");
                  }}
                  style={styles.box}
                >
                  <Image
                    source={require("../../assets/heart.png")}
                    style={styles.logo}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                  style={styles.box1}
                >
                  <Image
                    source={require("../../assets/house.png")}
                    style={styles.logo1}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen name="Like" component={Like} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  box: { justifyContent: "center", padding: "5%" },

  logo: {
    width: Dimensions.get("window").width * 0.06,
    height: Dimensions.get("window").width * 0.06,
    resizeMode: "contain",
  },

  box1: { marginRight: 10, justifyContent: "center", padding: "5%" },

  logo1: {
    width: Dimensions.get("window").width * 0.06,
    height: Dimensions.get("window").width * 0.06,
    resizeMode: "contain",
  },
});
