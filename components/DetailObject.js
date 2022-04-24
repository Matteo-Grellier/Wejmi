import { React, useState } from "react";
import { openDatabase } from "../database/dataProcess";
import { Text, View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { Box } from "native-base";
import SelectState from "./SelectState";

const DetailObject = ({
  navigation,
  name,
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
    width: "85%",
    borderRadius: 20,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#00FFC2",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    width: Dimensions.get('window').width/2.5,
    marginLeft: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },
  objets: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    paddingBottom: 20,
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: 20,
  },
  subTitles: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#535353",
  },
  descriptions: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get('window').width/2.5,
    height: "85%",
    borderRadius: 10,
    flex: 1,
  },
});

export default DetailObject;
