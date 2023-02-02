import { StyleSheet } from "react-native";
import { createTheme } from "@rneui/themed";

// const mainAreaHeight = Dimensions.get('window').height - 5

const workLogStyles = StyleSheet.create({
mainContainer: {
maxHeight: "90"
},

  mainView: {
    width: "100%",
    flex: 1, 
    backgroundColor: "#36373A",
  },
  card: {
flex: 1, 
justifyContent: "center", 
alignItems: "center",



  },
formView: {
    maxsWidth: 420,
    width: "90%", 
    backgroundColor: "#28292B",
    borderRadius: 10,
    paddingTop: 30,
    padding: 10,
    paddingRight: 10,
  },
  muscleButtonList: {
    
  },
  muscleButton: {
    width: 300,
    flexGrow: 1,
  },
  stageTwo: {alignItems: "center",
  justifyContent: "center", },
  stageThree: {alignItems: "center", 
  justifyContent: "center", 
},
  stageFour: {alignItems: "center",
  justifyContent: "center", },
  text: {
    marginTop: 40, 
    color: "white"
  }, 
  button: {
    marginBottom: 10,
  }, 
  title: {
    color: "white",
    fontSize: 22,
    marginTop: 15,
  }
});



export { workLogStyles };
