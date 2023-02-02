import { StyleSheet, StatusBar } from 'react-native';

console.log(StatusBar.currentHeight)

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: "#36373A",
        justifyContent: "center",
        alignItems: "center",
        marginTop: StatusBar.currentHeight
    }
})

export { styles }