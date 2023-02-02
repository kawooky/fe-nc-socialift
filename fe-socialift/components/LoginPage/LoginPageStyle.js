import { StyleSheet } from "react-native";
import { createTheme, withTheme } from "@rneui/themed";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#36373A",
    justifyContent: "center",
    alignItems: "center",
  },
  formView: {
    width: 320,
    backgroundColor: "#28292B",
    borderRadius: 10,
    paddingTop: 30,
    padding: 10,
    paddingRight: 10,
  },
});

const theme = createTheme({
  components: {
    Button: {
      raised: true,
      radius: 10,
      color: "#49BF87",
      containerStyle: {
        marginBottom: 20,
      },
    },
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

export { styles, theme };
