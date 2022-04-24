import { View, Text } from "react-native";
import { Box, Button } from "native-base";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import * as db from "../database/dataProcess";
import Select from "../components/utils/Select";

export default () => {
  const [searchWord, setSearch] = useState("");
  const [objects, setObjects] = useState([]);
  const [results, setResults] = useState([]);

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

  useEffect(async () => {
    db.GetAllCategory(setCategoriesData);
    db.GetAllRoom(setRoomsData);
    db.GetAllFurniture(setFurnituresData);
    // db.GetAllObject(setObjects);

    // setResults(objects);
  }, []);
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
    let allObjects = objects;

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

  // const Result = (
  //   <Box>
  //     {results.map((result, i) => (
  //       <Box key={i + result.name}>
  //         <Text>{result.name}</Text>
  //         <Text>{result.category_name}</Text>
  //       </Box>
  //     ))}
  //   </Box>
  // );

  return (
    <View>
      <Input
        mt={3}
        width="80%"
        placeholder="Rechercher un objet..."
        value={searchWord}
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
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

      <Button onPress={searching}>Rechercher</Button>
      {/* {Result} */}
    </View>
  );
};
