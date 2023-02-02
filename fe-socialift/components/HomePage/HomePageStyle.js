import { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";

console.log(Dimensions.get("window"));

const mainAreaHeight = Dimensions.get("window").height - 100 - 75 - 5;

const homeStyles = StyleSheet.create({
  groupBar: {
    backgroundColor: "#28292B",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    maxHeight: 100,
    minHeight: 100,
    width: "100%",
    marginBottom: "auto",
  },
  groupIcon: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  groupName: {
    marginTop: 5, 
    color: "white"
  },
  groupItem: {
    margin: 5,
    width: 85,
    height: 100,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  mainContent: {
    width: "100%",
    maxHeight: mainAreaHeight,
  },
  post: {
    backgroundColor: "#28292B",
    padding: 5,
    maxWidth: 400,
    width: "90%", 
    margin: 5,
    alignItems: "flex-start",
    borderRadius: 10, 
    padding: 10
  },
  postUserDetails: {
    flexDirection: "row",
    marginBottom: 10,
    margin: 5, 
  },
  postStatusDetails: {
    padding: 5
  },
  postLikesComments: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    width: "100%"
  },
  button: {
    flex: 1,
    padding: 5,
    width: 150,
    borderRadius: 10

  },
  textName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2
  },
  text: {
    color: "white",
  },
});

export { homeStyles };
