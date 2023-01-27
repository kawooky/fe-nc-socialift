import React from 'react';
import { View } from 'react-native';
import { styles } from './NavBarStyle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faHouse,
	faUserGroup,
	faBookOpen,
	faMessage,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
	return (
		<View style={styles.footer}>
				<FontAwesomeIcon icon={faHouse} size={32} style={styles.icon} />
				<FontAwesomeIcon icon={faUserGroup} size={32} style={styles.icon} />
				<FontAwesomeIcon icon={faBookOpen} size={32} style={styles.icon} />
				<FontAwesomeIcon icon={faMessage} size={32} style={styles.icon} />
				<FontAwesomeIcon icon={faUser} size={32} style={styles.icon} />
		</View>
	);
};

export default NavBar;
