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

  toggles: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  avatar: {
    paddingBottom: 1,
    alignItems: "center",
  },
});

export { styles };
