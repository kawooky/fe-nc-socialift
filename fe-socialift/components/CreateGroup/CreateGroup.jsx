import { Pressable, SafeAreaView, Text, View, Image } from "react-native";
import { Button, Input, SearchBar, ThemeProvider } from "@rneui/themed";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styles, theme } from "./CreateGroupStyles";
import NavBar from "../NavBar/NavBar";

import {
  faUserGroup,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  getDocs,
  getDoc,
  getFirestore,
  addDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getFirebase } from "../../firebase";
import { pickImage, uploadImage } from "../../utils/pick-and-upload-images";
import { ref } from "firebase/storage";
import { Loading } from "../Loading/Loading";


export const CreateGroup = ({ route, navigation }) => {
  const [groupImage, setGroupImage] = useState("");
  const [groupName, setGroupName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupId, setGroupId] = useState('')
  const [loggedInUserObject, setLoggedInUserObject] = useState({})
  const [loading, setLoading] = useState(true)
  const [editImage, setEditImage] = useState(false)
  const [editName, setEditName] = useState(false)
 
  const groupIdEdit = route.params.groupId

  console.log(groupIdEdit)

  useEffect(() => {
    setLoading(true)
    if (groupIdEdit) {
      Promise.all([
        getDocs(collection(db, 'groups', groupIdEdit, 'members'))
        .then((memberDocs) => {
          setGroupMembers(memberDocs.docs.map((member) => {
            return member.data()
          }))
        }),
        getDoc(doc(db, 'groups', groupIdEdit)).then((groupDoc) => {
          
          setGroupImage(groupDoc.data().group_img_url)
          setGroupName(groupDoc.data().group_name)
        })
      ]).then(() => {
        setLoading(false)
      })
    }
    setLoading(false)
  }, [])

  function updateAvatar() {
    pickImage()
      .then((newAvatarURI) => {
        console.log(newAvatarURI, "<< newAvatarURI");
        setGroupImage(newAvatarURI);
        setEditImage(true)
      })
      .catch((error) => {
        setGroupImage(null);
        alert(error);
      });
  }

  const { auth, storage } = getFirebase();
  const db = getFirestore();
  const loggedInUser = auth.currentUser
  

  const handleGroupCreate = () => {
    if (!groupIdEdit) {
      addDoc(collection(db, 'groups'), {
        group_name: groupName,
        group_img_url: 'test',
        created_at: new Date
      })
      .then((newGroup) => {
        return Promise.all([
        uploadImage(groupImage, ref(storage, `groups/${newGroup.id}.jpg`))
        .then((newImgUrl) => {
          Promise.all([
            updateDoc(doc(db, 'groups', newGroup.id), {group_img_url: newImgUrl}),
            groupMembers.forEach((member) => {
              setDoc(doc(db, 'users', member.id, 'groups', newGroup.id), {
                group_id: newGroup.id,
                group_name: groupName,
                group_img_url: newImgUrl
              })
            }),
            setDoc(doc(db, 'users', loggedInUser.uid, 'groups', newGroup.id), {
                group_id: newGroup.id,
                group_name: groupName,
                group_img_url: newImgUrl
            }),
            setGroupId(newGroup.id)
          ])
        }),
        groupMembers.forEach((member) => {
          setDoc(doc(db, 'groups', newGroup.id, 'members', member.id), {
            ...member
          })
        }),
        setDoc(doc(db, 'groups', newGroup.id, 'members', loggedInUser.uid), {...loggedInUserObject})
      ]).then(() => {
        return newGroup.id
      })
      })
      .then((newGroupId) => {
        navigation.navigate("Group", {groupId: newGroupId})
      })
    } else {
      if (editImage) {
        uploadImage(groupImage, ref(storage, `groups/${groupIdEdit}.jpg`))
      }
      if (editName) {
        updateDoc(doc(db, 'groups', groupIdEdit), {group_name: groupName})
        
      }
      navigation.navigate("Group", {groupId: groupIdEdit})
        
      

    }
  };

  const retrieveSearchResults = () => {
    const friendsRef = collection(db, "users", loggedInUser.uid, "friends");

    getDocs(friendsRef).then((friends) => {
      setSearchResults(
        friends.docs.map((friend) => {
          return { ...friend.data(), id: friend.id };
        })
      );
    });
  };

  const toggleMembership = (friend) => {
    if (
      groupMembers.some((member) => {
        return member.id === friend.id;
      })
    ) {
      setGroupMembers((current) => {
        return current.filter((member) => {
          return member.id !== friend.id;
        });
      });
    } else {
      setGroupMembers((current) => {
        return [...current, friend];
      });
    }
  };

  useEffect(() => {
    retrieveSearchResults();
    getDoc(doc(db, "users", loggedInUser.uid))
		.then((user) => {
			setLoggedInUserObject({...user.data()})
		})
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.mainArea}>

<ThemeProvider theme={theme}>
    <SafeAreaView style={styles.createGroupContainer}>
      

      <Pressable onPress={updateAvatar} style={styles.groupImageSelector}>
        {groupImage !== '' && (
          <View style={styles.groupImageContainer}>
            <Image source={{ uri: groupImage }} style={styles.groupImage} />
          </View>
        )}
        {!groupImage && (
          <View style={styles.groupImageContainer}>
            <FontAwesomeIcon
              icon={faUserGroup}
              size={48}
              secondaryOpacity={0.3}
            />
          </View>
        )}
        <Text style={styles.username}>Tap to choose group photo</Text>
      </Pressable>

      <Input
        value={groupName}
        placeholder="Group Name"
        onChangeText={(e) => {
          setGroupName(e);
          setEditName(true)
        }}
      />

      {searchResults.map((result) => {
        return (
          <View style={styles.friendCard}>
            <Image source={{ uri: result.avatarImgURL }} style={styles.friendIcon} />
            <Text style={styles.username}>{result.username}</Text>

            <Button
              style={styles.addButton}
              buttonStyle={
                groupMembers.some((member) => {
                  return member.id === result.id;
                })
                  ? {
                      backgroundColor: "#49BF87",
                      borderColor: "black",
                      borderWidth: 2,
                      borderRadius: 50,
                      height: 60,
                      width: 60,
                    }
                  : {
                      backgroundColor: "#e8e8e8",
                      borderColor: "black",
                      borderWidth: 2,
                      borderRadius: 50,
                      height: 60,
                      width: 60,
                    }
              }
              title={
                groupMembers.some((member) => {
                  return member.id === result.id;
                }) ? (
                  <FontAwesomeIcon icon={faCheck} color={"white"} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )
              }
              onPress={() => {
                toggleMembership(result);
              }}
            />
          </View>
        );
      })}

      <Button
        variant="contained"
        onPress={() => {
          handleGroupCreate();
        }}
        title={groupIdEdit ? "Save Group": "Create Group"}
        disabled={(groupName !== '' && groupImage !== '' )? false : true}
      />
      
    </SafeAreaView>
    <NavBar navigation={navigation}/>
    </ThemeProvider>
    </View>
  );
};
