import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  Image,
  ViewBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./ProfilePageStyle.js";
import { Avatar, Icon, Button, ButtonGroup, Card } from "@rneui/themed";
import NavBar from "../NavBar/NavBar.jsx";
import { getFirebase } from "../../firebase.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  onSnapshot
} from "firebase/firestore";
import { Feed } from "../Feed/Feed.jsx";
import { Loading } from "../Loading/Loading.jsx";
import { ScrollView } from "react-native";


export const ProfilePage = ({ route, navigation }) => {
  const { userId } = route.params;
  const { auth } = getFirebase();

  const db = getFirestore();

  const [sectionOfProfile, setSectionOfProfile] = useState(0);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([])
  const [friendsIds, setFriendsIds] = useState([])
  const [groups, setGroups] = useState([])
  
	

  const loggedInUserId = auth.currentUser.uid;

  const feedRef = collection(db, "users", userId, "posts");

  useEffect(() => {
    setLoggedInUserProfile(false);
    setLoading(true);
    if (loggedInUserId === userId) {
      setLoggedInUserProfile(true);
    }
    Promise.all([
      getDoc(doc(db, "users", userId)).then((userDoc) => {
        const user = { ...userDoc.data(), id: userDoc.id };
        setUser(user);
        setUsername(user.username);
        setProfilePic(user.avatarImgURL);
      }),
      getDocs(feedRef).then((posts) => {
        setPosts(
          posts.docs.map((post) => {
            return post.data();
          })
        );
      }),
      getDocs(collection(db, "users", userId, 'friends')).then((friendDocs) => {
        setFriends(friendDocs.docs.map((friend) => {
          if (friend.id !== userId) {
            return {...friend.data(), id:friend.id}
          }
        }))
        setFriendsIds(friendDocs.docs.map((friend) => {
          if (friend.id !== userId) {
            return friend.id
          }
        }))
      }),
      getDocs(collection(db, "users", userId, 'groups')).then((groupDocs) => {
        setGroups(groupDocs.docs.map((group) => {
          return {...group.data(), id:group.id}
        }))
      })
    ]).then(() => {
      setLoading(false);
    });
  }, [userId]);


  const handleAddUser = (userToAdd) => {
    setFriends((current) => {return [...current, userId]})
    setDoc(
      doc(db, "users", loggedInUserId, "friends", userToAdd.id),
      userToAdd
    );
    setDoc(doc(db, "users", userToAdd.id, "friends", loggedInUserId), user);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.banner}>
          <Image
            alt="Username"
            style={styles.profilePic}
            source={{ uri: profilePic }}
          />

          <Text style={styles.username}>
            {username[0].toUpperCase()}
            {username.slice(1)}'s Profile
          </Text>
        </View>

        {loggedInUserProfile && (
          <Button
            color="#49BF87"
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
            title="Edit profile"
            buttonStyle={styles.button}
          />
        )}
        {!loggedInUserProfile && !friendsIds.includes(loggedInUserId) && (
          <Button
            onPress={() => {
              handleAddUser(user);
            }}
            title="Add friend"
            buttonStyle={styles.button}
          />
        )}

        <ButtonGroup
          buttons={["Feed", "Friends", "Groups"]}
          buttonStyle={{ backgroundColor: "#28292B" }}
          textStyle={{ color: "white" }}
          selectedButtonStyle={{
            backgroundColor: "#49BF87",
            innerBorderStyle: "pink",
          }}
          selectedIndex={sectionOfProfile}
          onPress={(e) => {
            setSectionOfProfile(e);
          }}
          containerStyle={{
            width: "100%",
            alignSelf: "center",
            borderColor: "#28292B",
          }}
        />

        {sectionOfProfile === 0 && <Feed posts={posts} />}

        {sectionOfProfile === 1 && (
          
          <ScrollView containerStyle={styles.feed}>
          <View>
              {friends.map((friend) => {
                return (
                  <Card containerStyle={styles.feed}>
                  <View style={styles.result} key={friend.id}>
                    <View style={styles.banner}>
                      <Image
                        source={{ uri: friend.avatarImgURL }}
                        style={styles.icon}
                      />
                      <Text style={styles.username}>
                        {friend.username[0].toUpperCase()}
                        {friend.username.slice(1)}
                      </Text>
                    </View>

                    <Button
                      color="#49BF87"
                      buttonStyle={styles.button}
                      onPress={() => {
                        navigation.navigate("Profile", { userId: friend.id });
                      }}
                      title="View Profile"
                    />
                  </View>
            </Card>
                );
              })}
          </View>
          </ScrollView>
        )}

        {sectionOfProfile === 2 && (
          <Card containerStyle={styles.feed}>
            {groups.map((group) => {
              return (
                <View style={styles.banner} key={group.id}>
                  <Image
                    source={{ uri: group.group_img_url }}
                    style={styles.icon}
                  />
                  <Text style={styles.username}>
                    {group.group_name[0].toUpperCase()}
                    {group.group_name.slice(1)}
                  </Text>
                </View>
              );
            })}
          </Card>
        )}
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};
