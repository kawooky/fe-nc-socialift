import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    Image,
    Picker,
    Dimensions,
    ScrollView,
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
        
        <View style={styles.banner}>

        {/* <View style={styles.membersContainer}> */}
        <ScrollView
        horizontal={true}
        style={{padding: 10}}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >

                {members.map((member)=>{
                  return (

                    <View>
                      <Image
                      alt={member.username}
                      key={member.username}
                      style={styles.membersPics}
                      source={member.avatarImgURL}
                      />

                    </View>
                  )
                  })}

      </ScrollView>
        
        <View style={{flexDirection:"row"}}>
                  <Button
                  style={{width: 160, padding: 5 }}
        color="#49BF87"
          onPress={()=>{
            navigation.navigate('GroupMessaging', {groupId, groupName: groupObj.group_name , loggedInUserName, groupImage: groupObj.group_img_url})
          }}
          title='Message'/>

          <Button 
          style={{width: 160 , padding: 5}}
          color="#49BF87"
          onPress={() => {navigation.navigate("CreateGroup", {groupId})}}>Edit Group</Button>

        </View>
        </View>






        { graphOrTable === 'graph' && (
          <View style={styles.graphContainer}>
          <Button 
          style={{paddingBottom: 20}}
          color="#49BF87"
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
          width= {500}
          // {Dimensions.get("window").width - 70} // from react-native
          height={230}
          strokeWidth={16}
          radius={20}
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
          marginVertical: 10,
          marginHorizontal: 10,
          borderRadius: 16
          }}
          /> 
          </View>
          )
          }



        { graphOrTable === 'table' && (
          <View style={styles.graphContainer}>
          <Button 
          style={{paddingBottom: 20}}
          color="#49BF87"
          onPress={()=>{
            setGraphOrTable('graph')
            console.log(loggedInUser, '<<<logged in user')
            console.log(loggedInUserName, '<<<name')

          }}
        title='Switch to graph'/>
      <View styles={{paddingTop: 50}}>
        <Table borderStyle={{borderWidth: 1, minWidth:600, borderColor:"#f4f4f5"}}>
          <Row data={tableHead}  style={styles.tableHead} textStyle={styles.tableText}/>
          <TableWrapper style={{flexDirection: 'row'}} >
            <Col flexArr={[2]}data={tableTitle} style={styles.tableRows} textStyle={styles.tableText}/>
            <Rows data={tableData} style={styles.tableRows} textStyle={styles.tableText}/>
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
