import React, { useEffect, useState, useRef } from 'react';
import { View , Text} from 'react-native';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { styles } from "./GroupMessagingPageStyle";
import io from "socket.io-client"
import NavBar from '../NavBar/NavBar';
const socket = io.connect("http://localhost:3001");



export const GroupMessagingPage = ({navigation}) => {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] =useState([])
    const [group, setGroup] = useState("")
    const [name, setName] =useState('')
    const [messageError, setMessageError] = useState('')


    const messageRef = useRef()


    // new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
    useEffect(() => {
      socket.emit('room', group)
      setMessageList([])
    }, [group])

    //socket.emit('room', group)


    

  const sendMessage = () => {
    if(message !==''){
      const timeSent = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      socket.emit("send_message", {name: name, room: group, time: timeSent, message: message})
      setMessageList([...messageList, {sender:'You', message:message, time: timeSent}])
      setMessage('')
    } else {
      setMessageError(()=>{return 'add a message'})
    }
  }

  useEffect(() => {
      socket.on("receive_message", (data)=>{ 
        setMessageList((messageList)=>[...messageList, {sender:'somebody else', message:data.message}])
    })
  }, [socket])
  


  return (
    <View style={styles.mainView}>
        <Input
              value={group}
              placeholder="group"
              onChangeText={(event) => {
                setGroup(event)}}
              errorMessage={''}
              autoCorrect={false}
        />
        <Input
              value={name}
              placeholder="name"
              onChangeText={(event) => {
                setName(event)}}
              errorMessage={''}
              autoCorrect={false}
        />
        <Input
              value={message}
              placeholder="send message"
              onChangeText={(event) => {
                setMessageError('')
                setMessage(event)}}
              // ref={messageRef}
              errorMessage={messageError}
              autoCorrect={false}
            />
        <Button 
              onPress={() => {
                sendMessage()

            }}
            title='send message'/>
        

        {messageList.map((singleMessage, index)=>{
          if (singleMessage.sender === 'You') {
            return (<Text style={styles.sentMessage} key={index}>{`Sender:${singleMessage.sender} Message: ${singleMessage.message}`}</Text>)
          } else {
            return (<Text style={styles.receivedMessage} key={index}>{`Sender:${singleMessage.sender} Message: ${singleMessage.message}`}</Text>)
          }
     
        })}
        


        <NavBar navigation={navigation} />
    </View>
  );
}
