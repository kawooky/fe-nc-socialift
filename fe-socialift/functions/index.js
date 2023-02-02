const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");

initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// updates user's avatar in each group's members collection
// as well as in each user's friends collection
exports.updateUserAvatarEverywhere = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const userId = context.params.userId;
    const newAvatar = change.after.data().avatarImgURL;
    const oldAvatar = change.before.data().avatarImgURL;

    if (newAvatar == oldAvatar) {
      return null;
    }

    const groups = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("groups")
      .get();

    groups.forEach(async (group) => {
      await admin
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("members")
        .doc(userId)
        .update({
          avatarImgURL: newAvatar,
        });
    });

    const friends = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("friends")
      .get();

    friends.forEach(async (friend) => {
      await admin
        .firestore()
        .collection("users")
        .doc(friend.id)
        .collection("friends")
        .doc(userId)
        .update({
          avatarImgURL: newAvatar,
        });
    });
  });

exports.updateGroupEverywhere = functions.firestore
  .document("groups/{groupId}")
  .onUpdate(async (change, context) => {
    const groupId = context.params.groupId;
    const newAvatar = change.after.data().group_img_url;
    const oldAvatar = change.before.data().group_img_url;
    const newName = change.after.data().group_name;
    const oldName = change.before.data().group_name;

    const updateObj = {};

    if (newAvatar == oldAvatar && newName == oldName) {
      return null;
    } else if (newAvatar == oldAvatar && newName != oldName) {
      updateObj.group_name = newName;
    } else if (newAvatar != oldAvatar && newName == oldName) {
      updateObj.group_img_url = newAvatar;
    } else {
      updateObj.group_img_url = newAvatar;
      updateObj.group_name = newName;
    }

    const members = await admin
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("members")
      .get();

    members.forEach(async (member) => {
      await admin
        .firestore()
        .collection("users")
        .doc(member.id)
        .collection("groups")
        .doc(groupId)
        .update(updateObj);
    });
  });
