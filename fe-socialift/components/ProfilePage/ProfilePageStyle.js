import { StyleSheet } from 'react-native';

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

  avatar: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'flex-start',
    flexDirection: "row"

  },
   button: {
    flex: 1,
   },
   buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
   },

   username: {
    fontSize: 20,
   },
   profilePic: {
    height: 75,
        width: 75,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 100
   }
});

export { styles }