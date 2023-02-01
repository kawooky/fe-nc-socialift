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
import { Avatar, Icon, Button, ButtonGroup} from '@rneui/themed';
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

    const [sectionOfProfile, setSectionOfProfile] = useState(0)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [username, setUsername] = useState('')
    const [profilePic, setProfilePic] = useState('')    
    const [loggedInUserProfile, setLoggedInUserProfile] = useState(false)
    const [loading, setLoading] = useState(true)

    const loggedInUserId = auth.currentUser.uid
    
    
    
    

    const feedRef = collection(db, "users", userId, "posts")

    useEffect(() => {
        setLoggedInUserProfile(false)
        setLoading(true)
        if (loggedInUserId === userId) {
            setLoggedInUserProfile(true)
        }
        Promise.all([
            getDoc(doc(db, 'users', userId)).then((userDoc) =>{
                const user = {...userDoc.data(), id: userDoc.id}
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
        return <Loading />
    }

    return (
        <SafeAreaView style={styles.mainView }>
            <View style={styles.formView}>
            <View style={styles.banner}>
            <Image 
  alt="Username"
  style={styles.profilePic}

  source={{ uri: profilePic }}

/>

            <Text style={styles.username}>{username[0].toUpperCase()}{username.slice(1)}'s Profile</Text>
            </View>
            
            
            
{loggedInUserProfile && <Button onPress={() => {navigation.navigate('EditProfile')}} title="Edit profile" buttonStyle={styles.button}/>}
{!loggedInUserProfile && <Button onPress={() => {handleAddUser(user)}} title="Add friend" buttonStyle={styles.button}/>}



<ButtonGroup buttons={['Feed', 'Records', 'Statistics']} selectedIndex={sectionOfProfile} onPress={(e) => {setSectionOfProfile(e)}} containerStyle={{width: "100%", alignSelf: "center"}}/>


            { sectionOfProfile === 0 && (
                

                    
                    <Feed posts={posts}/>
                
            )}

{ sectionOfProfile === 1 && (
                <View> 

                    <Text>THIS IS THE RECORDS SECTION</Text>
                </View>
            )}

{ sectionOfProfile === 2 && (
                <View> 

                    <Text>THIS IS THE STATISTICS SECTION</Text>
                </View>
            )}

            </View>
            <NavBar navigation={navigation} />
        </SafeAreaView>
    )
}
