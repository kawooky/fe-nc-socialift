import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { AddFriendsstyles } from './AddFriendsStyle';
import { styles } from '../someDefaultStyles';
import { SearchBar, Card, Button } from '@rneui/themed';
import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';

export const AddFriendsPage = () => {
	const [search, setSearch] = useState('');
	const [resultsVisible, setResultsVisible] = useState(true);
	const [fetchedUsers, setFetchedUsers] = useState([]);

	const db = getFirestore();
	const usersColRef = collection(db, 'users');

	const searchResults = [
		{
			id: 1,
			name: 'Alan',
			user_img_url:
				'https://static.independent.co.uk/2022/11/01/19/newFile.jpg',
		},
		{
			id: 2,
			name: 'Mike',
			user_img_url:
				'https://cdn.vox-cdn.com/thumbor/c_0rq2VdOQREgRRlHg3TqWcdG10=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24387084/1357388423.jpg',
		},
		{
			id: 3,
			name: 'Harold',
			user_img_url:
				'https://static.wikia.nocookie.net/villainsfanon/images/4/4e/Troll-Face-Meme-PNG.png',
		},
	];

	useEffect(() => {
		onSnapshot(usersColRef, (results) => {
			const fetchedData = results.docs.map((doc) => {
				return { ...doc.data() };
			});
			setFetchedUsers(fetchedData);
		});
	}, []);

	return (
		<SafeAreaView style={styles.mainView}>
			<ScrollView style={{ width: '100%' }}>
				<View>
					<SearchBar
						placeholder="Search for friends..."
						lightTheme={true}
						value={search}
						onChangeText={setSearch}
					/>
				</View>
				{resultsVisible ? (
					<View>
						<Card>
							<Card.Title>Search results:</Card.Title>
							<Card.Divider />
							{searchResults.map((user) => {
								return (
									<View style={AddFriendsstyles.result} key={user.id}>
										<Text style={AddFriendsstyles.text}>{user.name}</Text>
										<Button size="sm" style={AddFriendsstyles.button}>
											Add friend
										</Button>
										<Image
											source={{ uri: user.user_img_url }}
											style={AddFriendsstyles.icon}
										/>
									</View>
								);
							})}
						</Card>
					</View>
				) : null}
				{fetchedUsers ? (
					<View>
						<Card>
							<Card.Title>Friends list:</Card.Title>
							{fetchedUsers.map((user, index) => {
								return (
									<View style={AddFriendsstyles.result} key={index}>
										<Text style={AddFriendsstyles.text}>
											{user.userDetails.username}
										</Text>
										<Button
											size="sm"
											color="#249e45"
											style={AddFriendsstyles.button}
										>
											View Profile
										</Button>
										<Image
											source={{ uri: user.userDetails.avatarImgURL }}
											style={AddFriendsstyles.icon}
										/>
									</View>
								);
							})}
						</Card>
					</View>
				) : null}
			</ScrollView>
			<NavBar />
		</SafeAreaView>
	);
};
