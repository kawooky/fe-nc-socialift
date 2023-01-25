import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

view: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#151515",
    display: "flex",
    alignItems: "center",
    overflow: 'auto',
    padding: 10
  },
membersContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row'
  },
addToGroupButton: {
    // width: "20px",
    // margin: "10px",
    fontSize: 2,
},
text: {
    color: 'white'
},
groupName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5
},
exerciseDropdownContainer: {
},
exerciseDropDown: {
    color: 'white',
    backgroundColor: "#151515",
    borderColor: 'white',
    width: "80vw",
},
graphContainer: {
    backgroundColor: "black",
    width: "80vw",
    color: 'white',
    padding: 10,
    alignItems: "center",
},
pbHistory: {
    backgroundColor: "black",
    width: "80vw",
    color: 'white',
    padding: 10,
    marginVertical: 20
},
});

export { styles }

