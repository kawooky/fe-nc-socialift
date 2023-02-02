import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { createTheme } from "@rneui/themed";
const mainAreaHeight = Dimensions.get("window").height - 75;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#36373A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  formView: {
    padding: 30,
    paddingTop: 50,
    minWidth: "550",
    width: "100%",
    backgroundColor: "#36373A",
    borderRadius: 10,
    alignItems: "center",
    height: mainAreaHeight,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 100,
  },
  username: {
    fontSize: 20,
    color: "#f4f4f5",
  },
  banner: {
    backgroundColor: "#222322",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 15,
    width: "70%",
  },
  sentMessage: {
    textAlign: "right",
    fontSize: 15,
    color: "#f4f4f5",
  },
  receivedMessage: {
    alignItems: "left",
    fontSize: 15,
    color: "#f4f4f5",
  },
});

const theme = createTheme({
  components: {
    Button: {
      raised: true,
      radius: 10,
      containerStyle: {
        marginBottom: 20,
      },
    },
    Input: {
      containerStyle: {},
    },
  },
});

export { styles, theme };
