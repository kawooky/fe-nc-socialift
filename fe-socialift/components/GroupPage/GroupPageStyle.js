import { StyleSheet, StatusBar, Dimensions } from "react-native";

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
    minWidth: 550,
    width: "100%",
    backgroundColor: "#36373A",
    borderRadius: 10,
    alignItems: "center",
    height: mainAreaHeight,
  },
  membersPics: {
    height: 60,
    width: 60,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 60,
  },
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
  banner: {
    backgroundColor: "#222322",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 15,
    width: "70%",
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

  membersContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  graphContainer: {
    backgroundColor: "#222322",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 50,
    borderRadius: 20,
    marginBottom: 15,
    width: "100%",
  },

  tableText: {
    textAlign: "center",
    flex: 1,
    color: "#f4f4f5",
    minWidth: 100,
    minHeight: 30,
    justifyContent: "center",
  },
  tableHead: {
    height: 40,
    justifyContent: "center",
    // width:100
  },
  tableRows: {
    justifyContent: "center",
    // width:100
  },
});

export { styles };

// view: {
//     height: "100vh",
//     width: "100vw",
//     backgroundColor: "#151515",
//     display: "flex",
//     alignItems: "center",
//     overflow: 'auto',
//     padding: 10
//   },
// membersContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     color: 'white',
//     fontSize: 15,
//     fontWeight: 'bold',
//     display: 'flex',
//     flexDirection: 'row'
//   },
// addToGroupButton: {
//     // width: "20px",
//     // margin: "10px",
//     fontSize: 2,
// },
// text: {
//     color: 'white'
// },
// groupName: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 5
// },
// exerciseDropdownContainer: {
// },
// exerciseDropDown: {
//     color: 'white',
//     backgroundColor: "#151515",
//     borderColor: 'white',
//     width: "80vw",
// },
// graphContainer: {
//     backgroundColor: "black",
//     width: "80vw",
//     color: 'white',
//     padding: 10,
//     alignItems: "center",
// },
// pbHistory: {
//     backgroundColor: "black",
//     width: "80vw",
//     color: 'white',
//     padding: 10,
//     marginVertical: 20
// },
// });
