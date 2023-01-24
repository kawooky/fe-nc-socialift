import { StyleSheet } from 'react-native';
import {createTheme} from '@rneui/themed'

const styles = StyleSheet.create({

mainView: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
},
formView: {
    width: "320px",
    height: "100vh",
    display: "inherit",
    justifyContent: "center"
}   
});

const theme = createTheme({
  components: {
    Button: {
      raised: true,
      containerStyle: {
        margin: 10
      }
    },
    Input: {
      
    }
  },
})

export { styles, theme }