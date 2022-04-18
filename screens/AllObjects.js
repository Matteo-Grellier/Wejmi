import { GetAllObject, AddObject, ModifyObject, DeleteObject, GetAllCategory, AddCategory, DeleteCategory, GetAllRoom, AddRoom, DeleteRoom, GetAllFurniture, AddFurniture, DeleteFurniture } from "../database/dataProcess.js";
import { Button, ScrollView, StatusBar} from "native-base";
import  openDatabase  from "../database/dataProcess.js";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailObject from "../components/DetailObject";
const { useState } = React;

var data = {}

export default ({ navigation }) => {
	const [arrays, setArrays] = useState([]);
	const [object, setObject] = useState([]);
	const [room, setRoom] = useState([]);
	const [state, setState] = useState([]);

	const DataYe = async () => {
        await GetAllObject(setObject);
		setArrays(arrays => [...arrays, ...object]);
		await GetAllRoom(setRoom);
		setArrays(arrays => [...arrays, ...room]);
		// await GetAllRoom(setRoom);
		// await GetAllObject(setObject);

		console.log(arrays);
		// console.log(room);
    };

	const wipe = async () => {
		setArrays([]);



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
			>AllObjects</Button>
			<Button
			onPress={() => {
				wipe();
			}}
			>Wipe</Button>

			<ScrollView style={styles.scrollView}>
				{
					arrays.map((value, index) => (
						<DetailObject
								name={value.objectName}
								key={index}
								// room={value[objectValue.objectName]}	
						></DetailObject>
							

						
					))
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
