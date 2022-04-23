import { View, Text, StyleSheet } from "react-native";
import { Skeleton, Spinner } from "native-base";
import FormObject from "../components/FormObject.js";
import { useState, useEffect } from "react";
import {GetObject, GetCategory, GetFurniture, GetRoom, ModifyObject} from "../database/dataProcess"


export default ({route, navigation}) => {
  const { id } = route.params;
  console.log(id + "IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  // id = 2;

// export default ({id}) => {

//   id = 2;

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
    // console.log(data)
    // let objectData = {name: "", category: {id: null, name: ""}, room: {id: null, name: ""}, furniture: {id: null, name: ""}, image_uri: "", state: {id: null, name: ""} }
    
    if(data.length > 0) {
      setName(data[0].name);
      setImageUri(data[0].photo_uri);
      setCategory({id: data[0].id_category, name: data[0].category_name});
      setRoom({id: data[0].id_room, name: data[0].room_name});
      setFurniture({id: data[0].id_furniture, name: data[0].furniture_name});
      setState({id: data[0].id_state, name: data[0].state_name});

      setIsLoaded(true);
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
