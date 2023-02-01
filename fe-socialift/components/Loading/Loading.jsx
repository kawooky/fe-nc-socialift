import { View, ActivityIndicator } from "react-native"




export const Loading = () => {
    return <View style={{justifyContent: "center", alignItems:"center", height: "100%"}}><ActivityIndicator size="large"/></View>
}