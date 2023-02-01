import { Pressable, SafeAreaView, Text, View, Image } from "react-native";
import { Button, Input, SearchBar } from "@rneui/themed";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styles } from "./CreateGroupStyles";

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


export const CreateGroup = ({ navigation }) => {
  const [groupImage, setGroupImage] = useState("");
  const [groupName, setGroupName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupId, setGroupId] = useState('')
  const [loggedInUserObject, setLoggedInUserObject] = useState({})

  function updateAvatar() {
    pickImage()
      .then((newAvatarURI) => {
        console.log(newAvatarURI, "<< newAvatarURI");
        setGroupImage(newAvatarURI);
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
    
    addDoc(collection(db, 'groups'), {
      group_name: groupName,
      group_img_url: 'test',
      created_at: new Date
    })
    .then((newGroup) => {
      return Promise.all([
      uploadImage(groupImage, ref(storage, `groups/${newGroup.id}.jpg`))
      .then((newImgUrl) => {
        return Promise.all([
          updateDoc(doc(db, 'groups', newGroup.id), {group_img_url: newImgUrl}),
          groupMembers.forEach((member) => {
            setDoc(doc(db, 'users', member.id, 'groups', newGroup.id), {
              group_id: groupId,
              group_name: groupName,
              group_img_url: newImgUrl
            })
          }),
          setDoc(doc(db, 'users', loggedInUser.uid, 'groups', newGrou.id), {
            group_id: groupId,
              group_name: groupName,
              group_img_url: newImgUrl
          })
        ])
      }),
      groupMembers.forEach((member) => {
        setDoc(doc(db, 'groups', newGroup.id, 'members', member.id), {
          ...member
        })
      }),
      setDoc(doc(db, 'groups', newGroup.id, 'members', loggedInUser.uid), loggedInUserObject),
      setGroupId(newGroup.id)])
    })
    .then(() => {
      navigation.navigate("Group", {groupId: groupId})
    })
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

  return (
    <SafeAreaView style={styles.createGroupContainer}>
      <Pressable
        onPress={() => {
          return navigation.goBack();
        }}
      >
        <Text>Back</Text>
      </Pressable>
      <Pressable>
        <Text>Save</Text>
      </Pressable>

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
        <Text>Tap to choose group photo</Text>
      </Pressable>

      <Input
        value={groupName}
        placeholder="Group Name"
        onChangeText={(e) => {
          setGroupName(e);
        }}
      />

      {searchResults.map((result) => {
        return (
          <View style={styles.friendCard}>
            <Image source={{ uri: result.avatarImgURL }} style={styles.friendIcon} />
            <Text>{result.username}</Text>

            <Button
              style={styles.addButton}
              buttonStyle={
                groupMembers.some((member) => {
                  return member.id === result.id;
                })
                  ? {
                      backgroundColor: "#198754",
                      borderColor: "black",
                      borderWidth: 2,
                      borderRadius: 50,
                      height: 40,
                      width: 40,
                    }
                  : {
                      backgroundColor: "white",
                      borderColor: "black",
                      borderWidth: 2,
                      borderRadius: 50,
                      height: 40,
                      width: 40,
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
        title="Create Group"
        disabled={(groupName !== '' && groupImage !== '' )? false : true}
      />
    </SafeAreaView>
  );
};
