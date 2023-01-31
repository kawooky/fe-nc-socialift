import { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

console.log(Dimensions.get('window'))

const mainAreaHeight = Dimensions.get('window').height - 100 - 75 - 5

const homeStyles = StyleSheet.create({

    groupBar: {
        backgroundColor: "#f7f7f7",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        maxHeight: 100,
        width: "100%",
        marginBottom: "auto", 
    },
    groupIcon: {
        height: 50,
        width: 50,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 2
    },
    groupName: {
               
    },
    groupItem: {
        margin: 5,
        width: 85,
        height: 100,
        alignItems: "center",
        overflow: 'hidden',
        justifyContent: 'center'
    },
    mainContent: {
        width: "100%",
        maxHeight: mainAreaHeight,
    },
    post: {
        borderColor: "black",
        borderWidth: 2,
        padding: 5,
        maxWidth: 320,
        margin: 5,
        alignItems: "center"
    },
    postUserDetails: {
        flexDirection: "row"
    },
    postStatusDetails: {

    },
    postLikesComments: {
        flexDirection: "row",
        width: 320,
        justifyContent: "space-evenly",
        
    },
    button: {
        width: 150,
        
    }
})

export { homeStyles }