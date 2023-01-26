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
			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					height: '4vh',
				}}
			>
				<FontAwesomeIcon icon={faHouse} size="s" style={styles.icon} />
				<FontAwesomeIcon icon={faUserGroup} size="s" style={styles.icon} />
				<FontAwesomeIcon icon={faBookOpen} size="s" style={styles.icon} />
				<FontAwesomeIcon icon={faMessage} size="s" style={styles.icon} />
				<FontAwesomeIcon icon={faUser} size="s" style={styles.icon} />
			</View>
		</View>
	);
};

export default NavBar;
