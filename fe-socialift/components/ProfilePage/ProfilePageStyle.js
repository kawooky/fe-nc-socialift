import { StyleSheet, StatusBar, Dimensions } from "react-native";

const mainAreaHeight = Dimensions.get("window").height - 75;
const feedHeight = Dimensions.get("window").height - 75 - 300;
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#36373A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  formView: {
    maxWidth: 420,
    width: "100%",
    backgroundColor: "#36373A",
    borderRadius: 10,
    padding: 10,
    height: mainAreaHeight,
  },
  feed: {
    marginTop: 0,
    backgroundColor: "#28292B",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 0,
    maxHeight: feedHeight,
    overflow: "scroll",
    width: 400,
    alignSelf: "center"
  },
  banner: {
    width: "100%",
    backgroundColor: "#222322",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 15,
  },
	result: {
		width: "100%",
		borderWidth: 0,
		borderColor: '#9e9d9b',
		alignItems: "center",
		marginBottom: 10,
		backgroundColor: '#36373A',
		borderRadius: 20,
		paddingBottom: 10
	},
  icon: {
		height: 75,
		width: 75,
		borderRadius: 100,
	},
  button: {
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    paddingHorizontal: "35%"
  },

  username: {
    fontSize: 20,
    color: "#f4f4f5",
  },
  profilePic: {
    height: 100,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 100,
  },
});

export { styles };
