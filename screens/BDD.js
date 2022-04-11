import  openDatabase  from "../database/dataProcess.js";
import { Image } from "native-base";
import { useState } from "react";
import { View, Text, Button } from "react-native";


export default () => {
    const [texty, setTexty] = useState("data yeager ! data yeager ! na nana, data yeager. data yeager ! data yeager ! na nana nanana NA NA NA !");

    const DataYe = async () => {
        console.log("bouton");
        const db = await openDatabase();
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM category",[], (_, {insertID, rows}) => {
                console.log(rows);
            });
        })
    };

    return (
        <View>
            <Text>BDD</Text>
            <Button title="DATA YEAGER !" onPress={ DataYe } />
            <Text>{texty}</Text>
        </View>
    );

};

