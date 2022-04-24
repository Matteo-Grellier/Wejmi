import {
  GetAllObject,
  GetAllRoom,
  GetAllFurniture,
  GetAllCategory,
} from "../database/dataProcess.js";
import Input from "../components/Input";
import Select from "../components/utils/Select";
import {
  Button,
  ScrollView,
  StatusBar,
  Box,
  Spinner,
  Fab,
  Icon,
  Text,
  IconButton,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { React, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailObject from "../components/DetailObject";

export default ({ navigation }) => {
  const [object, setObject] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchWord, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    GetAllCategory(setCategoriesData);
    GetAllRoom(setRoomsData);
    GetAllFurniture(setFurnituresData);
    GetAllObject(setAllObjects);
  }, [results]);

  const setAllObjects = (data) => {
    setObject(data);
    setResults(data);
    setIsLoaded(true);
  };

  const [categoryItems, setCategoryItems] = useState([]);
  const [roomItems, setRoomItems] = useState([]);
  const [furnituresItems, setFurnitureItems] = useState([]);

  const [actualCategory, setActualCategory] = useState({
    id: -1,
    name: "Catégories",
  });
  const [actualRoom, setActualRoom] = useState({ id: -1, name: "Pièces" });
  const [actualFurniture, setActualFurniture] = useState({
    id: -1,
    name: "Meubles",
  });

  const setCategoriesData = (data) => {
    setCategoryItems([
      ...data,
      {
        id: -1,
        name: "Toutes les catégories",
      },
    ]);
  };
  const setRoomsData = (data) => {
    setRoomItems([
      ...data,
      {
        id: -1,
        name: "Toutes les pièces",
      },
    ]);
  };
  const setFurnituresData = (data) => {
    setFurnitureItems([
      ...data,
      {
        id: -1,
        name: "Tous les meubles",
      },
    ]);
  };
  const searching = () => {
    let allObjects = object;

    const resultCategories = allObjects.filter((object) => {
      if (actualCategory.id == -1 || actualCategory.id == object.id_category) {
        return object;
      }
    });
    const resultRooms = resultCategories.filter((object) => {
      if (actualRoom.id == -1 || actualRoom.id == object.id_room) {
        return object;
      }
    });
    const resultFurnitures = resultRooms.filter((object) => {
      if (
        actualFurniture.id == -1 ||
        actualFurniture.id == object.id_furniture
      ) {
        return object;
      }
    });
    const result = resultFurnitures.filter((object) => {
      const regex = new RegExp(`${searchWord}`, "gmi");
      if (regex.test(object.name) == true) {
        return object;
      }
    });
    setResults(result);
  };

  const loadingSpinner = <Spinner flex="1" size="lg" />;

  const allObjectsElements = (
    <ScrollView style={styles.scrollView}>
      {results.map((value, index) => (
        <DetailObject
          key={index}
          navigation={navigation}
          id={value.id}
          name={value.name}
          room={value.room_name}
          state_id={value.state_id}
          category={value.category_name}
          state_name={value.state_name}
          furniture={value.furniture_name}
          img={value.photo_uri}
        ></DetailObject>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Box flexDirection="row">
          <Input
            mt={3}
            width="80%"
            placeholder="Rechercher un objet..."
            value={searchWord}
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
          {/* Grosse latence lorsqu'on clique dessus */}
          <IconButton
            onPress={searching}
            icon={<Icon as={AntDesign} name="search1" />}
            borderRadius="full"
            bg="#00FFC2"
            _icon={{
              color: "black",
              size: "md",
            }}
            _pressed={{
              bg: "black",
              _icon: {
                name: "search1",
                color: "#00FFC2",
              },
            }}
          />
        </Box>
        <Box flexDirection="row" justifyContent="space-between" mb={3}>
          <Select
            placeholder={"Catégories"}
            selectedValue={actualCategory.id}
            accessibilityLabel={actualCategory.name}
            setChosenValue={setActualCategory}
            items={categoryItems}
            width="120"
            fontSize="10"
          />
          <Select
            placeholder={"Pièces"}
            selectedValue={actualRoom.id}
            accessibilityLabel={actualRoom.name}
            setChosenValue={setActualRoom}
            items={roomItems}
            width="120"
            fontSize="10"
          />
          <Select
            placeholder={"Meubles"}
            selectedValue={actualFurniture.id}
            accessibilityLabel={actualFurniture.name}
            setChosenValue={setActualFurniture}
            items={furnituresItems}
            width="120"
            fontSize="10"
          />
        </Box>
        {/* À supprimer quand l'icone de recherche fonctionnera */}
        <Button
          style={styles.validateButton}
          borderRadius="20"
          onPress={searching}
        >
          <Text style={styles.text}>Rechercher</Text>
        </Button>
      </View>
      <Fab
        bottom={30}
        right={5}
        bg="#00FFC2"
        renderInPortal={false}
        icon={<Icon color="black" as={AntDesign} name="plus" size="sm" />}
        onPress={() => {
          navigation.navigate("Ajouter un Objet");
        }}
      />

      {isLoaded ? allObjectsElements : loadingSpinner}
    </SafeAreaView>
  );
};
const colors = {
  mainGreenColor: "#00FFC2",
  darkGreenColor: "#2B9C81",
  mainGreyColor: "#F3F3F3",
  darkGreyColor: "#9C9C9C",
  darkRedColor: "#FF5C5C",
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
  validateButton: {
    backgroundColor: colors.mainGreenColor,
    width: 130,
    margin: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
});
