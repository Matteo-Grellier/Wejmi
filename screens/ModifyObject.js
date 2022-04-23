import { View, Text, StyleSheet } from "react-native";
import FormObject from "../components/FormObject.js";
import { useState, useEffect } from "react";

export default ({route, navigation}) => {
  const { id } = route.params;
  // id = 2;

  // const [name, setName] = useState("");
  // const [category, setCategory] = useState('');
  // const [room, setRoom] = useState('');
  // const [furniture, setFurniture] = useState('');
  // const [imageUri, setImageUri] = useState('');
  // const [state, setState] = useState('');


  // useEffect(() => {
  //   getCorrespondingData();
  // })

  const getCorrespondingData = () => {
    const temporaryData = [
      {name: 'Ordinateur', category: 'Objets', room: 'Bureau', furniture: 'Tiroir du bureau', imageUri: '', state: 'moved'},
      {name: 'Louis', category: 'Objets', room: 'Chambre', furniture: 'Commode', imageUri: '', state: 'lost'},
      {name: 'Album de Stromae', category: 'Objets', room: 'Bureau', furniture: 'Commode', imageUri: '', state: 'tidy'},
    ];
    console.log(id + " " + "idddddddddddddd");
    // setName(temporaryData[id].name);
    // setCategory(temporaryData[id].category);
    // setRoom(temporaryData[id].room);
    // setFurniture(temporaryData[id].furniture);
    // setImageUri(temporaryData[id].imageUri);
    // setState(temporaryData[id].state);

    // setActualData(temporaryData[id]);
    return temporaryData[2];
  }

  const processData = (newData) => {
    //mettreDansLaBDD();
    setActualData(newData);
    console.log(newData);
    console.log("hello world!")
  }

  const [actualData, setActualData] = useState(getCorrespondingData());


  return (
    <View style={styles.container}>
      <FormObject 
        isCreatingForm={false}
        nameOfObject={actualData.name}
        chosenCategory={actualData.category}
        chosenRoom={actualData.room}
        chosenFurniture={actualData.furniture}
        chosenPhoto={actualData.imageUri}
        state={actualData.state}
        processData={processData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
