import { StyleSheet, Dimensions} from "react-native";
import { createTheme } from "@rneui/themed";


const logStyles = StyleSheet.create({
  mainView: {
    flex: 1, 
    backgroundColor: "#36373A",
    justifyContent: "center",
    alignContent: "center", 
    maxWidth: 400,

  },
  formView: {
    flex: 1,
    width: "90%",
    backgroundColor: "#28292B",
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 20
  },
  container: {
  },
  textName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2
  },
  text: {
    color: "white",
    marginBottom: 10,
  },
  button: {
    flex: 1, 
    justifyContent: "flex-end", 
    borderRadius: 10
  }
});



export { logStyles};
