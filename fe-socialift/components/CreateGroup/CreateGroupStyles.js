import { StyleSheet, Dimensions } from 'react-native';





const mainAreaHeight = Dimensions.get("window").height - 75;

export const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "#36373A", 
        width: '100%',
    },
    createGroupContainer: {
        backgroundColor: "#36373A",
        alignItems: 'center',
        width: '100%',
        maxWidth: 360,
        alignSelf: 'center',
        maxHeight: "100%",
        overflow: "scroll",
        padding: 15,
        height: mainAreaHeight,
        padding: 20,
    },
    groupImageContainer: {
        backgroundColor: "#e8e8e8",
        height: 75,
        width: 75,
        padding: 10,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    groupImageSelector: {
        alignItems: "center",
        marginTop: 20
    },
    groupImage : {
        height: 75,
        width: 75,
        
    },
    username: {
        fontSize: 20,
	   color: '#f4f4f5',
    },
    friendCard: {
        flexDirection: "row",
        borderColor: "black",
		backgroundColor: '#28292B',
        borderRadius: 10,
        padding: 15,
        maxWidth: 320,
        width: "100%",
        margin: 5,
        alignItems: "center",
        justifyContent: "space-between"
    },
    friendIcon: {
        height: 65,
        width: 65,
        borderRadius: 100,
        borderColor: "black",
        
    }
})
