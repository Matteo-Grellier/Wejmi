import { Select, CheckIcon, Box, Icon } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign, MaterialIcons } from "react-native-vector-icons";
import { useState, useEffect } from "react";

import { GetAllState } from "../database/dataProcess";

export default ({ chosenState, setChosenState }) => {
  const [statesList, setStatesList] = useState([]);

  useEffect(() => {
    GetAllState(setStatesList);
    chosenState.name = changeStateToFrench(chosenState.name);
  }, []);

  const changeStateToFrench = (stateName) => {
    if (stateName == "tidy") {
      return "Rangé";
    } else if (stateName == "lost") {
      return "Perdu";
    } else if (stateName == "moved") {
      return "Déplacé";
    }
  };

  const displayingIconState = () => {
    if (chosenState.name == "tidy" || chosenState.name == "Rangé") {
      return (
        <Icon
          color={colors.darkGreenColor}
          as={AntDesign}
          name="checkcircle"
          size="5"
          marginLeft="3"
        />
      );
    } else if (chosenState.name == "lost" || chosenState.name == "Perdu") {
      return (
        <Icon
          color={"#F08449"}
          as={MaterialIcons}
          name="warning"
          size="5"
          marginLeft="3"
        />
      );
    } else if (chosenState.name == "moved" || chosenState.name == "Déplacé") {
      return (
        <Icon
          color={colors.darkGreenColor}
          as={AntDesign}
          name="clockcircle"
          size="5"
          marginLeft="3"
        />
      );
    }
  };

  const changeActualState = (itemID) => {
    let newActualState = statesList.find((state) => state.id === itemID);
    setChosenState(newActualState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Etat</Text>
      <Box style={styles.boxSelect}>
        {displayingIconState()}
        <Select
          fontSize={14}
          borderWidth={0}
          color={"black"}
          paddingTop="-1"
          minWidth="70"
          maxHeight="10"
          selectedValue={chosenState.id}
          accessibilityLabel={chosenState.name}
          placeholder={chosenState.name}
          _selectedItem={{
            bg: "#00FFC2",
            endIcon: <CheckIcon size="3" />,
          }}
          mt={1}
          onValueChange={(stateID) => changeActualState(stateID)}
        >
          {statesList.map((state, index) => (
            <Select.Item
              key={index}
              label={changeStateToFrench(state.name)}
              value={state.id}
            />
          ))}
        </Select>
      </Box>
    </View>
  );
};

const colors = {
  mainGreenColor: "#00FFC2",
  darkGreenColor: "#2B9C81",
  mainGreyColor: "#F3F3F3",
  darkGreyColor: "#9C9C9C",
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  boxSelect: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.mainGreenColor,
    borderWidth: 2,
    borderRadius: 40,
    maxHeight: 40,
  },
  text: {
    marginLeft: 10,
  },
});
