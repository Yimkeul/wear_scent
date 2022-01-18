import { Home, Like, Research, Result } from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Research" component={Research} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Like" component={Like} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
