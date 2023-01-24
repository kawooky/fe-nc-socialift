import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

view: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "f4f4f4"
  },
input: {
    width: "300px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    margin: "10px"
},
loginButton: {
    width: "300px",
    margin: "10px"
}
   
});

export { Styles }