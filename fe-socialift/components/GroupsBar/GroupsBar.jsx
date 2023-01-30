import { Image, ScrollView, Text, View, Pressable } from "react-native";
import { homeStyles } from "../HomePage/HomePageStyle";


export const GroupsBar = ({groups, navigation}) => {
    return (<ScrollView
        horizontal={true}
        style={homeStyles.groupBar}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        <Pressable style={homeStyles.groupItem} onPress={() => navigation.navigate("CreateGroup")}>
          
          <Image style={homeStyles.groupIcon} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///+1tbW9vb2Xl5eSkpLNzc2xsbH6+vq5ubmPj4+tra3n5+c4ODg9PT0nJycxMTEfHx99fX2FhYUXFxdTU1Pp6ene3t5ZWVmoqKhLS0vY2NihoaFlZWUODg5FRUXHx8cUFBR0dHT1zzs3AAADOklEQVR4nO3ci3LaMBBAUYvYYAwO4RUgL1L+/yOb0E6nTXhoVx525d7zAZ29U4NFbKkoAAAAAAAAAAA31i6b8qhqFg/Ww3RuvhiGfw2Xfap8G9XhhPHKerCulKfyjl6sR+vEanM2MITp3Hq8dE8nL9A/6rX1gKmeLvZ9yjyxvRoYwr31kEkeIwofrYdMMYoIDGFiPabePiowhNZ6ULWv65hz7qwH1Yr9LwxhZj2q0iS6sLQeVSnmi/SXjfWoOjH3wrwv04WgcGs9rEr8xzCExnpYlTtBYZ43fUnh2HpYFUlhnvd8Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aMw/8KxoNDBu4mzbbUbDSRGU0HhVPhv75ptp7veZi+XdthZ2ZRdRe5jN4bc3nsnu8JerDMuSt+pcR+/acLGNHHD9PUNkubqpCt1az1+lCd94Mx69jj1m7pQckez9KwN9P0t+jfllptMrtEjXaFk35I11a6i+eWjAnypNQs4yeY6ewtFod/V6ClDRaH1zELywLn1yEI/xIWv1iMLvYoLl9YjCy3FhY31yELyZU1lPbJQRSGF7lH4Xf+/S/tf2P81TU6/8D8pfiBajywkD/wPfh/m9Rv/oChcZfV3GtUfhXfWYwvoDkJ9sx5bQBV46exYb9THTHl8tn2K+rlFLnf9OuHE5bX18FH2+sCrpwB7kPYMuCgevD9D3KQfSOj7EdQuue9D+26dcda4qxMlW5fvRD2XnZ7MP9tWE0fvtU06fq9NJ7N3ExX6/34phRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lGYf2H/300cCApH1sOqSPZN6fYtWTsICuV7XD1oBYWdvrF9O/FHLk6tR1UaRRfm+TEsin3fL9KieI4MfLceVC1261snJ8naiFu45Xm7/y3m6/TResgkMWfYJm2QtHf9AJG19YipriTW2Qd+LN4ufRY3DnagdeD82ibXtcw3D4OTG6YH+hOO/Zkvvh4GM1xmu1Q7q1025VHVHPpXBwAAAAAAAADu/QSUjkQ29VZYFgAAAABJRU5ErkJggg=="}}/>
          <Text numberOfLines={2} style={homeStyles.groupName}>Create Group</Text>
        
        </Pressable>
        {groups.map((group) => {
          return (
            <Pressable style={homeStyles.groupItem} onPress={() => navigation.navigate("Group", {groupId : group.id})}>
              <Image
                source={{ uri: group.img_url }}
                style={homeStyles.groupIcon}
              />
              <Text numberOfLines={1} style={homeStyles.groupName}>
                {group.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>)
}