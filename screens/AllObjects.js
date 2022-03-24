import { Button } from "native-base";
import { View, Text } from "react-native";

export default ({ navigation }) => {
  return (
    <View>
      <Text>Liste des objets</Text>
      <Button
        onPress={() => {
          navigation.navigate("Modifier un Objet");
        }}
      >
        Modifier X Objet
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Ajouter un Objet");
        }}
      >
        Ajouter un Objet
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Ma Maison");
        }}
      >
        Ma Maison
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Doge");
        }}
      >
        DOGE
      </Button>
    </View>
  );
};
