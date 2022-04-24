import { GetAllObject } from "../database/dataProcess.js";
import { Button, ScrollView, StatusBar, Spinner } from "native-base";
import openDatabase from "../database/dataProcess.js";
import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailObject from "../components/DetailObject";

export default ({ navigation }) => {
  const [object, setObject] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    GetAllObject(setAllObjects);
    console.log("hello")
  }, []);

  const setAllObjects = (data) => {
    setObject(data);
    setIsLoaded(true);
  }

  const loadingSpinner = <Spinner flex="1" size="lg" />;

  const allObjectsElements = (
      <ScrollView style={styles.scrollView}>
      {object.map((value, index) => (
        <DetailObject
          key={index}
          navigation={navigation}
          id={value.id}
          name={value.name}
          room={value.room_name}
          state_id={value.state_id}
          category={value.category_name}
          state={value.state_name}
          furniture={value.furniture_name}
          img={value.photo_uri}
        ></DetailObject>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
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

        { (isLoaded) ?  allObjectsElements : loadingSpinner }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    left: "3%",
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
