import React from 'react';
import { View, Pressable } from 'react-native';
import { styles } from './NavBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faHouse,
	faUserGroup,
	faBookOpen,
	faMessage,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { getFirebase } from '../../firebase';



const NavBar = ({navigation, user}) => {
	const { auth } = getFirebase();

	const loggedInUser = auth.currentUser

	return (
		<View style={styles.footer}>
			<Pressable onPress={() => navigation.navigate("Home")}><FontAwesomeIcon icon={faHouse} size={32} style={styles.icon} /></Pressable>
			<Pressable onPress={() => navigation.navigate("AddFriends")}><FontAwesomeIcon icon={faUserGroup} size={32} style={styles.icon} /></Pressable>
			<Pressable onPress={() => navigation.navigate("WorkoutLog")}><FontAwesomeIcon icon={faBookOpen} size={32} style={styles.icon} /></Pressable>
			<Pressable onPress={() => navigation.navigate("Profile", {userId: loggedInUser.uid})}><FontAwesomeIcon icon={faUser} size={32} style={styles.icon} /></Pressable>

		</View>
	);
};

export default (NavBar);
