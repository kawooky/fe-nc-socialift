import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { getFirebase } from "../../firebase";
import { styles } from '../someDefaultStyles'
import { homeStyles } from "./HomePageStyle";
import NavBar from "../NavBar/NavBar"
import {  } from "@rneui/themed";

export const HomePage = ({ navigation }) => {
  const {auth} = getFirebase()

  const groups = [
    {
      name: 'Make Group',
      img_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///+1tbW9vb2Xl5eSkpLNzc2xsbH6+vq5ubmPj4+tra3n5+c4ODg9PT0nJycxMTEfHx99fX2FhYUXFxdTU1Pp6ene3t5ZWVmoqKhLS0vY2NihoaFlZWUODg5FRUXHx8cUFBR0dHT1zzs3AAADOklEQVR4nO3ci3LaMBBAUYvYYAwO4RUgL1L+/yOb0E6nTXhoVx525d7zAZ29U4NFbKkoAAAAAAAAAAA31i6b8qhqFg/Ww3RuvhiGfw2Xfap8G9XhhPHKerCulKfyjl6sR+vEanM2MITp3Hq8dE8nL9A/6rX1gKmeLvZ9yjyxvRoYwr31kEkeIwofrYdMMYoIDGFiPabePiowhNZ6ULWv65hz7qwH1Yr9LwxhZj2q0iS6sLQeVSnmi/SXjfWoOjH3wrwv04WgcGs9rEr8xzCExnpYlTtBYZ43fUnh2HpYFUlhnvd8Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aMw/8KxoNDBu4mzbbUbDSRGU0HhVPhv75ptp7veZi+XdthZ2ZRdRe5jN4bc3nsnu8JerDMuSt+pcR+/acLGNHHD9PUNkubqpCt1az1+lCd94Mx69jj1m7pQckez9KwN9P0t+jfllptMrtEjXaFk35I11a6i+eWjAnypNQs4yeY6ewtFod/V6ClDRaH1zELywLn1yEI/xIWv1iMLvYoLl9YjCy3FhY31yELyZU1lPbJQRSGF7lH4Xf+/S/tf2P81TU6/8D8pfiBajywkD/wPfh/m9Rv/oChcZfV3GtUfhXfWYwvoDkJ9sx5bQBV46exYb9THTHl8tn2K+rlFLnf9OuHE5bX18FH2+sCrpwB7kPYMuCgevD9D3KQfSOj7EdQuue9D+26dcda4qxMlW5fvRD2XnZ7MP9tWE0fvtU06fq9NJ7N3ExX6/34phRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lGYf2H/300cCApH1sOqSPZN6fYtWTsICuV7XD1oBYWdvrF9O/FHLk6tR1UaRRfm+TEsin3fL9KieI4MfLceVC1261snJ8naiFu45Xm7/y3m6/TResgkMWfYJm2QtHf9AJG19YipriTW2Qd+LN4ufRY3DnagdeD82ibXtcw3D4OTG6YH+hOO/Zkvvh4GM1xmu1Q7q1025VHVHPpXBwAAAAAAAADu/QSUjkQ29VZYFgAAAABJRU5ErkJggg=='
    },
    {
      name: 'NorthLifters',
      img_url: 'https://pbs.twimg.com/profile_images/1333392601450426370/x_DT51WI_400x400.jpg'
    },
    {
      name: 'Team 2',
      img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlxIwUweoKKGupq0ObLDFlNZ2rTmv0wg89Q&usqp=CAU'
    },
    {
      name: 'Another Group I Guess',
      img_url: 'https://emojipedia-us.s3.amazonaws.com/source/skype/289/b-button-blood-type_1f171-fe0f.png'
    },
    {
      name: 'Another Group I Guess',
      img_url: 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403'
    },
    {
      name: 'Another Group I Guess',
      img_url: 'https://i.natgeofe.com/n/1bba50e5-3a3f-490f-92ca-5803bca65a61/american-alligator_thumb_4x3.JPG'
    }
  ]

  return <SafeAreaView style={styles.mainView}>
            

            
              <ScrollView horizontal={true} style={homeStyles.groupBar} contentContainerStyle={{flexGrow: 1, alignItems: "center"}}>
                {groups.map((group) => {
                  return  (
                            <View key={group.name} style={homeStyles.groupItem}>

                              <Image source={{uri: group.img_url}} style={homeStyles.groupIcon}/>
                              <Text numberOfLines={1} style={homeStyles.groupName}>{group.name}</Text>
                            </View>
                            
                          )
                  })}
              </ScrollView>
              
              <NavBar />
          </SafeAreaView>;
};
