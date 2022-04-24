import { View, Text, StyleSheet } from "react-native";
import SelectItems from "../components/SelectItems.js";
import FormObject from "../components/FormObject.js";

import { AddObject } from "../database/dataProcess";

export default ({ navigation }) => {
  const category = { id: null, name: null };
  const room = { id: null, name: null };
  const furniture = { id: null, name: null };
  const state = { id: null, name: null };

  const processData = (newData) => {
    AddObject(
      newData.name,
      newData.roomID,
      newData.categoryID,
      newData.furnitureID,
      newData.imageUri
    );
  };

  const formObject = (
    <FormObject
      isCreatingForm={true}
      nameOfObject={null}
      chosenCategory={category}
      chosenRoom={room}
      chosenFurniture={furniture}
      chosenPhoto={null}
      state={state}
      processData={processData}
      navigation={navigation}
    />
  );

  return <View style={styles.container}>{formObject}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
