import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { AddFriendsstyles } from './AddFriendsStyle';
import { styles } from '../someDefaultStyles';
import { SearchBar, Card, Button } from '@rneui/themed';
import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import {
	collection,
	onSnapshot,
	getFirestore,
	setDoc,
	getDoc,
	getDocs,
	doc,
} from 'firebase/firestore';
import { GroupsBar } from '../GroupsBar/GroupsBar';
import { getFirebase } from '../../firebase';
import { FriendsList } from '../FriendsList/FriendsList';

export const AddFriendsPage = ({ navigation }) => {
	const [search, setSearch] = useState('');
	const [resultsVisible, setResultsVisible] = useState(true);
	const [fetchedUsers, setFetchedUsers] = useState([]);
	const [friendsList, setFriendsList] = useState([]);
	const [loggedInUserObject, setLoggedInUserObject] = useState({});
	const [friends, setFriends] = useState([]);

	const db = getFirestore();
	const { auth } = getFirebase();
	const usersColRef = collection(db, 'users');
	const loggedInUser = auth.currentUser;

	//gets users from firestore
	useEffect(() => {
		onSnapshot(usersColRef, (results) => {
			const fetchedData = results.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			if (search === '') {
				setFetchedUsers(
					fetchedData.filter((user) => {
						return (
							user.id !== loggedInUser.uid &&
							!friendsList
								.map((friend) => {
									return friend.id;
								})
								.includes(user.id)
						);
					})
				);
			} else {
				const filteredData = fetchedData.filter((user) => {
					if (user.username.includes(search)) {
						return user;
					}
				});

				setFetchedUsers(filteredData);
			}
		});
	}, [search, friendsList]);

	useEffect(() => {
		onSnapshot(collection(db, 'users', loggedInUser.uid, 'friends'), (friends) => {
			const friendsData = friends.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			setFriendsList(friendsData);
		})
	}, []);

	useEffect(() => {
		getDoc(doc(db, 'users', loggedInUser.uid)).then((user) => {
			setLoggedInUserObject({ ...user.data(), id: user.id });
		});
	}, []);

	//get friends list
	

	//functions
	const updateSearch = (search) => {
		setSearch(search);
	};

	const handleAddUser = (user) => {
		setDoc(doc(db, 'users', loggedInUser.uid, 'friends', user.id), user);
		setDoc(
			doc(db, 'users', user.id, 'friends', loggedInUser.uid),
			loggedInUserObject
		);
	};

	return (
		<SafeAreaView style={styles.mainView}>
				<GroupsBar navigation={navigation} />
			<ScrollView style={{ width: '100%',
		maxWidth: 420}}>
				<View>
					<SearchBar
						placeholder="Search for friends..."
						lightTheme={true}
						value={search}
						onChangeText={updateSearch}
					/>
				</View>

					<FriendsList fetchedUsers={fetchedUsers} friendsList={friendsList} handleAddUser={handleAddUser} navigation={navigation}/>
				
			</ScrollView>
			<NavBar navigation={navigation} />
		</SafeAreaView>
	);
};
