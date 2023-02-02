import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button } from "@rneui/themed";
import { Image, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../HomePage/HomePageStyle";
import { faThumbsUp, faComment, faCommentAlt, faCar} from "@fortawesome/free-regular-svg-icons";
import { styles } from "../someDefaultStyles";

const posts = [
    {
      id: 301,
      type: "record",
      user: "dave",
      user_img_url:
        "https://www.biography.com/.image/t_share/MTY3MDUxMjkzMjI1OTIwMTcz/brad-pitt-attends-the-premiere-of-20th-century-foxs--square.jpg",
      date: "2023-01-12",
      exercise: "deadlift",
      weight: 240,
      units: "kg",
      reps: 1,
      notes: "Ate a can of spinach, did a deadlift, simple as.",
      likes: 4,
      comments: 3,
    },
    {
      id: 302,
      type: "logged-workout",
      user: "bohdan",
      user_img_url:
        "https://www.themoviedb.org/t/p/w500/dhv9f3AaozOjpvjAwVzOWlmmT2V.jpg",
      date: "2023-01-12",
      exercises: [{name: "Bicep Curl",
                  sets: 3,
                  average_reps: 12,
                  average_weight: 50,
                  units: 'kg'},
                  {name: "Weighted Squat",
                  sets: 5,
                  average_reps: 20,
                  average_weight: 150,
                  units: 'lbs'}],
      notes: "Need to make this one more than two lines long so I can test the ellipsis so I'm just going to keep typing. How are you today? Ate a can of spinach, did a deadlift, simple as.",
      likes: 10,
      comments: 6,
    },
    {
      id: 303,
      type: "fun-fact",
      user: "Youssuf",
      user_img_url:
        "https://media.glamourmagazine.co.uk/photos/62f626a5dc784b31f0d5d424/1:1/w_1920,h_1920,c_limit/OSCAR%20ISAAC%20PDA%20120822%20default-sq-GettyImages-1387215087.jpg",
      date: "2023-01-16",
      fact: {exercise: "bench press",
      timespan: "year",
      weight: 3107,
      units: 'kg',
      comparison: 'BMW M3',
      icon: faCar,
      n: 1.7},
      likes: 4,
      comments: 3,
    }
  ];

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
            <View style={{marginLeft: 7}}>
              <Text style={homeStyles.textName}>{post.user}</Text>
              <Text style={homeStyles.text}>{post.date}</Text>
            </View>
          </View>
          <View style={homeStyles.postStatusDetails}>
            {post.type === 'record' && (<><Text style={homeStyles.text}>
              {post.user} set a new record for their {post.exercise}!{" "}
              {post.weight}
              {post.units} for {post.reps} rep(s)!
            </Text>
            <Text style={homeStyles.text} numberOfLines={2}>"{post.notes}"</Text>
            </>
            )}
            {post.type === 'logged-workout' && (
            <><Text style={homeStyles.text} numberOfLines={7}>
              {post.user} logged a new workout!
            
            {post.exercises.map((exercise) => {
              return <>{'\n\n'}{exercise.sets} set(s) of {exercise.name} {'\n'}Average reps: {exercise.average_reps} {'\n'}Average weight: {exercise.average_weight}{exercise.units}</>
            })}
            </Text>
            
            <Text  style={homeStyles.text} numberOfLines={3}>{'\n'}{post.notes}</Text></>)}
            {post.type === 'fun-fact' && (
              <>
                <Text style={homeStyles.text}>{post.user} has {post.fact.exercise}ed {post.fact.weight}{post.fact.units} this {post.fact.timespan}! That's equivalent to {post.fact.n} {post.fact.comparison}(s)!</Text>
                <ScrollView pointerEvents="none" horizontal contentContainerStyle={{justifyContent: "flex-start"}} style={{alignSelf: 'center', overflow: 'hidden', maxHeight: 50, width: post.fact.n*45}}>
                {[...Array(Math.ceil(post.fact.n))].map(() => <FontAwesomeIcon color="white" icon={post.fact.icon} size={40} style={{margin: 2.5}} fixedWidth />)}
                </ScrollView>
              </>
            )}
          </View>
          <View style={homeStyles.postLikesComments}>
            
            <Button
              color="#49BF87"
              buttonStyle={homeStyles.button}
              title={
                <Text >
                  {post.likes} <FontAwesomeIcon icon={faThumbsUp} />
                </Text>
              }
              disabled={false}
            />
            
            <Button
            color="#49BF87"
              buttonStyle={homeStyles.button}
              title={
                <Text >
                  {post.comments} <FontAwesomeIcon icon={faCommentAlt} />
                </Text>
              }
              disabled={false}
            />
            
          </View>
        </View>
      );
    })}
    <Text style={{margin: 10}}>End of posts</Text>
  </ScrollView>
}