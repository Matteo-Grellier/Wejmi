import { Button, ScrollView, StatusBar} from "native-base";

import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailObject from "../components/DetailObject";

export default ({ navigation }) => {
	
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
					["Chaussettes", "Bureau", "Buldozer"].map((item, index) => (
						<DetailObject name={item} key={index} navigation={navigation} />
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