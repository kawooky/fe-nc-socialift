import { StyleSheet, StatusBar, Dimensions } from 'react-native';

const mainAreaHeight = Dimensions.get('window').height - 75 
const styles = StyleSheet.create({

mainView: {
    backgroundColor: "#36373A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight
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

  button: {
    width: "100%",
    textAlign: "center"
   },

   username: {
    fontSize: 20,
    color: '#f4f4f5'
   },
   profilePic: {
    height: 100,
        width: 100,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 100
   }
});

export { styles }