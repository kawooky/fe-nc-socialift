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



  const sendMessage = () => {
    socket.emit("send_message", {message: message})
    setMessageList([...messageList, {sender:'you', message:message}])
    setMessage('')
  }

  useEffect(() => {
      socket.on("receive_message", (data)=>{ 
        setMessageList([...messageList, {sender:'somebody else', message:data.message}])
      setMessageReceived(data.message)
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
              onChangeText={(event) => {setMessage(event)}}
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
