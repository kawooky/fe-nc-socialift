import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

view: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#151515",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    display: "inherit",
    flexDirection: "column"
  },
input: {
    width: "200px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    margin: "10px"
},
loginButton: {
    width: "200px",
    margin: "10px"
}
   
});

export { styles }