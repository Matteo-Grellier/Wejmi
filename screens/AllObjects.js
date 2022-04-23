import { GetObject,GetAllObject, AddObject, ModifyObject, DeleteObject, GetAllCategory, AddCategory, DeleteCategory, GetAllRoom, AddRoom, DeleteRoom, GetAllFurniture, AddFurniture, DeleteFurniture } from "../database/dataProcess.js";
import { Button, ScrollView, StatusBar} from "native-base";
import  openDatabase  from "../database/dataProcess.js";
import {React, useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailObject from "../components/DetailObject";

export default ({ navigation }) => {
	const [object, setObject] = useState([]);

	const DataYe = async () => {
		await GetObject(setObject);
    };

	useEffect(() => {
		DataYe();
	}, []);



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

			<ScrollView style={styles.scrollView}>
				{
					object.map((value, index) => (
						<DetailObject
								key={index}
								navigation={navigation}
								id={value.id}
								name={value.name}
								room={value.room}
								state_id={value.state_id}
								category={value.category}
								state={value.state}
								furniture={value.furniture}
								img={value.photo_uri} 
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
