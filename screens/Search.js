import { View, Text } from "react-native";
import { Box, Button, Select } from "native-base";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import * as db from "../database/dataProcess";

export default () => {
  const [searchWord, setSearch] = useState("");
  const [results, setResults] = useState([{ id: 0, name: "" }]);
  const [counter, setCounter] = useState(0);

  const searching = async () => {
    const database = await db.openDatabase();
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT id, name FROM object",
        [],
        (_, { insertID, rows }) => {
          let allObjects = [];
          rows._array.map((i) => {
            const regex = new RegExp(`${searchWord}`, "gmi");
            if (regex.test(i.name) == true) {
              let oneOption = { id: i.id, name: i.name };
              allObjects.push(oneOption);
            }
          });
          setResults(allObjects);
        }
      );
    });
  };
  const Result = (
    <Box>
      {results.map((result, i) => (
        <Text key={i}>{result.name}</Text>
      ))}
    </Box>
  );
  const addObject = async () => {
    const database = await db.openDatabase();
    database.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO object (name, id_room, id_category, id_furniture, id_state) VALUES ('Fond de teint', 1, 1, 3, 3)",
        []
      );
    });
  };
  let [categories, setCategories] = useState([{ id: 0, name: "" }]);
  let [rooms, setRooms] = useState([{ id: 0, name: "" }]);
  let [furnitures, setFurnitures] = useState([{ id: 0, name: "" }]);
  const allOptions = async () => {
    const database = await db.openDatabase();

    database.transaction((tx) => {
      tx.executeSql(
        "SELECT id, name FROM category",
        [],
        (_, { insertID, rows }) => {
          let categories = [];
          rows._array.map((i) => {
            let oneCategory = { id: i.id, name: i.name };
            categories.push(oneCategory);
          });
          setCategories(categories);
        }
      );
      tx.executeSql(
        "SELECT id, name FROM furniture",
        [],
        (_, { insertID, rows }) => {
          let furnitures = [];
          rows._array.map((i) => {
            let oneFurniture = { id: i.id, name: i.name };
            furnitures.push(oneFurniture);
          });
          setFurnitures(furnitures);
        }
      );
      tx.executeSql(
        "SELECT id, name FROM room",
        [],
        (_, { insertID, rows }) => {
          let rooms = [];
          rows._array.map((i) => {
            let oneRoom = { id: i.id, name: i.name };
            rooms.push(oneRoom);
          });
          setRooms(rooms);
        }
      );
    });
  };
  useEffect(async () => {
    allOptions();
  }, []);

  let [selectedRoom, setSelectedRoom] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("");
  let [selectedFurniture, setSelectedFurniture] = useState("");
  let [inputSearch, setInputSearch] = useState("");

  return (
    <View>
      <Select
        selectedValue={selectedCategory}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="CATÉGORIE"
        mt={1}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {categories.map((c, i) => (
          <Select.Item key={i} label={c.name} value={c.id} />
        ))}
      </Select>
      <Select
        selectedValue={selectedRoom}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="PiÈCE"
        mt={1}
        onValueChange={(itemValue) => setSelectedRoom(itemValue)}
      >
        {rooms.map((c, i) => (
          <Select.Item key={i} label={c.name} value={c.id} />
        ))}
      </Select>
      <Select
        selectedValue={selectedFurniture}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Meuble"
        mt={1}
        onValueChange={(itemValue) => setSelectedFurniture(itemValue)}
      >
        {furnitures.map((c, i) => (
          <Select.Item key={i} label={c.name} value={c.id} />
        ))}
      </Select>
      <Input
        width="80%"
        placeholder="Rechercher un objet..."
        value={searchWord}
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
      <Button onPress={searching}>Rechercher</Button>
      {Result}
      {/* <Button onPress={addObject}></Button> */}
    </View>
  );
};
