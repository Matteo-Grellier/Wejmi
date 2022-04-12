import { Button, ScrollView, StatusBar} from "native-base";
import  openDatabase  from "../database/dataProcess.js";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailObject from "../components/DetailObject";
const { useState } = React;

export default ({ navigation }) => {
	const [object, setObject] = useState([]);
	const [room, setRoom] = useState([]);
	const [state, setState] = useState([]);

	const DataYe = async () => {
        console.log("bouton");
        const db = await openDatabase();
		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM room",[], (_, {insertID, rows}) => {
				// retrieve array of all object
				rows._array;
				setRoom(rows._array);
				console.log(room);
			});
		});
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM object",[], (_, {insertID, rows}) => {
                // retrieve array of all object
                rows._array;
				setObject(rows._array);
				console.log(object);
            });
        });
		
		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM state",[], (_, {insertID, rows}) => {
				// retrieve array of all object
				rows._array;
				setState(rows._array);
				console.log(state);
			});
		});
    };






	return (
		<SafeAreaView style={styles.container}>
			<Text>Liste des objets</Text>
			<Button
			onPress={() => {
				navigation.navigate("Modifier un Objet");
			}}
			>
				Modifier X Objet
			</Button>
			<Button
			onPress={() => {
				navigation.navigate("Ajouter un Objet");
			}}
			>
				Ajouter un Objet
			</Button>
			<Button
			onPress={() => {
				navigation.navigate("Ma Maison");
			}}
			>
				Ma Maison
			</Button>
			<Button
			onPress={() => {
				navigation.navigate("Doge");
			}}
			>
				DOGE
			</Button>
			<Button
			onPress={() => {
				DataYe();
			}}
			></Button>

			<ScrollView style={styles.scrollView}>
				{
					
					object.map((item, index) => {
						return (
							<DetailObject
								key={index}
								navigation={navigation}
								name={item.name}
								room={item.room}
								state={state[item.state_id]}
							/>
						);
					})
				}
			</ScrollView>
		</SafeAreaView>
		);
	};
	

	const styles = StyleSheet.create({
		scrollView: {
			marginHorizontal: 20,
			left: '3%',
			flexGrow: 1,
		},
		container: {
			flex: 1,
			paddingTop: StatusBar.currentHeight,
		},
	});
