import { Heading, IconButton, Icon, HStack, Pressable } from "native-base";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import ItemOption from "./ItemOption";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Input from "./Input";
import * as db from "../database/dataProcess";

export default ({ optionTab }) => {
  //Récupération des données
  const allData = async () => {
    const database = await db.openDatabase();
    const request = "SELECT id, name FROM " + optionTab;
    database.transaction((tx) => {
      tx.executeSql(request, [], (_, { insertID, rows }) => {
        let results = [];
        rows._array.map((i) => {
          let oneOption = { id: i.id, name: i.name };
          results.push(oneOption);
        });
        setOptions(results);
      });
    });
  };

  //useStates pour : toutes les options, une nouvelle option, montrer les options
  const [allOptions, setOptions] = useState([{ id: 0, name: "" }]);
  const [newOption, setNewOption] = useState("");
  const [isShown, setShown] = useState(false);

  //Mise à jour des options avec un useEffect
  useEffect(async () => {
    allData();
  }, [allOptions]);
  const ShowOptions = () => {
    isShown ? setShown(false) : setShown(true);
  };

  //Affichage des titres des options (catégories | meubles | pièces)
  let placeholderInput = "";
  let title = "";
  switch (optionTab) {
    case "category":
      title = "Catégories";
      placeholderInput = "Nouvelle catégorie";
      break;
    case "room":
      title = "Pièces";
      placeholderInput = "Nouvelle pièce";
      break;
    case "furniture":
      title = "Meubles";
      placeholderInput = "Nouveau meuble";
      break;
  }
  // Ajout d'une option
  const AddOption = async () => {
    let foundOne = false;
    allOptions.map((option) => {
      if (option.name === newOption) {
        alert("Cette option existe déjà");
        foundOne = true;
      }
    });
    if (!foundOne) {
      const database = await db.openDatabase();
      database.transaction((tx) => {
        switch (optionTab) {
          case "category":
            tx.executeSql("INSERT INTO category (name) VALUES (?);", [
              newOption,
            ]);
            break;
          case "room":
            tx.executeSql("INSERT INTO room (name) VALUES (?);", [newOption]);
            break;
          case "furniture":
            tx.executeSql("INSERT INTO furniture (name) VALUES (?);", [
              newOption,
            ]);
            break;
        }

        allData();
      });
      setNewOption("");
    }
    setShown(true);
  };

  //Suppression d'une option
  const deleteOneOption = async (id) => {
    const database = await db.openDatabase();

    database.transaction((tx) => {
      switch (optionTab) {
        case "category":
          tx.executeSql("DELETE FROM category WHERE id = ?", [id]);
          break;
        case "room":
          tx.executeSql("DELETE FROM room WHERE id = ?", [id]);
          break;
        case "furniture":
          tx.executeSql("DELETE FROM furniture WHERE id = ?", [id]);
          break;
      }
    });
    allData();
  };

  //Composant qui affiche les options
  const Options = (
    <ScrollView marginTop={10}>
      {allOptions.map((option) => (
        <ItemOption
          text={option.name}
          key={option.id}
          deleteOption={() => {
            deleteOneOption(option.id);
          }}
        ></ItemOption>
      ))}
    </ScrollView>
  );

  return (
    <View>
      <Pressable
        onPress={ShowOptions}
        _pressed={{
          bg: "orange.600:alpha.20",
        }}
      >
        <Heading>
          <Icon
            as={MaterialIcons}
            name={
              isShown === false ? "keyboard-arrow-right" : "keyboard-arrow-down"
            }
            alignItems="center"
            justifyContent="center"
            top="96"
          />
          {title}
        </Heading>
      </Pressable>
      {isShown === true ? Options : <></>}
      <KeyboardAvoidingView>
        <HStack>
          <Input
            width="80%"
            placeholder={placeholderInput}
            value={newOption}
            onChangeText={(text) => setNewOption(text)}
          />
          <IconButton
            onPress={AddOption}
            icon={<Icon as={AntDesign} name="plus" />}
            borderRadius="full"
            bg="#00FFC2"
            _icon={{
              color: "black",
              size: "md",
            }}
            _pressed={{
              bg: "black",
              _icon: {
                name: "plus",
                color: "#00FFC2",
              },
            }}
          />
        </HStack>
      </KeyboardAvoidingView>
    </View>
  );
};
