import {React, useState} from 'react';
import { ModifyState, openDatabase } from '../database/dataProcess';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native'; 
import SelectState from './SelectState';

const DetailObject = ({key, navigation, name,state_id, room, category,id, state,furniture, img }) => {
    console.log(id + " " + "id");
    const [newState, setState] = useState("");
    
    async function  ModifyState(id, state_id){
        console.log("test");
        const db = await openDatabase();
        db.transaction((tx) => {
            tx.executeSql("UPDATE object SET id_state = ? WHERE id = ?", [state_id, id ] );
            // Select object table and print it in console
            // tx.executeSql("SELECT object.name, object.id_state as state_id ,object.id as id ,furniture.name as furniture, room.name as room, state.name as state, category.name as category FROM object JOIN furniture ON object.id_furniture = furniture.id JOIN room ON object.id_room = room.id JOIN state ON object.id_state = state.id JOIN category ON object.id_category = category.id", [], (_, {insertID, rows}) => {
            //     console.log(rows._array);
            //     // return rows
            // });

        })
    }

    const setNewState = (newState) => {
        setState(newState);
        ModifyState(id, newState.id);
    }

    return ( 
        <View >
            <Pressable 
            style={styles.container} 
            key={key}
            onPress={() => {
                navigation.navigate("Modifier un Objet", {id: id});
            }}
            
            >
                <View style={styles.description}>
                    <Text style={styles.objets}>
                        {name}
                    </Text>
                    <Text style={styles.pièceTitre}>
                        Pièce
                    </Text>
                    <Text style={styles.pièce}>
                        {category}
                    </Text>
                    <Text style={styles.meubleTitre}>
                        Meuble
                    </Text>
                    <Text style={styles.meuble}>
                        {furniture}
                    </Text>
                    <View style={styles.selectBox}>
                        <SelectState style={styles.state} chosenState={state} setChosenState={setNewState} ></SelectState>
                    </View>
                </View>
                <View style={styles.image}>
                    <Image 
                    style={styles.image} 
                    source={require("../assets/Easter_eggs.png")} 
                    alt="Alternate Text"
                    />
                </View>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginLeft: '5%',
        left: '3%',
        borderRadius: 10,
        marginTop: '10%',
        paddingTop: '10%',
        backgroundColor: '#00FFC2',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
    },
    description: {
        left: '-5%',
    },
    objets: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        top: '-10%',
        paddingBottom: '-2%',
        display: 'flex',
        alignItems: 'center',
        fontSize: 20,
    },
    pièceTitre: {
        fontWeight: 'bold',
        right: 20,
        top: '-5%',
        fontSize: 15,
        color: '#535353',
    },
    pièce: {
        fontWeight: 'bold',
        top: '-5%',
        fontSize: 20,
        right: 20,
        marginBottom: '2%',
    },
    meubleTitre: {
        right: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#535353',
    },
    meuble: {
        fontWeight: 'bold',
        fontSize: 20,
        right: 20,
    },
    image: {
        width: '80%',
        height: '97%',
        top: '-3%',
        marginLeft: '2%',
        borderRadius: 10,
        flex: 1,
        left: '-17%',
    },
    state: {
        right: '-5%',
        top: '-5%',
    },
    selectBox: {
        left: '-15%',
    },
});


export default DetailObject;