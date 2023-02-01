import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    createGroupContainer: {
        alignItems: 'center',
        width: '100%',
        maxWidth: 360,
        alignSelf: 'center',
        maxHeight: "100%",
        overflow: "scroll",
        padding: 15
    },
    groupImageContainer: {
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
        alignItems: "center"
    },
    groupImage : {
        height: 75,
        width: 75,
        
    },
    friendCard: {
        flexDirection: "row",
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 2,
        padding: 5,
        maxWidth: 320,
        width: "100%",
        margin: 5,
        alignItems: "center",
        justifyContent: "space-between"
    },
    friendIcon: {
        height: 50,
        width: 50,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 2
    }
})
