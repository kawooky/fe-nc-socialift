import { StyleSheet, Dimensions } from 'react-native';

const mainAreaHeight = Dimensions.get('window').height - 100 - 75 - 5;

const AddFriendsstyles = StyleSheet.create({
	main: {
		width: '100%',
		maxHeight: mainAreaHeight,
	},
	result: {
		borderWidth: 1,
		borderColor: '#9e9d9b',
		display: 'flex',
		padding: 5,
		marginBottom: 5,
		backgroundColor: '#f2f2f2',
	},
	icon: {
		height: 50,
		width: 50,
		borderRadius: 100,
	},
	button: {
		width: '60%',
		marginHorizontal: 100,
	},
	text: {
		fontWeight: 'bold',
		display: 'flex',
		justifyContent: 'center',
		fontSize: 17,
	},
});

export { AddFriendsstyles };
