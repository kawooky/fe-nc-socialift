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


    //for the bar chart
    // const chartLabels= [...tableTitle]
    const legend = ['Squat', 'Deadlift', 'Bench Press']
    const chartData = members.map((member)=>{
      return [ member.squatMax, member.chestMax, member.deadliftMax ]})

    //   console.log(chartLabels, '<<<chart labels')
    // console.log(chartData, '<<<chart data')

    const chartLabels = members.map((member)=>{
      return member.username})









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
          
        <Button >Edit Group</Button>
        </View>

        { graphOrTable === 'graph' && (
          <Button 
          onPress={()=>{
            setGraphOrTable('table')
            console.log(chartLabels, '<<<chart labels')
            console.log(chartData, '<<<chart data')
          }}
        title='Switch to table'/>
        )}
        { graphOrTable === 'table' && (
          <Button 
          onPress={()=>{
            setGraphOrTable('graph')
            console.log(loggedInUser, '<<<logged in user')
            console.log(loggedInUserName, '<<<name')

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





      {/* <StackedBarChart
  data={chartData}
  width={340}
  height={220}
  strokeWidth={16}
  radius={20}
  style={{
    marginVertical: 8,
    borderRadius: 16
  }}
  hideLegend={false}
/> */}
{/* <StackedBarChart
    data={{
        labels: chartLabels,
        legend: legend,
        data: {chartData},
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
    }}
    width={Dimensions.get("window").width - 50} // from react-native
    height={220}
    yAxisLabel={"Rp"}
    chartConfig={{
    backgroundColor: "blue",
    backgroundGradientFrom: "blue",
    backgroundGradientTo: "blue",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `white`,
    labelColor: (opacity = 1) => `white`,
    style: {
        borderRadius: 16
    }
    }}
    style={{
    marginVertical: 8,
    borderRadius: 16
    }}
/> */}







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

        <NavBar navigation={navigation}/>

        </View>
    )
}
