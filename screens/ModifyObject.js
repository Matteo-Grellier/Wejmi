import { View, Text, StyleSheet } from "react-native";
import { Skeleton, Spinner } from "native-base";
import FormObject from "../components/FormObject.js";
import { useState, useEffect } from "react";

import {GetObject, GetCategory, GetFurniture, GetRoom, ModifyObject} from "../database/dataProcess"

export default ({id}) => {

  id = 1;

  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [room, setRoom] = useState(null);
  const [furniture, setFurniture] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [state, setState] = useState('tidy');
  const [isLoaded, setIsLoaded] = useState(false);
  // const [actualData, setActualData] = useState({});


  useEffect(() => {
    GetObject(id, setObjectData); //Récupérer l'objet qui correspond à l'objet sur lequel l'utilisateur a cliqué
  }, [])

  const setObjectData = (data) => {
    console.log(data)
    // let objectData = {name: "", category: {id: null, name: ""}, room: {id: null, name: ""}, furniture: {id: null, name: ""}, image_uri: "", state: {id: null, name: ""} }

    setName(data[0].name);
    setImageUri(data[0].photo_uri);
    
    if(data.length > 0) {
      // setActualData(data[0]); //On défini l'objet actuelle par le seul objet du tableau.
      GetCategory(data[0].id_category, (categoryData) => {
        if(categoryData.length > 0) {
          setCategory(categoryData[0]);
        } 
      });
      GetRoom(data[0].id_room, (roomData) => {
        if(roomData.length > 0) {
          setRoom(roomData[0]);
        } 
      });
      GetFurniture(data[0].id_furniture, (furnitureData) => {
        if(furnitureData.length > 0) {
          setFurniture(furnitureData[0]);
        } 
        setIsLoaded(true);
      });

      // setActualData(objectData);
      // console.log("actual : ");
      // console.log(actualData);
    }
  }

  const processData = (newData) => {
    //mettreDansLaBDD();
    // setActualData(newData);
    console.log(newData);
    console.log("hello world!")
    ModifyObject(id, newData.name, newData.roomID, newData.categoryID, newData.furnitureID, newData.stateID, newData.imageUri);
  }

  const formObject = (<FormObject 
  isCreatingForm={false}
  nameOfObject={name}
  chosenCategory={category}
  chosenRoom={room}
  chosenFurniture={furniture}
  chosenPhoto={imageUri}
  state={state}
  processData={processData}
  />)

  const loadingSkeleton = (
  <Skeleton flex="1">

  </Skeleton>
  );

  const loadingSpinner = (
    <Spinner flex="1" size="lg" />
  )


  return (
    <View style={styles.container}>
      {(isLoaded) ? formObject : loadingSpinner}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
