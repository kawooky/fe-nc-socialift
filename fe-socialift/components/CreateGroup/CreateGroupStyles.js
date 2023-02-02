import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { createTheme } from "@rneui/themed";





const mainAreaHeight = Dimensions.get("window").height - 75;

export const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "#36373A", 
        width: '100%',
        marginTop: StatusBar.currentHeight,
    },
    createGroupContainer: {
        backgroundColor: "#36373A",
        width: '100%',
        maxWidth: 360,
        alignSelf: 'center',
        
        paddingHorizontal: 15,
        height: mainAreaHeight,
        
        marginBottom: 25,
        overflow: "scroll"
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

export const theme = createTheme({
    components: {
      Input: {
        borderBottomColor: "white",
        placeholderTextColor: "#F4F6F9",
        inputStyle: { color: "white" },
        containerStyle: {
          borderBottomColor: "white",
        },
      },
    },
  });