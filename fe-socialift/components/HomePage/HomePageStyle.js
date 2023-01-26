import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({

    groupBar: {
        backgroundColor: "#f7f7f7",
        borderColor: "black",
        borderWidth: 2,
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
    }
})

export { homeStyles }