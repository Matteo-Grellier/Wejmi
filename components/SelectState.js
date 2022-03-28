import { Select, CheckIcon, Box, Icon } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign, MaterialIcons } from "react-native-vector-icons";
import { useState } from "react";

export default ({chosenState}) => {
    const [chosenVal, setChosenVal] = useState(chosenState);

    const displayingIconState = () => {
        if(chosenVal == "Rangé") {
            return (<Icon color={colors.darkGreenColor} as={AntDesign} name="checkcircle" size="5" marginLeft="3"/>)
        } else if (chosenVal == "Perdu") {
            return (<Icon color={"#F08449"} as={MaterialIcons} name="warning" size="5" marginLeft="3"/>)
        } else if (chosenVal == "Déplacé") {
            return (<Icon color={colors.darkGreenColor} as={AntDesign} name="clockcircle" size="5" marginLeft="3"/>)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Etat</Text>
            <Box style={styles.boxSelect}>
                {
                    displayingIconState()
                }
                <Select fontSize={14} borderWidth={0} color={"black"} paddingTop="-1"
                minWidth="70" 
                maxHeight="10"
                selectedValue={chosenVal} 
                accessibilityLabel={chosenVal} 
                placeholder={chosenVal}
                _selectedItem={{
                    bg: "#00FFC2",
                    endIcon: <CheckIcon size="3" />
                }} 
                mt={1} 
                onValueChange={itemValue => setChosenVal(itemValue)}>

                    <Select.Item label="Rangé" value="Rangé"/>
                    <Select.Item label="Perdu" value="Perdu"/>
                    <Select.Item label="Déplacé" value="Déplacé"/>
                    
                </Select>
            </Box>
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
        margin: 10,
    },
    boxSelect: {
        flexDirection: "row", 
        alignItems: "center", 
        borderColor: colors.mainGreenColor,
        borderWidth: 2,
        borderRadius: 40,
        maxHeight:40,
    },
    text: {
        marginLeft: 10,
    }
});