import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    Image,
    Picker
  } from "react-native";
  import { styles } from "./GroupPageStyle.js";
  import { Avatar, Button } from '@rneui/themed';
  import React, { useEffect, useState } from 'react';
  import { getFirebase } from "../../firebase.js";
import {collection, getFirestore, getDocs, getDoc, addDoc, doc} from "firebase/firestore"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';





export const GroupPage = ({ route, navigation}) => {
    const [exercise, setExercise] = useState('');
    const [graphOrTable, setGraphOrTable] = useState('table')
    const [groupObj, setGroupObj] = useState({})
    const [members, setMembers] = useState([])
    const db = getFirestore();


    const { auth } = getFirebase();
const loggedInUser = auth.currentUser
const loggedInUserName = loggedInUser.displayName
console.log(loggedInUser, '<<< logged in user')

    const {groupId} = route.params
    console.log(groupId, '<<< params')
  // console.log(groupId)
    useEffect(()=>{
      getDoc(doc(db, 'groups', groupId))
      .then((group)=>{
        setGroupObj(group.data())
      })
      getDocs(collection(db, 'groups', groupId, 'members'))
      .then((members)=>{
        console.log(members.docs[0].data())
        setMembers(members.docs.map((member)=>{
          return member.data()
        }))
      })

    }, [])


    const tableHead = ['Members', 'Squat', 'Deadlift', 'Bench Press', 'Total'];
    const tableTitle = members.map((member)=>{
      return member.username})
    const tableDta = [
      ['qw', 'we', 'r'],
      ['qw', 'wq', 'w'],
    ];
    const tableData = members.map((member)=>{
      return [member.SquatMax, member.ChestMax, member.DeadliftMax, member.SquatMax+ member.ChestMax+ member.DeadliftMax ]
    })


  








    return (

        <View style={styles.mainVeiw }>


            <Text>{groupObj.group_name}</Text>
          <Avatar
                    alt='group picture'
                    rounded
                    source={groupObj.group_img_url}
                    sx={{ width: 100, height: 100 }}
                  />

          <Button
          onPress={()=>{
            navigation.navigate('GroupMessaging', {groupId, groupName: groupObj.group_name})
          }}
          title='Message'/>
        <View style={styles.membersContainer}>
                {members.map((member)=>{
                    return (<Avatar
                    alt={member.username}
                    rounded
                    key={member.username}
                    source={member.avatarImgURL}
                    sx={{ width: 35, height: 35 }}
                  />)
                })}
        <Button >Add to Group</Button>
        </View>

        { graphOrTable === 'graph' && (
          <Button 
          onPress={()=>{
            setGraphOrTable('table')
          }}
        title='Switch to table'/>
        )}
        { graphOrTable === 'table' && (
          <Button 
          onPress={()=>{
            setGraphOrTable('graph')
            console.log(loggedInUser, '<<<logged in user')
          }}
        title='Switch to graph'/>
        )}


      <View>
        <Table>
          <Row data={tableHead} flexArr={[1, 1, 1, 1]} />
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} />
            <Rows data={tableData} flexArr={[1, 1, 1]} />
          </TableWrapper>
        </Table>
      </View> 








        <View style={styles.graphContainer}>
            <Text style={{color:'white'}}>Some Graph </Text>
            <Image
  source={{uri: 'https://www.tibco.com/sites/tibco/files/media_entity/2022-01/LineChart-01.svg'}}
  style={{width: 200, height: 200}}
/>
        </View>
        <View style={styles.pbHistory}>
        <Text style={{color:'white'}}>History</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        </View>


        </View>
    )
}
