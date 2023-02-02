import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    Image,
    Picker,
    Dimensions
  } from "react-native";
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import {BarChart, PieChart, StackedBarChart} from "react-native-chart-kit";
  import { styles } from "./GroupPageStyle.js";
  import NavBar from "../NavBar/NavBar";
  import { Avatar, Button } from '@rneui/themed';
  import React, { useEffect, useState } from 'react';
  import { getFirebase } from "../../firebase.js";
import {collection, getFirestore, getDocs, getDoc, addDoc, doc} from "firebase/firestore"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';





export const GroupPage = ({ route, navigation}) => {
  const {groupId} = route.params
  console.log(groupId, '<groupid')

    const [exercise, setExercise] = useState('');
    const [graphOrTable, setGraphOrTable] = useState('table')
    const [groupObj, setGroupObj] = useState({})
    const [members, setMembers] = useState([])
    const db = getFirestore();



    const { auth } = getFirebase();
    const loggedInUser = auth.currentUser
    const loggedInUserName = loggedInUser.displayName
    console.log(loggedInUser, '<<< logged in user')


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

      const { auth } = getFirebase();
const loggedInUser = auth.currentUser
const loggedInUserName = loggedInUser.displayName
console.log(loggedInUser, '<<< logged in user')

    }, [])

    //for the table
    const tableHead = ['Members', 'Squat', 'Deadlift', 'Bench Press', 'Total'];
    const tableTitle = members.map((member)=>{
      return member.username})

    const tableData = members.map((member)=>{
      return [member.squatMax, member.chestMax, member.deadliftMax, member.squatMax+ member.chestMax+ member.deadliftMax ]
    })



      const chartLegend = ['Squat', 'Deadlift', 'Bench Press']
      const chartData = members.map((member)=>{
        return [ member.squatMax, member.chestMax, member.deadliftMax ]})
  

  
      const chartLabels = members.map((member)=>{
        return member.username})



    









    return (

      <SafeAreaView style={styles.mainView}>
        <View style={styles.formView}>


        <View style={styles.banner}>
            <Image
                    alt='group picture'
                    style={styles.profilePic}
                    source={groupObj.group_img_url}
                    />

            <Text style={styles.username} >{groupObj.group_name}</Text>
        </View>

          <Button
          onPress={()=>{
            navigation.navigate('GroupMessaging', {groupId, groupName: groupObj.group_name , loggedInUserName})
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
          
        <Button onPress={() => {navigation.navigate("CreateGroup", {groupId})}}>Edit Group</Button>
        </View>


        { graphOrTable === 'graph' && (
          <View>
          <Button 
          onPress={()=>{
            setGraphOrTable('table')
            console.log(chartLabels, '<<<chart labels')
            console.log(chartData, '<<<chart data')
          }}
          title='Switch to table'/>
          <StackedBarChart
          data={{
          labels: chartLabels,
          legend: chartLegend,
          data: chartData,
          barColors: ["#0000FF", "#1E90FF", "#00BFFF"]
          }}
          width={Dimensions.get("window").width - 50} // from react-native
          height={220}
          yAxisLabel={"Kg"}
          chartConfig={{
            backgroundColor: "#white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
          decimalPlaces: 0,
          color: (opacity = 1) => `black`,
          labelColor: (opacity = 1) => `black`,
          style: {
          borderRadius: 16
          }
          }}
          style={{
          marginVertical: 0,
          borderRadius: 16
          }}
          /> 
          </View>
          )
          
          }







        { graphOrTable === 'table' && (
          <View>
          <Button 
          onPress={()=>{
            setGraphOrTable('graph')
            console.log(loggedInUser, '<<<logged in user')
            console.log(loggedInUserName, '<<<name')

          }}
        title='Switch to graph'/>
      <View>
        <Table>
          <Row data={tableHead} flexArr={[1, 1, 1, 1]} />
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} />
            <Rows data={tableData} flexArr={[1, 1, 1]} />
          </TableWrapper>
        </Table>
      </View> 

    </View>
  )}
        
        


        </View>
        <NavBar navigation={navigation}/>
        </SafeAreaView >
    )
}
