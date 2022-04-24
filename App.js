import { StyleSheet, Image, Text, View } from "react-native";
import AllObjects from "./screens/AllObjects";
import ModifyObject from "./screens/ModifyObject";
import AddObject from "./screens/AddObject";
import Doge from "./screens/Doge";
import MyHome from "./screens/MyHome";
import BDD from "./screens/BDD";
import Search from "./screens/Search";
import { NativeBaseProvider, IconButton } from "native-base";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "react-native-vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

export default function App() {
  const Header = ({ navigation }) => {
    return (
      <View style={styles.header}>
        <View style={styles.logoHeader}>
          <Image
            source={require("./assets/logo-test.png")}
            style={{ height: 40, width: 40, marginRight: 5 }}
          />
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>WEJMI</Text>
        </View>
        <IconButton
          _icon={{
            as: FontAwesome,
            name: "gear",
          }}
          marginRight="8"
          onPress={() => navigation.navigate("Ma Maison")}
        />
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Mes Objets"
            component={AllObjects}
            options={({ navigation }) => ({
              headerTitle: () => <Header navigation={navigation} />,
              headerStyle: { backgroundColor: "#00FFC2" },
            })}
          />
          <Screen
            name="Modifier un Objet"
            component={ModifyObject}
            options={{ headerStyle: { backgroundColor: "#00FFC2" } }}
          />
          <Screen
            name="Ajouter un Objet"
            component={AddObject}
            options={{ headerStyle: { backgroundColor: "#00FFC2" } }}
          />
          <Screen
            name="Ma Maison"
            component={MyHome}
            options={{ headerStyle: { backgroundColor: "#00FFC2" } }}
          ></Screen>
          <Screen
            name="Doge"
            component={Doge}
            options={{ headerStyle: { backgroundColor: "#00FFC2" } }}
          ></Screen>
          <Screen
            name="bdd"
            component={BDD}
            options={{ headerStyle: { backgroundColor: "#00FFC2" } }}
          ></Screen>
          <Screen name="search" component={Search}></Screen>
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
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
});
