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
  getFirestore,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { getFirebase } from "../../firebase";
import { pickImage } from "../../utils/pick-and-upload-images";

export const CreateGroup = ({ navigation }) => {
  const [groupImage, setGroupImage] = useState("");
  const [groupName, setGroupName] = useState("");
  const [searchFriends, setSearchFriends] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

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

  const { auth } = getFirebase();
  const db = getFirestore();
  // const loggedInUser = auth.currentUser.uid
  const loggedInUser = "wCFrOUI00RVNkskYoU51UNbXAew1";

  const handleGroupCreate = () => {
    console.log("creating group...");
  };

  const retrieveSearchResults = () => {
    const friendsRef = collection(db, "users", loggedInUser, "friends");

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
  });

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
            <Image source={{ uri: result.img_url }} style={styles.friendIcon} />
            <Text>{result.name}</Text>

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
        disabled={false}
      />
    </SafeAreaView>
  );
};
