import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import Home from "./components/screens/Home";
import AddNewHike from "./components/screens/AddHike";
import EditHike from "./components/screens/EditHike";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Add" component={AddNewHike} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Edit" component={EditHike} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     // margin: 20,
//     marginHorizontal: 30,
//     marginVertical: 70,
//   },
// });
