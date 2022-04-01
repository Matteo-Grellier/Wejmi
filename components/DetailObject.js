import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native'; 
import SelectState from './SelectState';

const DetailObject = ({navigation, name}) => {

    return ( 
        <View >
            <Pressable 
            style={styles.container} 
            key={1}
            onPress={() => {
                navigation.navigate("Modifier un Objet");
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
                        Chambre
                    </Text>
                    <Text style={styles.meubleTitre}>
                        Meuble
                    </Text>
                    <Text style={styles.meuble}>
                        Bac à linge
                    </Text>
                    <View style={styles.selectBox}>
                        <SelectState style={styles.state} chosenState="Rangé" ></SelectState>
                    </View>
                </View>
                <View style={styles.image}>
                    <Image 
                    style={styles.image} 
                    source={require("../assets/PXL_20220331_125622154.jpg")} 
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
        right: 10,
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