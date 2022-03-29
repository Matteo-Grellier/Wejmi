import React from 'react';
import { Text, View, StyleSheet, Pressable, Image, FlatList } from 'react-native'; 
import { DisplayingIconState } from './SelectState';


const DetailObject = () => {
    return ( 
        <View style={styles.container}>
            <Pressable>
                <View style={styles.description}>
                    <Text style={styles.objets}>
                        Caleçons sales
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
                    <DisplayingIconState/>
                </View>

                <Image 
                style={styles.image} 
                source={require("../assets/ynov_nantes_audio.png")} 
                alt="Alternate Text"
                />
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '45%',
        marginLeft: '5%',
        borderRadius: 10,
        marginTop: '10%',
        backgroundColor: '#00FFC2',
        position: 'relative',
    },
    description: {
        position: 'absolute',
        right: '5%',
    },
    objets: {
        fontWeight: 'bold',
        top: '7%',
        paddingBottom: '10%',
        right: 10,
        fontSize: 20,
    },
    pièceTitre: {
        fontWeight: 'bold',
        right: 20,
        fontSize: 15,
        color: '#535353',
    },
    pièce: {
        fontWeight: 'bold',
        fontSize: 20,
        right: 20,
        marginBottom: '10%',
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
        height: '90%',
        top: 21,
        bottom: 0,
        left:20,
    },
});


export default DetailObject;