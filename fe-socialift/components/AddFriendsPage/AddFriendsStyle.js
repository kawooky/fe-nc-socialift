import { StyleSheet, Dimensions } from 'react-native';

const mainAreaHeight = Dimensions.get('window').height - 100 - 75 - 5;

const AddFriendsstyles = StyleSheet.create({
	main: {
		width: '100%',
		maxHeight: mainAreaHeight,
	},
	result: {
		width: "100%",
		borderWidth: 1,
		borderColor: '#9e9d9b',
		alignItems: "center",
		marginBottom: 10,
		backgroundColor: '#36373A',
		borderRadius: 10,
		paddingBottom: 10
	},
	icon: {
		height: 75,
		width: 75,
		borderRadius: 100,
	},
	button: {
		width: 340,
		alignItems: "center",
		margin: 5,
		borderRadius: 10
	},
	text: {
		marginTop: 10,
		fontWeight: 'bold',
		display: 'flex',
		justifyContent: 'center',
		fontSize: 17,
	},
	banner: {
		width: "100%",
		backgroundColor: '#222322',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginBottom: 10
	  },
	  buttonGroup: {
		width: 460,
		flexDirection: "column",
		marginBottom: 15,
		justifyConten: "center",
		alignItems: "center"
	  },

	  username: {
		margin: 5,
	   fontSize: 20,
	   color: '#f4f4f5'
	  },
});

export { AddFriendsstyles };
