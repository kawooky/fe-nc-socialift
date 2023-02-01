import { StyleSheet } from 'react-native';
import {createTheme} from '@rneui/themed'

const styles = StyleSheet.create({
    
    mainView: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        justifyContent: "center",
        alignItems: "center"
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
    formView: {
       width: 320,
       backgroundColor: "#f5f5f5",
       borderRadius: 10,
       paddingTop: 30,
       padding: 10,
       paddingRight: 10
    }   
    });
    
    const theme = createTheme({
      components: {
        Button: {
          raised: true,
          radius: 10,
          containerStyle: {
            marginBottom: 20,
            
          }
        },
        Input: {
          containerStyle: {
            
          }
        }
      }
    })
    
export { styles, theme }

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



