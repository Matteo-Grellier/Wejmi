import { Heading, IconButton, Icon, HStack, Pressable } from "native-base";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState } from "react";
import ItemOption from "./ItemOption";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Input from "./Input";

export default ({ optionTab }) => {
  const [myOptions, setOptions] = useState(["Bureautique", "Makeup"]);

  const [currentOption, setCurrentOption] = useState("");
  const [isShown, setShown] = useState(false);

  const ShowOptions = () => {
    isShown ? setShown(false) : setShown(true);
  };

  let placeholderInput = "";
  switch (optionTab) {
    case "category":
      placeholderInput = "Nouvelle catégorie";
      break;
    case "room":
      placeholderInput = "Nouvelle pièce";
      break;
    case "furniture":
      placeholderInput = "Nouveau meuble";
      break;
  }
  if (optionTab == "Catégories") {
    placeholderInput = "Nouvelle catégorie";
  }
  const Options = (
    <ScrollView marginTop={10}>
      {myOptions.map((option, index) => (
        <ItemOption
          text={option}
          key={index}
          deleteOption={() => {
            myOptions.splice(index, 1);
            setOptions([...myOptions]);
          }}
        ></ItemOption>
      ))}
    </ScrollView>
  );

  const AddOption = () => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO ? (name) VALUES (?);", [optionTab, name]);
      tx.executeSql("SELECT * FROM ?;", [optionTab], { tx, results });
    });
    setOptions([...myOptions, currentOption]);
    setCurrentOption("");
    setShown(true);
  };
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
          {optionTab}
        </Heading>
      </Pressable>
      {isShown === true ? Options : <></>}
      <KeyboardAvoidingView>
        <HStack>
          <Input
            width="80%"
            placeholder={placeholderInput}
            value={currentOption}
            onChangeText={(text) => setCurrentOption(text)}
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
