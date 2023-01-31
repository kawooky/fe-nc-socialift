import { Pressable, SafeAreaView, Text, View } from "react-native"
import { Button, Input, SearchBar } from "@rneui/themed"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {styles} from './CreateGroupStyles'

import {
	faUserGroup
} from '@fortawesome/free-solid-svg-icons';


export const CreateGroup = ({navigation}) => {

    const [groupImage, setGroupImage] = useState('')
    const [groupName, setGroupName] = useState('')
    const [searchFriends, setSearchFriends] = useState('')
    const [groupMembers, setGroupMembers] = useState([])
    

    const handleGroupCreate = () => {
        console.log('creating group...')
    }

    return (
    <SafeAreaView>
        <View><Text onPress={() => {
            return navigation.goBack()
        }}>Back</Text><Text>Save</Text></View>
        <View>


            <Text>Actual Group Creation Stuff</Text>

            <Pressable>
                <FontAwesomeIcon icon={faUserGroup} size={48} style={styles.groupImage}/>
            </Pressable>

            <Input 
            value={groupName}
            placeholder="Group Name"
            onChangeText={(e) => {
                setGroupName(e)
            }}/>
            
            <SearchBar 
            placeholder="Add Friends To Group"
            lightTheme={true}
            value={searchFriends}
            onChangeText={setSearchFriends}
            />

            
            
            <Button
            variant="contained"
            onPress={() => {
              handleGroupCreate()
            }}
            title="Create Group"
            disabled={false}
          />
        </View>
    </SafeAreaView>)
}
