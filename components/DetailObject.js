import { React, useState, useEffect } from "react";
import { ModifyState, openDatabase } from "../database/dataProcess";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { Box } from "native-base";
import SelectState from "./SelectState";

const DetailObject = ({
  navigation,
  name,
  state_id,
  room,
  category,
  id,
  furniture,
  img,
  state_name,
}) => {
  const [state, setState] = useState({ name: state_name });

  async function ModifyState(id, state_id) {
    const db = await openDatabase();
    db.transaction((tx) => {
      tx.executeSql("UPDATE object SET id_state = ? WHERE id = ?", [
        state_id,
        id,
      ]);
    });
  }

  const setNewState = (newState) => {
    setState(newState);
    ModifyState(id, newState.id);
  };

  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => {
          navigation.navigate("Modifier un Objet", { id: id });
        }}
      >
        <View style={styles.description}>
          <Text style={styles.objets}>{name}</Text>
          <Box ml={2}>
            <Text style={styles.subTitles}>PIÈCE</Text>
            <Text style={styles.descriptions}>{room}</Text>
            <Text style={styles.subTitles}>MEUBLE</Text>
            <Text style={styles.descriptions}>{furniture}</Text>
            <Text style={styles.subTitles}>CATÉGORIE</Text>
            <Text style={styles.descriptions}>{category}</Text>
          </Box>
          <View style={styles.selectBox}>
            <SelectState
              style={styles.state}
              chosenState={state}
              setChosenState={setNewState}
            ></SelectState>
          </View>
        </View>
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{ uri: img }}
            alt="Alternate Text"
          />
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: "5%",
    left: "3%",
    borderRadius: 10,
    marginTop: "10%",
    paddingTop: "10%",
    backgroundColor: "#00FFC2",
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  description: {
    left: "-5%",
  },
  objets: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    top: "-10%",
    paddingBottom: "-2%",
    display: "flex",
    alignItems: "center",
    fontSize: 20,
  },
  subTitles: {
    fontWeight: "bold",
    right: 20,
    top: "-5%",
    fontSize: 12,
    color: "#535353",
  },
  descriptions: {
    fontWeight: "bold",
    top: "-5%",
    fontSize: 16,
    right: 20,
    marginBottom: "10%",
  },
  image: {
    width: "80%",
    height: "97%",
    top: "-3%",
    marginLeft: "2%",
    borderRadius: 10,
    flex: 1,
    left: "-17%",
  },
  state: {
    right: "-5%",
    top: "-5%",
  },
  selectBox: {
    left: "-15%",
  },
});

export default DetailObject;
