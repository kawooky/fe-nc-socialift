import { StyleSheet, StatusBar } from 'react-native';

console.log(StatusBar.currentHeight)

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        justifyContent: "center",
        alignItems: "center",
        marginTop: StatusBar.currentHeight
    }
})

export { styles }