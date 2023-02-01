import { StyleSheet } from "react-native";
import { createTheme } from "@rneui/themed";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
  },
  formView: {
    width: 320,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingTop: 30,
    padding: 10,
    paddingRight: 10,
  },

  infoContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 20
  },

  infoText: {
    fontSize: 20
  },

  toggleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 1,
    margin: 10
  },

  toggleText: {
    fontSize: 20,
  },

  avatar: {
    paddingBottom: 1,
    alignItems: "center",
  },
});

export { styles };
