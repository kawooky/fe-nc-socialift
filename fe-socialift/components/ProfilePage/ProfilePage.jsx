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
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { Feed } from "../Feed/Feed.jsx";
import { Loading } from "../Loading/Loading.jsx";


export const ProfilePage = ({route, navigation}) => {

    const {userId} = route.params
    const { auth } = getFirebase();
    ///// POST EXAMPLE
       
    const db = getFirestore();

    const [sectionOfProfile, setSectionOfProfile] = useState('feed')
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [username, setUsername] = useState('')
    const [profilePic, setProfilePic] = useState('')    
    const [loggedInUserProfile, setLoggedInUserProfile] = useState(false)
    const [loading, setLoading] = useState(true)

    const loggedInUserId = auth.currentUser.uid
    
    
    
    

    const feedRef = collection(db, "users", userId, "posts")

    useEffect(() => {
        setLoading(true)
        if (loggedInUserId === userId) {
            setLoggedInUserProfile(true)
        }
        Promise.all([
            getDoc(doc(db, 'users', userId)).then((userDoc) =>{
                const user = userDoc.data()
                setUser(user)
                setUsername(user.username)
                setProfilePic(user.avatarImgURL)
            }),
            getDocs(feedRef).then((posts) => {
                setPosts(posts.docs.map((post) => {
                    return post.data()
                }))
            })
        ]).then(() => {
            setLoading(false)
        })
    }, [userId])


	const handleAddUser = (userToAdd) => {
		setDoc(doc(db, 'users', loggedInUserId, 'friends', userToAdd.id), userToAdd)
		setDoc(doc(db, 'users', userToAdd.id, 'friends', loggedInUserId), user)
	}
  
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <View style={styles.mainView }>
            <View style={styles.formView}>
                <View style={styles.avatar}>
            <Image 
  alt="Username"
  style={styles.profilePic}
//   activeOpacity={0.2}
//   avatarStyle={{}}
//   containerStyle={{ backgroundColor: "#BDBDBD", marginBottom: 10}}
//   icon={{}}
//   iconStyle={{}}
//   imageProps={{}}
//   onPress={() => navigation.navigate('EditProfile')}
//   overlayContainerStyle={{}}
//   placeholderStyle={{}}
//   rounded
//   size="large"
  source={{ uri: profilePic }}
//   titleStyle={{}}
/>
<View style={styles.username}>
            <Text>{username}</Text>
            </View>
</View>
{loggedInUserProfile && <Button onPress={() => {navigation.navigate('EditProfile')}} title="Edit profile"/>}
{!loggedInUserProfile && <Button onPress={() => {handleAddUser(user)}} title="Add friend"/>}
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
