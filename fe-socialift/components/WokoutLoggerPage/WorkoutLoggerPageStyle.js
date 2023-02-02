import { StyleSheet } from "react-native";
import { createTheme } from "@rneui/themed";

const workLogStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#36373A",
    justifyContent: "center",
    alignContent: "center",
    maxWidth: 400,
  },
  formView: {
    width: 320,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingTop: 30,
    padding: 10,
    paddingRight: 10,
  },
  stageOne: {},
  stageTwo: {},
  muscleButtonList: {
    flexDirection: "row",

    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  muscleButton: {
    width: 300,
    flexGrow: 1,
  },
  stageThree: {},
  stageFour: {},
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

export { workLogStyles, theme };
