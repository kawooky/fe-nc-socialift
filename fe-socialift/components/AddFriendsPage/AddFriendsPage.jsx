import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { AddFriendsstyles } from './AddFriendsStyle';
import { styles } from '../someDefaultStyles';
import { SearchBar, Card, Button } from '@rneui/themed';
import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { collection, onSnapshot, getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';
import { GroupsBar } from '../GroupsBar/GroupsBar'
import { getFirebase } from '../../firebase';

export const AddFriendsPage = ({navigation}) => {
	const [search, setSearch] = useState('');
	const [resultsVisible, setResultsVisible] = useState(true);
	const [fetchedUsers, setFetchedUsers] = useState([]);
	const [friendsList, setFriendsList] = useState([]);
	const [loggedInUserObject, setLoggedInUserObject] = useState({})
	const [friendsStatic, setFriendsStatic] = useState([
		{
			
				avatarImgURL:
					'https://static.independent.co.uk/2022/11/01/19/newFile.jpg',
				createdAt: '',
				profileVisible: true,
				username: 'Alan',
			
		},
		{
			
				avatarImgURL:
					'https://cdn.vox-cdn.com/thumbor/c_0rq2VdOQREgRRlHg3TqWcdG10=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24387084/1357388423.jpg',
				createdAt: '',
				profileVisible: true,
				username: 'Mike',
			
		},
		{
			
				avatarImgURL:
					'https://static.wikia.nocookie.net/villainsfanon/images/4/4e/Troll-Face-Meme-PNG.png',
				createdAt: '',
				profileVisible: true,
				username: 'Harold',
			
		},
	]);
	
	
	const db = getFirestore();
	const { auth } = getFirebase();
	const usersColRef = collection(db, 'users');
	const loggedInUser = auth.currentUser

	const groups = [
		{
			name: 'NorthLifters',
			img_url:
				'https://pbs.twimg.com/profile_images/1333392601450426370/x_DT51WI_400x400.jpg',
		},
		{
			name: 'Team 2',
			img_url:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlxIwUweoKKGupq0ObLDFlNZ2rTmv0wg89Q&usqp=CAU',
		},
		{
			name: 'Another Group I Guess',
			img_url:
				'https://emojipedia-us.s3.amazonaws.com/source/skype/289/b-button-blood-type_1f171-fe0f.png',
		},
		{
			name: 'One More Group I Guess',
			img_url:
				'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403',
		},
		{
			name: 'Guess I lied, this is the last Group I Guess',
			img_url:
				'https://i.natgeofe.com/n/1bba50e5-3a3f-490f-92ca-5803bca65a61/american-alligator_thumb_4x3.JPG',
		},
	];

	//gets users from firestore
	useEffect(() => {
		onSnapshot(usersColRef, (results) => {
			const fetchedData = results.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			if (search === '') {
				setFetchedUsers(fetchedData.filter((user) => {
					return user.id !== loggedInUser.uid
				}))
			} else {
				setFriendsList(fetchedData[0].friends);
				const filteredData = fetchedData.filter((user) => {
					if (user.username.includes(search)) {
						return user;
					}
				});
				setFetchedUsers(filteredData);
			}
		});
	}, [search]);

	useEffect(() => {
		getDoc(doc(db, "users", loggedInUser.uid))
		.then((user) => {
			setLoggedInUserObject({...user.data()})
		})
	}, [])

	//functions
	const updateSearch = (search) => {
		setSearch(search);
		// if (!resultsVisible) {
		// 	setResultsVisible(true);
		// }
		// if (!search) {
		// 	setResultsVisible(false);
		// }
	};

	const handleAddUser = (user) => {
		console.log(user + '<<< friend to add')
		console.log(loggedInUserObject + '<<< user adding friend')
		setDoc(doc(db, 'users', loggedInUser.uid, 'friends', user.id), user)
		setDoc(doc(db, 'users', user.id, 'friends', loggedInUser.uid), loggedInUserObject)
	}

	return (
		<SafeAreaView style={styles.mainView}>
			<ScrollView style={{ width: '100%' }}>
				<GroupsBar groups={groups} navigation={navigation}/>
				<View>
					<SearchBar
						placeholder="Search for friends..."
						lightTheme={true}
						value={search}
						onChangeText={updateSearch}
					/>
				</View>

				{resultsVisible ? (
					<View>
						<Card>
							<Card.Title>Search results:</Card.Title>
							<Card.Divider />
							{fetchedUsers.map((user, index) => {
								return (
									<View style={AddFriendsstyles.result} key={index}>
										<Text style={AddFriendsstyles.text}>
											{user.username}
										</Text>
										<Button size="sm" style={AddFriendsstyles.button} onPress={() =>{
											handleAddUser(user)
										}} >
											Add Friends
										</Button>
										<Image
											source={{ uri: user.avatarImgURL }}
											style={AddFriendsstyles.icon}
										/>
									</View>
								);
							})}
							<Text>End of results</Text>
						</Card>
					</View>
				) : null}

				<View>
					<Card>
						<Card.Title>Friends list:</Card.Title>
						{friendsStatic.map((user, index) => {
							return (
								<View style={AddFriendsstyles.result} key={index}>
									<Text style={AddFriendsstyles.text}>
										{user.username}
									</Text>
									<Button
										size="sm"
										color="#249e45"
										style={AddFriendsstyles.button}
									>
										View Profile
									</Button>
									<Image
										source={{ uri: user.avatarImgURL }}
										style={AddFriendsstyles.icon}
									/>
								</View>
							);
						})}
					</Card>
				</View>
			</ScrollView>
			<NavBar navigation={navigation}/>
		</SafeAreaView>
	);
};
