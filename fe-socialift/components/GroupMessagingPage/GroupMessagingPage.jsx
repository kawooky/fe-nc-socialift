import React, { useEffect, useState } from 'react';
import { View , Text} from 'react-native';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { styles } from "./GroupMessagingPageStyle";
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001");



export const GroupMessagingPage = ({navigation}) => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [messageList, setMessageList] =useState([])
    const [counter, setCounter] =useState(0)

    // new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()


  const sendMessage = () => {
    // if(message !==''){

    // }



    socket.emit("send_message", {message: message})
    console.log('sent a message')
    setCounter(counter+1)
    console.log(messageList, '<<<message list in send')
    // setMessageList((messageList)=>{[...messageList, {sender:'you', message:message}]})
    setMessageList([...messageList, {sender:'you', message:message}])
    setMessage('')
  }

  useEffect(() => {
      socket.on("receive_message", (data)=>{ 
        // console.log(data, '<<< received message')
        setMessageList((messageList)=>[...messageList, {sender:'somebody else', message:data.message}])
        // setMessageReceived(data.message)
        // console.log(messageReceived, '<<<message received')
        // console.log(messageList, '<<<message list in receive')
    })
  
    // socket.on("sockets", (data)=>{ 
    //   setSocketIDs(data.socketIDs)
      
    // })

  }, [socket])
  


  return (
    <View>
        <Input
              value={message}
              placeholder="send message"
              onChangeText={(event) => {
                console.log(event, '<<<<event') 
                setMessage(event)
                console.log(message, '<<<message')}}
              errorMessage={''}
              autoCorrect={false}
            />
        <Button 
              onPress={() => {
                sendMessage()
            }}
            title='send message'/>
        

        {messageList.map((singleMessage, index)=>{
            return (<Text key={index}>{`Sender:${singleMessage.sender} Message: ${singleMessage.message}`}</Text>)
        })}
        



    </View>
  );
}
