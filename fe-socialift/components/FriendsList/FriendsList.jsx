import { Card, Button } from "@rneui/themed";
import { Image, Text, View } from "react-native";
import { AddFriendsstyles } from "../AddFriendsPage/AddFriendsStyle";

export const FriendsList = ({fetchedUsers, friendsList, handleAddUser, navigation}) => {
    return (<View>
        <Card containerStyle={{backgroundColor: "#28292B", borderColor: "black", borderRadius: 10, borderWidth: 0}}>
        <Card.Title style={AddFriendsstyles.username}>Search results:</Card.Title>
        <Card.Divider />
        {fetchedUsers.map((user, index) => {
            return (
                <View style={AddFriendsstyles.result} key={index}>
                    <View style={AddFriendsstyles.banner}>

                    <Image
                        source={{ uri: user.avatarImgURL }}
                        style={AddFriendsstyles.icon}
                    />
                    <Text style={AddFriendsstyles.username}>{user.username[0].toUpperCase()}{user.username.slice(1)}</Text>
                    </View>
                    

                    
                    <Button color="#49BF87" 
                        buttonStyle={AddFriendsstyles.button}
                        onPress={() => {
                            handleAddUser(user);
                        }}
                        title="Add Friend"
                    />
                    <Button color="#49BF87" buttonStyle={AddFriendsstyles.button} onPress={() =>{
                        navigation.navigate("Profile", {userId: user.id})
                    }} title="View Profile"/>
                    
                    
                </View>
            );
        })}
        <View style={AddFriendsstyles.result}>

        <Text style={AddFriendsstyles.text}>End of results</Text>
        </View>
    </Card>

    <Card containerStyle={{backgroundColor: "#28292B", borderColor: "black", borderRadius: 10, borderWidth: 0}}>
        <Card.Title style={AddFriendsstyles.username}>Friends list:</Card.Title>
        {friendsList.map((user, index) => {
            return (
                <View style={AddFriendsstyles.result} key={index}>
                    <View style={AddFriendsstyles.banner}>
                    <Image
                        source={{ uri: user.avatarImgURL }}
                        style={AddFriendsstyles.icon}
                    />
                    <Text style={AddFriendsstyles.username}>{user.username}</Text>
                    </View>
                    <Button
                        size="sm"
                        color="#49BF87" 
                        buttonStyle={AddFriendsstyles.button}
                        onPress={() =>{
                            navigation.navigate("Profile", {userId: user.id})
                        }}
                    >
                        View Profile
                    </Button>
                    
                </View>
            );
        })}
    </Card>
</View>)
}