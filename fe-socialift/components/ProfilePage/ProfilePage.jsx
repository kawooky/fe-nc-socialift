import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    Image,
    ViewBase
  } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./ProfilePageStyle.js";
import { Avatar, Button, Icon} from '@rneui/themed';
import NavBar from "../NavBar/NavBar.jsx";
import { getFirebase } from "../../firebase.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Feed } from "../Feed/Feed.jsx";








export const ProfilePage = ({navigation}) => {
    const { auth } = getFirebase();
    ///// POST EXAMPLE
    let postsExample = [{
        id: 302,
        type: "logged-workout",
        user: "bohdan",
        user_img_url:
          "https://www.themoviedb.org/t/p/w500/dhv9f3AaozOjpvjAwVzOWlmmT2V.jpg",
        date: "2023-01-12",
        exercises: [{name: "Bicep Curl",
                    sets: 3,
                    average_reps: 12,
                    average_weight: 50,
                    units: 'kg'},
                    {name: "Weighted Squat",
                    sets: 5,
                    average_reps: 20,
                    average_weight: 150,
                    units: 'lbs'}],
        notes: "Need to make this one more than two lines long so I can test the ellipsis so I'm just going to keep typing. How are you today? Ate a can of spinach, did a deadlift, simple as.",
        likes: 10,
        comments: 6,
      }]
    
      const db = getFirestore();

    const [sectionOfProfile, setSectionOfProfile] = useState('feed')
    const [posts, setPosts] = useState([])
    
    const loggedInUserName = auth.currentUser.displayName
    const loggedInUserPP = auth.currentUser.photoURL
    const loggedInUserId = auth.currentUser.uid

    const feedRef = collection(db, "users", loggedInUserId, "posts")

    useEffect(() => {
        getDocs(feedRef).then((posts) => {
            setPosts(posts.docs.map((post) => {
                return post.data()
            }))
        })
        console.log(posts, "<<< posts")
    }, [])



  
    

    return (
        <View style={styles.mainView }>
            <View style={styles.formView}>
                <View style={styles.avatar}>
            <Avatar 
  alt="Username"
  activeOpacity={0.2}
  avatarStyle={{}}
  containerStyle={{ backgroundColor: "#BDBDBD", marginBottom: 10}}
  icon={{}}
  iconStyle={{}}
  imageProps={{}}
  onPress={() => navigation.navigate('EditProfile')}
  overlayContainerStyle={{}}
  placeholderStyle={{}}
  rounded
  size="large"
  source={{ uri: loggedInUserPP }}
  titleStyle={{}}
/>
<View style={styles.username}>
            <Text>{loggedInUserName}</Text>
            </View>
</View>

<View style={styles.buttonContainer}>
<View style={styles.button}>
            <Button onPress={() => {
                setSectionOfProfile("feed")
            }} variant="contained">Feed</Button>
</View>
<View style={styles.button}>
            <Button onPress={() => {
                setSectionOfProfile("records")
            }}variant="contained">Records</Button>
</View>
            <Button onPress={() => {
                setSectionOfProfile("statistics")}} variant="contained">Statistics</Button>
            </View>

            { sectionOfProfile === "feed" && (
                <View> 

                    <Text>THIS IS THE FEED</Text>
                    <Feed posts={posts}/>
                </View>
            )}

{ sectionOfProfile === "records" && (
                <View> 

                    <Text>THIS IS THE RECORDS SECTION</Text>
                </View>
            )}

{ sectionOfProfile === "statistics" && (
                <View> 

                    <Text>THIS IS THE STATISTICS SECTION</Text>
                </View>
            )}

            </View>
            <NavBar navigation={navigation} />
        </View>
    )
}
