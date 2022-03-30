import { useState } from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import {Button, Alert, Box, Fab, Icon, Select } from 'native-base';
import { AntDesign, MaterialIcons } from "react-native-vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; //Pour une gestion dans les fichiers système de l'application
import * as MediaLibrary from 'expo-media-library'; //Pour une gestion dans les galleries d'image d'un utilisateur.

import SelectItems from "../components/SelectItems.js";
import SelectState from "../components/SelectState.js";
import InputItem from "../components/Input.js";

export default ({isCreatingForm, chosenCategory, chosenRoom, chosenFurniture, chosenPhoto, state}) => {

    const [image, setImage] = useState(null);
    const [inputName, setInputName] = useState('');

    //Donnée "fictive" (en attente de faire fonctionné via les props + BDD)
    const categoryName = "Catégorie";
    const roomName = "Pièce";
    const furnitureName = "Meuble";

    const categoryItems = [
        "Objets", 
        "Makeup", 
        "Papiers"
    ];
    const roomItems = [
        "Chambre",
        "Cuisine",
        "Bureau"
    ];
    const furnituresItems = [
        "Tiroir du bureau",
        "Armoire",
        "Commode"
    ];

    const putCacheImageToDirectory = async (imageURI) => {

        //On demande la permission
        const status = await MediaLibrary.requestPermissionsAsync();
        if (status.granted) {
            try {
                //On créé un "asset" qui permet de récupérer la photo et de la déplacer dans DCIM
                const asset = await MediaLibrary.createAssetAsync(imageURI);

                //On créé un album (sauf s'il existe déjà : il déplacera seulement l'asset précédemment créé) et déplace l'asset dans l'album Wejmi
                let album = await MediaLibrary.createAlbumAsync('Wejmi', asset, false);

                //S'il n'y a pas eu d'erreur alors
                if(album != null) {
                    console.log('File Saved Successfully!');
                    let assetsInWejmi = await MediaLibrary.getAssetsAsync({album: album}); //On récupère tous les assets de l'album (en effet, l'asset créé ne correspond pas à celui dans l'album Wejmi)
                    let actualAsset = assetsInWejmi.assets[assetsInWejmi.assets.length - 1]; //On récupère le dernier élément de l'album (le plus récent)
                    return actualAsset.uri; //on retourne l'actuel URI.
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Need Storage permission to save file');
        }
    }

    //Prendre une image depuis les fichiers du téléphone
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri); //Modifie l'URI défini dans la variable image (useState...)
        }
    };

    //Prendre une image avec l'appareil photo
    const pickCameraImage = async () => {
        
        const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
        const statusMediaLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(statusCamera.granted && statusMediaLibrary.granted) {
            let data =  await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:1
            })
            if(!data.cancelled){
                let newURI = await putCacheImageToDirectory(data.uri);
                setImage(newURI); //Modifie l'URI défini dans la variable image (useState...)
            }
        } else {
            Alert.alert("Wejmi a besoin des droits pour ajouter une image");
        }
    }

    const displayingState = () => {
        if (isCreatingForm) {
            return;
        } else {
            return (<SelectState chosenState="Rangé"/>);
        }
    }

    return (
        <View style={styles.container}>

            <InputItem width={200} value={inputName} placeholder={"Nom"} 
            onChangeText={(newName) => setInputName(newName)}
            />
            {
                displayingState()
            }            
            <SelectItems style={styles.selectItems} listName={categoryName} items={categoryItems}/>
            <SelectItems style={styles.selectItems} listName={roomName} items={roomItems}/>
            <SelectItems style={styles.selectItems} listName={furnitureName} items={furnituresItems}/>
            <Box style={styles.imageBox}>
                <Fab style={styles.fabButton} renderInPortal={false} shadow={5} placement={"bottom-left"} bottom={70} left={20} size="sm" 
                icon={<Icon color="black" as={MaterialIcons} name="photo-camera" size="sm" />} 
                onPress={pickCameraImage}
                />
                <Fab style={styles.fabButton} renderInPortal={false} shadow={5} bottom={70} right={20} size="sm" 
                icon={<Icon color="black" as={MaterialIcons} name="photo-library" size="sm" />} 
                onPress={pickImage}
                />
                <Image source={{ uri: image }} style={{ height: 200, borderRadius: 20 }} />
            </Box>
            <Button style={styles.validateButton} borderRadius="20"><Text style={styles.text}>Valider +</Text></Button>
        </View>
    )
}

const colors = {
    mainGreenColor: "#00FFC2",
    darkGreenColor: "#2B9C81",
    mainGreyColor: "#F3F3F3",
    darkGreyColor: "#9C9C9C"

};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    selectItems: {
        margin: 50,
    },
    imageBox: {
        borderRadius: 20,
        borderColor: colors.mainGreenColor,
        borderWidth: 2,
        justifyContent: "space-around",
        margin: 10,
        width: 350,
    },
    validateButton: {
        backgroundColor: colors.mainGreenColor,
        width: 100,
        margin: 10,       
    },
    fabButton: {
        backgroundColor: colors.mainGreenColor,
    },
    text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18,
    }

});