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
    maxWidth: 420,
    width: "100%",
    backgroundColor: "#36373A",
    borderRadius: 10,
    padding: 10,
    height: mainAreaHeight
  },
  banner: {
    backgroundColor: '#222322',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 15
  },
  profilePic: {
    height: 100,
        width: 100,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 100
   },
   username: {
    fontSize: 20,
    color: '#f4f4f5'
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
