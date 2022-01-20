import { Home, Like, Research, Result } from "../screens/index";
import { NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import React,{useState} from 'react'


const Stack = createStackNavigator();

export default function Nav() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown : false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Research" component={Research} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Like" component={Like} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

