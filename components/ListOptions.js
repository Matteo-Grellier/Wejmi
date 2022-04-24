import { Heading, IconButton, Icon, HStack, Pressable } from "native-base";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import ItemOption from "./ItemOption";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Input from "./Input";
import * as db from "../database/dataProcess";

export default ({ optionTab }) => {
  //useStates pour : toutes les options, une nouvelle option, montrer les options
  const [allOptions, setOptions] = useState([{ id: 0, name: "" }]);
  const [newOption, setNewOption] = useState("");
  const [isShown, setShown] = useState(false);

  //Mise à jour des options avec un useEffect
  useEffect(async () => {
    switch (optionTab) {
      case "category":
        db.GetAllCategory(setOptionsData);
        break;
      case "room":
        db.GetAllRoom(setOptionsData);
        break;
      case "furniture":
        db.GetAllFurniture(setOptionsData);
        break;
    }
  }, [allOptions]);

  const setOptionsData = (data) => {
    let results = [];
    if (data.length > 0) {
      data.map((item) => {
        let oneOption = { id: item.id, name: item.name };
        results.push(oneOption);
      });
    }
    setOptions(results);
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
    if (!foundOne && newOption !== "") {
      switch (optionTab) {
        case "category":
          db.AddCategory(newOption);
          break;
        case "room":
          db.AddRoom(newOption);
          break;
        case "furniture":
          db.AddFurniture(newOption);
          break;
      }
      setNewOption("");
    } else if (newOption == "") {
      alert("Veuillez entrer une option");
    }
    setShown(true);
  };

  //Suppression d'une option
  const deleteOneOption = async (id) => {
    switch (optionTab) {
      case "category":
        db.DeleteCategory(id);
        break;
      case "room":
        db.DeleteRoom(id);
        break;
      case "furniture":
        db.DeleteFurniture(id);
        break;
    }
  };

  const ShowOptions = () => {
    isShown ? setShown(false) : setShown(true);
  };

  //Composant qui affiche les options
  const Options = (
    <ScrollView marginTop={10}>
      {allOptions.map((option, index) => (
        <ItemOption
          text={option.name}
          key={index}
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
        p={2}
        onPress={ShowOptions}
        _pressed={{
          bg: "#00FFC2",
        }}
        flexDirection="row"
        alignItems="center"
      >
        <Icon
          as={MaterialIcons}
          name={
            isShown === false ? "keyboard-arrow-right" : "keyboard-arrow-down"
          }
          alignItems="center"
          justifyContent="center"
        />
        <Heading>{title}</Heading>
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
