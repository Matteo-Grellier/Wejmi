import { useState } from 'react';
import { View, Text, Image, Button, Alert } from "react-native";
import SelectItems from "../components/SelectItems.js";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; //Pour une gestion dans les fichiers système de l'application
import * as MediaLibrary from 'expo-media-library'; //Pour une gestion dans les galleries d'image d'un utilisateur.

export default () => {

    const [image, setImage] = useState(null);

    //Donnée "fictive" (en attente de faire fonctionné via les props + BDD)
    const categoryName = "Categorie";
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

    // const dirURI = FileSystem.documentDirectory + "Images/Wejmi/";
    const dirURI = FileSystem.documentDirectory;

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
                quality:0.5
            })
            if(!data.cancelled){
                let newURI = await putCacheImageToDirectory(data.uri);
                setImage(newURI); //Modifie l'URI défini dans la variable image (useState...)
            }
        } else {
            Alert.alert("Wejmi a besoin des droits pour ajouter une image");
        }
    }

    return (
        <View>
            <SelectItems listName={categoryName} items={categoryItems}/>
            <SelectItems listName={roomName} items={roomItems}/>
            <SelectItems listName={furnitureName} items={furnituresItems}/>
            <Button title="Pick an image" onPress={pickImage}/>
            <Button title="Open camera" onPress={pickCameraImage}/>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
    )
}