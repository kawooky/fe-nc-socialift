import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button } from "@rneui/themed";
import { Image, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../HomePage/HomePageStyle";
import { faThumbsUp, faComment, faCommentAlt} from "@fortawesome/free-regular-svg-icons";


export const Feed = ({posts}) => {
    return <ScrollView
    style={{width: "100%"}}
    contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
  >
    {posts.map((post) => {
      return (
        <View key={post.id} style={homeStyles.post}>
          <View style={homeStyles.postUserDetails}>
            <Image
              source={{ uri: post.user_img_url }}
              style={homeStyles.groupIcon}
            />
            <View>
              <Text>{post.user}</Text>
              <Text>{post.date}</Text>
            </View>
          </View>
          <View style={homeStyles.postStatusDetails}>
            {post.type === 'record' && (<><Text>
              {post.user} set a new record for their {post.exercise}!{" "}
              {post.weight}
              {post.units} for {post.reps} rep(s)!
            </Text>
            <Text numberOfLines={2}>"{post.notes}"</Text>
            </>
            )}
            {post.type === 'logged-workout' && (
            <><Text numberOfLines={7}>
              {post.user} logged a new workout!
            
            {post.exercises.map((exercise) => {
              return <>{'\n\n'}{exercise.sets} set(s) of {exercise.name} {'\n'}Average reps: {exercise.average_reps} {'\n'}Average weight: {exercise.average_weight}{exercise.units}</>
            })}
            </Text>
            
            <Text numberOfLines={3}>{'\n'}{post.notes}</Text></>)}
            {post.type === 'fun-fact' && (
              <>
                <Text>{post.user} has {post.fact.exercise}ed {post.fact.weight}{post.fact.units} this {post.fact.timespan}! That's equivalent to {post.fact.n} {post.fact.comparison}(s)!</Text>
                <ScrollView pointerEvents="none" horizontal contentContainerStyle={{justifyContent: "flex-start"}} style={{alignSelf: 'center', overflow: 'hidden', maxHeight: 50, width: post.fact.n*45}}>
                {[...Array(Math.ceil(post.fact.n))].map(() => <FontAwesomeIcon icon={post.fact.icon} size={40} style={{margin: 2.5}} fixedWidth />)}
                </ScrollView>
              </>
            )}
          </View>
          <View style={homeStyles.postLikesComments}>
            <View style={homeStyles.button}>
            <Button
              style={homeStyles.button}
              title={
                <Text>
                  {post.likes} <FontAwesomeIcon icon={faThumbsUp} />
                </Text>
              }
              disabled={false}
            />
            </View>
            <View style={homeStyles.button}>
            <Button
              style={homeStyles.button}
              title={
                <Text>
                  {post.comments} <FontAwesomeIcon icon={faCommentAlt} />
                </Text>
              }
              disabled={false}
            />
            </View>
          </View>
        </View>
      );
    })}
    <Text style={{margin: 10}}>End of posts</Text>
  </ScrollView>
}