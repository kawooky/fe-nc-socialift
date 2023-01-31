import { Text, View, SafeAreaView, Image, ScrollView} from "react-native";
import { getFirebase } from "../../firebase";
import { styles } from "../someDefaultStyles";
import { homeStyles } from "./HomePageStyle";
import NavBar from "../NavBar/NavBar";
import {Feed} from "../Feed/Feed.jsx"
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { GroupsBar } from "../GroupsBar/GroupsBar";

export const HomePage = ({ navigation }) => {
  const { auth } = getFirebase();

  const groups = [
    {
      name: "Make Group",
      img_url:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///+1tbW9vb2Xl5eSkpLNzc2xsbH6+vq5ubmPj4+tra3n5+c4ODg9PT0nJycxMTEfHx99fX2FhYUXFxdTU1Pp6ene3t5ZWVmoqKhLS0vY2NihoaFlZWUODg5FRUXHx8cUFBR0dHT1zzs3AAADOklEQVR4nO3ci3LaMBBAUYvYYAwO4RUgL1L+/yOb0E6nTXhoVx525d7zAZ29U4NFbKkoAAAAAAAAAAA31i6b8qhqFg/Ww3RuvhiGfw2Xfap8G9XhhPHKerCulKfyjl6sR+vEanM2MITp3Hq8dE8nL9A/6rX1gKmeLvZ9yjyxvRoYwr31kEkeIwofrYdMMYoIDGFiPabePiowhNZ6ULWv65hz7qwH1Yr9LwxhZj2q0iS6sLQeVSnmi/SXjfWoOjH3wrwv04WgcGs9rEr8xzCExnpYlTtBYZ43fUnh2HpYFUlhnvd8Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aOQQv8opNA/Cin0j0IK/aMw/8KxoNDBu4mzbbUbDSRGU0HhVPhv75ptp7veZi+XdthZ2ZRdRe5jN4bc3nsnu8JerDMuSt+pcR+/acLGNHHD9PUNkubqpCt1az1+lCd94Mx69jj1m7pQckez9KwN9P0t+jfllptMrtEjXaFk35I11a6i+eWjAnypNQs4yeY6ewtFod/V6ClDRaH1zELywLn1yEI/xIWv1iMLvYoLl9YjCy3FhY31yELyZU1lPbJQRSGF7lH4Xf+/S/tf2P81TU6/8D8pfiBajywkD/wPfh/m9Rv/oChcZfV3GtUfhXfWYwvoDkJ9sx5bQBV46exYb9THTHl8tn2K+rlFLnf9OuHE5bX18FH2+sCrpwB7kPYMuCgevD9D3KQfSOj7EdQuue9D+26dcda4qxMlW5fvRD2XnZ7MP9tWE0fvtU06fq9NJ7N3ExX6/34phRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lFIoX8UUugfhRT6RyGF/lGYf2H/300cCApH1sOqSPZN6fYtWTsICuV7XD1oBYWdvrF9O/FHLk6tR1UaRRfm+TEsin3fL9KieI4MfLceVC1261snJ8naiFu45Xm7/y3m6/TResgkMWfYJm2QtHf9AJG19YipriTW2Qd+LN4ufRY3DnagdeD82ibXtcw3D4OTG6YH+hOO/Zkvvh4GM1xmu1Q7q1025VHVHPpXBwAAAAAAAADu/QSUjkQ29VZYFgAAAABJRU5ErkJggg==",
    },
    {
      name: "NorthLifters",
      img_url:
        "https://pbs.twimg.com/profile_images/1333392601450426370/x_DT51WI_400x400.jpg",
    },
    {
      name: "Team 2",
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlxIwUweoKKGupq0ObLDFlNZ2rTmv0wg89Q&usqp=CAU",
    },
    {
      name: "Another Group I Guess",
      img_url:
        "https://emojipedia-us.s3.amazonaws.com/source/skype/289/b-button-blood-type_1f171-fe0f.png",
    },
    {
      name: "One More Group I Guess",
      img_url:
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
    },
    {
      name: "Guess I lied, this is the last Group I Guess",
      img_url:
        "https://i.natgeofe.com/n/1bba50e5-3a3f-490f-92ca-5803bca65a61/american-alligator_thumb_4x3.JPG",
    },
  ];

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
    },
    {
      id: 304,
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
  ];

  return (
    <SafeAreaView style={styles.mainView}>
      <GroupsBar groups={groups}/>
      <Feed posts={posts}/>
      <NavBar navigation={navigation}/>
    </SafeAreaView>
  );
};
