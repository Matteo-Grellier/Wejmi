import { openDatabase, GetAllObject, AddObject, ModifyObject, DeleteObject, GetAllCategory, AddCategory, DeleteCategory, GetAllRoom, AddRoom, DeleteRoom, GetAllFurniture, AddFurniture, DeleteFurniture } from "../database/dataProcess.js";
import { Image } from "native-base";
import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";


export default () => {
    const [texty, setTexty] = useState("data yeager ! data yeager ! na nana, data yeager. data yeager ! data yeager ! na nana nanana NA NA NA !");

    const [actualData, setActualData] = useState([]);

    // useEffect(async () => {
    //     await GetAllObject(setActualData);
    // });

    const DataYe = async () => {
        // console.log("bouton");

        // DeleteFurniture(4);

        // const bob = GetAllFurniture();
        
        // const test = await GetAllObject();

        await GetAllObject(setActualData);

        console.log(actualData);
    };

    return (
        <View>
            <Text>BDD</Text>
            <Button title="DATA YEAGER !" onPress={ DataYe } />
            <Text>{texty}</Text>
            {
                actualData.map((value, index) =>(
                    <Text key={index}>{value.name}</Text>
                ))
            }
            
        </View>
    );

};

