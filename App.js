import { StyleSheet } from "react-native";
import AllObjects from "./screens/AllObjects";
import ModifyObject from "./screens/ModifyObject";
import AddObject from "./screens/AddObject";
import Doge from "./screens/Doge";
import MyHome from "./screens/MyHome";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name="Mes Objets" component={AllObjects} />
          <Screen name="Modifier un Objet" component={ModifyObject} />
          <Screen name="Ajouter un Objet" component={AddObject} />
          <Screen name="Ma Maison" component={MyHome}></Screen>
          <Screen name="Doge" component={Doge}></Screen>
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
