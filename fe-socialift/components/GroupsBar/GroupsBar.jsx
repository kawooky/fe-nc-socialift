import { Image, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../HomePage/HomePageStyle";


export const GroupsBar = ({groups}) => {
    return (<ScrollView
        horizontal={true}
        style={homeStyles.groupBar}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        {groups.map((group) => {
          return (
            <View key={group.name} style={homeStyles.groupItem}>
              <Image
                source={{ uri: group.img_url }}
                style={homeStyles.groupIcon}
              />
              <Text numberOfLines={1} style={homeStyles.groupName}>
                {group.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>)
}