import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  Button,
  Alert,
  AlertDialog,
  Box,
  Fab,
  Icon,
  Select,
} from "native-base";
import { AntDesign, MaterialIcons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; //Pour une gestion dans les fichiers système de l'application
import * as MediaLibrary from "expo-media-library"; //Pour une gestion dans les galleries d'image d'un utilisateur.
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SelectItems from "../components/SelectItems.js";
import SelectState from "../components/SelectState.js";
import InputItem from "../components/Input.js";
import {
  GetAllCategory,
  GetAllFurniture,
  GetAllRoom,
  DeleteObject,
} from "../database/dataProcess.js";

export default ({
  isCreatingForm,
  nameOfObject,
  chosenCategory,
  chosenRoom,
  chosenFurniture,
  chosenPhoto,
  state,
  processData,
  idOfObject,
  navigation,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const [image, setImage] = useState(chosenPhoto);
  const [inputName, setInputName] = useState(nameOfObject);
  const [actualCategory, setActualCategory] = useState(chosenCategory);
  const [actualRoom, setActualRoom] = useState(chosenRoom);
  const [actualFurniture, setActualFurniture] = useState(chosenFurniture);
  const [actualState, setActualState] = useState(state);

  const categoryName = "Catégorie";
  const roomName = "Pièce";
  const furnitureName = "Meuble";

  const [categoryItems, setCategoryItems] = useState([]);
  const [roomItems, setRoomItems] = useState([]);
  const [furnituresItems, setFurnitureItems] = useState([]);

  useEffect(() => {
    GetAllCategory(setCategoryItems);
    GetAllRoom(setRoomItems);
    GetAllFurniture(setFurnitureItems);
  }, []);

  const putCacheImageToDirectory = async (imageURI) => {
    //On demande la permission
    const status = await MediaLibrary.requestPermissionsAsync();
    if (status.granted) {
      try {
        //On créé un "asset" qui permet de récupérer la photo et de la déplacer dans DCIM
        const asset = await MediaLibrary.createAssetAsync(imageURI);

        //On créé un album (sauf s'il existe déjà : il déplacera seulement l'asset précédemment créé) et déplace l'asset dans l'album Wejmi
        let album = await MediaLibrary.createAlbumAsync("Wejmi", asset, false);

        //S'il n'y a pas eu d'erreur alors
        if (album != null) {
          console.log("File Saved Successfully!");
          let assetsInWejmi = await MediaLibrary.getAssetsAsync({
            album: album,
          }); //On récupère tous les assets de l'album (en effet, l'asset créé ne correspond pas à celui dans l'album Wejmi)
          let actualAsset =
            assetsInWejmi.assets[assetsInWejmi.assets.length - 1]; //On récupère le dernier élément de l'album (le plus récent)

          return actualAsset.uri; //on retourne l'actuel URI.
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Need Storage permission to save file");
    }
  };

  //Prendre une image depuis les fichiers du téléphone
  const pickImage = async () => {
    // On récupère une image de la librairie
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri); //Modifie l'URI défini dans la variable image (useState...)
    }
  };

  //Prendre une image avec l'appareil photo
  const pickCameraImage = async () => {
    const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
    const statusMediaLibrary =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (statusCamera.granted && statusMediaLibrary.granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!data.cancelled) {
        let newURI = await putCacheImageToDirectory(data.uri);
        setImage(newURI); //Modifie l'URI défini dans la variable image (useState...)
      }
    } else {
      Alert.alert("Wejmi a besoin des droits pour ajouter une image");
    }
  };

  const newDataProcess = () => {
    //mettreDansLaBDD()
    const newData = {
      name: inputName,
      categoryID: actualCategory.id,
      roomID: actualRoom.id,
      furnitureID: actualFurniture.id,
      imageUri: image,
      stateID: actualState.id,
    };

    processData(newData);
    navigation.goBack();
  };

  const deleteData = () => {
    console.log("coucou");
    DeleteObject(idOfObject);
    navigation.goBack();
  };

  const modifyButtons = (
    <View flexDirection="row">
      <Button
        style={styles.deleteButton}
        borderRadius="30"
        onPress={() => {
          setIsDeleting(true);
        }}
      >
        <Text style={styles.text}>Supprimer</Text>
      </Button>
      <Button
        style={styles.validateButton}
        borderRadius="30"
        onPress={() => newDataProcess()}
      >
        <Text style={styles.text}>Modifier</Text>
      </Button>
    </View>
  );

  const addButtons = (
    <Button
      style={styles.validateButton}
      borderRadius="20"
      onPress={() => newDataProcess()}
    >
      <Text style={styles.text}>Ajouter</Text>
    </Button>
  );

  const AlertDelete = (
    <AlertDialog isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header style={{ backgroundColor: colors.mainGreenColor }}>
          Supprimer l'objet
        </AlertDialog.Header>
        <AlertDialog.Body>
          Voulez vous vraiment supprimer l'object actuel ?
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" onPress={() => setIsDeleting(false)}>
              Annuler
            </Button>
            <Button
              style={{ backgroundColor: colors.darkRedColor }}
              onPress={() => {
                setIsDeleting(false);
                deleteData();
              }}
            >
              Supprimer
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {AlertDelete}
      <InputItem
        width={300}
        value={inputName}
        placeholder={"Nom"}
        onChangeText={(newName) => setInputName(newName)}
      />
      {isCreatingForm ? (
        <></>
      ) : (
        <SelectState
          chosenState={actualState}
          setChosenState={setActualState}
        />
      )}
      <SelectItems
        style={styles.selectItems}
        listName={categoryName}
        chosenValue={actualCategory}
        setChosenValue={setActualCategory}
        items={categoryItems}
      />
      <SelectItems
        style={styles.selectItems}
        listName={roomName}
        chosenValue={actualRoom}
        setChosenValue={setActualRoom}
        items={roomItems}
      />
      <SelectItems
        listName={furnitureName}
        chosenValue={actualFurniture}
        setChosenValue={setActualFurniture}
        items={furnituresItems}
      />
      <Box style={styles.imageBox}>
        <Fab
          style={styles.fabButton}
          renderInPortal={false}
          shadow={5}
          placement={"bottom-left"}
          bottom={70}
          left={20}
          size="sm"
          icon={
            <Icon
              color="black"
              as={MaterialIcons}
              name="photo-camera"
              size="sm"
            />
          }
          onPress={pickCameraImage}
        />
        <Fab
          style={styles.fabButton}
          renderInPortal={false}
          shadow={5}
          bottom={70}
          right={20}
          size="sm"
          icon={
            <Icon
              color="black"
              as={MaterialIcons}
              name="photo-library"
              size="sm"
            />
          }
          onPress={pickImage}
        />
        <Image
          source={{ uri: image }}
          style={{ height: 200, borderRadius: 20 }}
        />
      </Box>
      {isCreatingForm ? addButtons : modifyButtons}
    </KeyboardAwareScrollView>
  );
};

const colors = {
  mainGreenColor: "#00FFC2",
  darkGreenColor: "#2B9C81",
  mainGreyColor: "#F3F3F3",
  darkGreyColor: "#9C9C9C",
  darkRedColor: "#FF5C5C",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
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
    width: 130,
    margin: 10,
  },
  deleteButton: {
    backgroundColor: colors.darkRedColor,
    width: 130,
    margin: 10,
  },
  fabButton: {
    backgroundColor: colors.mainGreenColor,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
});
