import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { AddFriendsstyles } from './AddFriendsStyle';
import { styles } from '../someDefaultStyles';
import { SearchBar, Card, Button } from '@rneui/themed';
import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { collection, onSnapshot, getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';
import { GroupsBar } from '../GroupsBar/GroupsBar';
import { consoleUrl } from 'firebase-tools/lib/utils';
import { getFirebase } from '../../firebase';

export const AddFriendsPage = () => {
	const [search, setSearch] = useState('');
	const [resultsVisible, setResultsVisible] = useState(false);
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
			name: 'Make Group',
			img_url:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///+1tbW9vb2Xl5eSkpLNzc2xsbH6+vq5ubmPj4+tra3n5+c4ODg9PT0nJycxMTEfHx99fX2FhYUXFxdTU1Pp6ene3t5ZWVmoqKhLS0vY2NihoaFlZWUODg5FRUXHx8cUFBR0dHT1zzs3AAADOklEQVR4nO3ci3LaMBBAUYvYYAwO4RUgL1L+/yOb0E6nTXhoVx525d7zAZ29U4NFbKkoAAAAAAAAAAA31i6b8qhqFg/Ww3RuvhiGfw2Xfap8G9XhhPHKerCulKfyjl6sR+vEanM2MITp3Hq8dE8nL9A/6rX1gKmeLvZ9yjyxvRoYwr31kEkeIwofrYdMMYoIDGFiPabePiowhNZ6ULWv65hz7qwH1Yr9LwxhZj2q0iS6sLQeVSnmi/SXjfWoOjH3wrwv04WgcGs9rEr8xzCExnpYlTtBYZ43fUnh2HpYFUlhnvd8Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aMw/8KxoNDBu4mzbbUbDSRGU0HhVPhv75ptp7veZi+XdthZ2ZRdRe5jN4bc3nsnu8JerDMuSt+pcR+/acLGNHHD9PUNkubqpCt1az1+lCd94Mx69jj1m7pQckez9KwN9P0t+jfllptMrtEjXaFk35I11a6i+eWjAnypNQs4yeY6ewtFod/V6ClDRaH1zELywLn1yEI/xIWv1iMLvYoLl9YjCy3FhY31yELyZU1lPbJQRSGF7lH4Xf+/S/tf2P81TU6/8D8pfiBajywkD/wPfh/m9Rv/oChcZfV3GtUfhXfWYwvoDkJ9sx5bQBV46exYb9THTHl8tn2K+rlFLnf9OuHE5bX18FH2+sCrpwB7kPYMuCgevD9D3KQfSOj7EdQuue9D+26dcda4qxMlW5fvRD2XnZ7MP9tWE0fvtU06fq9NJ7N3ExX6/34phRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lGYf2H/300cCApH1sOqSPZN6fYtWTsICuV7XD1oBYWdvrF9O/FHLk6tR1UaRRfm+TEsin3fL9KieI4MfLceVC1261snJ8naiFu45Xm7/y3m6/TResgkMWfYJm2QtHf9AJG19YipriTW2Qd+LN4ufRY3DnagdeD82ibXtcw3D4OTG6YH+hOO/Zkvvh4GM1xmu1Q7q1025VHVHPpXBwAAAAAAAADu/QSUjkQ29VZYFgAAAABJRU5ErkJggg==',
		},
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
				setFetchedUsers(fetchedData)
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
		if (!resultsVisible) {
			setResultsVisible(true);
		}
		if (!search) {
			setResultsVisible(false);
		}
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
				<GroupsBar groups={groups} />
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
			<NavBar />
		</SafeAreaView>
	);
};
