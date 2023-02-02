import React, { useEffect, useState, useRef } from 'react';
import { View , Text, SafeAreaView, Image} from 'react-native';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { styles } from "./GroupMessagingPageStyle";
import io from "socket.io-client"
import NavBar from '../NavBar/NavBar';
const socket = io.connect("http://localhost:3001");



export const GroupMessagingPage = ({route, navigation}) => {
  const {groupId, groupName, groupImage, loggedInUserName} = route.params

    const [message, setMessage] = useState("");
    const [messageList, setMessageList] =useState([])
    const [group, setGroup] = useState(groupId)
    const [messageError, setMessageError] = useState('')
    



    const messageRef = useRef()

    socket.emit('room', group)


    

  const sendMessage = () => {
    if(message !==''){
      const timeSent = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      socket.emit("send_message", {name: loggedInUserName, room: group, time: timeSent, message: message})
      setMessageList([...messageList, {sender:loggedInUserName, message:message, time: timeSent}])
      setMessage('')
    } else {
      setMessageError(()=>{return 'add a message'})
      messageRef.current.shake()
    }
  }

  useEffect(() => {
      socket.on("receive_message", (data)=>{ 
        setMessageList((messageList)=>[...messageList, {sender:data.name, message:data.message}])
    })
  }, [socket])
  


  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.formView}>
      <View style={styles.banner}>
            <Image
                    alt='group picture'
                    style={styles.profilePic}
                    source={groupImage}
                    />

            <Text style={styles.username} >{groupName}</Text>
        </View>



    <View style={{}}>
        <Input
              value={message}
              placeholder="send message"
              onChangeText={(event) => {
                setMessageError('')
                setMessage(event)}}
              ref={messageRef}
              errorMessage={messageError}
              autoCorrect={false}
              style={{color:"#f4f4f5"}}
            />
        <Button 
        color="#49BF87"
        style={{padding:10}}
              onPress={() => {
                sendMessage()

            }}
            title='send message'/>
    </View>
        

        {messageList.map((singleMessage, index)=>{
          if (singleMessage.sender === 'loggedInUserName') {
            return (<Text style={styles.sentMessage} key={index}>{`${singleMessage.sender}:  ${singleMessage.message}`}</Text>)
          } else {
            return (<Text style={styles.receivedMessage} key={index}>{`${singleMessage.sender}:  ${singleMessage.message}`}</Text>)
          }
     
        })}
        

        </View>
        <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}
