import { GetObject } from "../database/dataProcess.js";
import { Image } from "native-base";
import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

export default () => {
  const [texty, setTexty] = useState(
    "data yeager ! data yeager ! na nana, data yeager. data yeager ! data yeager ! na nana nanana NA NA NA !"
  );

  const [actualData, setActualData] = useState([]);

  const DataYe = async () => {
    await GetObject(1, setActualData);
  };

  return (
    <View>
      <Text>BDD</Text>
      <Button title="DATA YEAGER !" onPress={DataYe} />
      <Text>{texty}</Text>
      {actualData.map((value, index) => (
        <View key={index}>
          <Text>{value.name}</Text>
          <Text>{value.id_furniture}</Text>
          <Text>{value.furniture_name}</Text>
        </View>
      ))}
    </View>
  );
};
