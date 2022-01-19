import { Home, Like, Research, Result } from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React,{useState} from 'react'
import {View ,Text,Alert,Button , Modal, StyleSheet} from 'react-native'

const Stack = createStackNavigator();

export default function Nav() {

  

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          
        }}
      >
        <Stack.Screen name="Home" component={Home} 
        options={{headerShown :false}}
          // options={({ navigation }) =>({
          //   title : "Home",
          //   headerLeft :() =>(
          //     <Button title="ad" onPress={()=>{navigation.navigate({isState : true})}}/>
          //   )
          // })}
        
        />
        <Stack.Screen name="Research" component={Research} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Like" component={Like} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({

})