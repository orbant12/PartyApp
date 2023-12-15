//<********************************************>
//LAST EDITED DATE: 2023.12.03
//EDITED BY: Orban Tamas
//DESCRIPTION: This is the for you page, where the user can see the recommended podcasts from the database
//<********************************************>

//BASIC IMPORTS
import React, {useEffect, useState} from 'react';
import { ScrollView,StyleSheet,Text,View,FlatList } from 'react-native';

//FIREBASE
import { collection,query,orderBy,limit,getDocs, startAfter } from "firebase/firestore";
import { db } from '../firebase';

//COMPONENTS
import UpcomingBox from '../components/Home/UpcomingBox';

//CONTEXT
import { useAuth } from '../context/UserAuthContext'

export default function TabOneScreen({navigation}) {

//<********************VARIABLES************************>

//PODCAST POSTS
const [events, setEvents] = useState([]);

//PODCAST POSTS | PAGINATION
const [lastEvent, setLastEvent] = useState(null);

const { currentuser } = useAuth();

//<********************FUNCTIONS************************>

//LOAD MORE PODCASTS | PAGINATION
const fetchMoreData = async () => {
  const eventRef = collection(db,"users",currentuser.uid,"Events");
  const q = query(eventRef, orderBy("id", "desc"),startAfter(lastEvent), limit(5));
  const querySnapshot = await getDocs(q);
  const tempPosts = [];
  querySnapshot.forEach((doc) => {
    tempPosts.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  setEvents([...events, ...tempPosts]);
}

//FETCH PODCASTS
const fetchUpcomingEvents = async () => {
  const eventRef = collection(db,"users", currentuser.uid,"Events");
  const querySnapshot = await getDocs(eventRef);
  const tempPosts = [];
  querySnapshot.forEach((doc) => {
    tempPosts.push({
      id: doc.id,
    });
  });
  setLastEvent(tempPosts[tempPosts.length - 1].id);
  setEvents(tempPosts);
  console.log(tempPosts);
  console.log("here")
}

//ON PAGE LOAD
useEffect(() => {
  //1.) FETCH PODCASTS
  fetchUpcomingEvents();
  console.log("here")
}, []);


return (
<View style={styles.container}>
  <View style={{marginTop:110,justifyContent:"flex-start",width:"100%",marginLeft:30}}>
    <Text style={{fontWeight:"800",fontSize:20}}>Upcoming Events</Text>
  </View>

  <FlatList 
    style={{width:"100%",marginTop:20}}
    keyExtractor={(item) => item.id} 
    data={events}
    onEndReached={fetchMoreData}
    renderItem={({item}) => (
      <UpcomingBox navigation={navigation} event_id={item.id}  />
    )}
  />

</View>
);
}

const styles = StyleSheet.create({

  select:{
  flex: 1,
  flexDirection: 'row',
  justifyContent:"space-evenly" ,
  alignItems: 'center',
  marginLeft:"auto",
  marginRight:"auto",
    height: 50,
    width: '80%',
    backgroundColor:'none',
    marginTop:40,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',

  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  moreLink: {
    fontSize: 10,
    opacity: 0.5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  horizontalLine: {
    borderColor:"black",
    borderWidth: 1,
    opacity: 0.5,
    width: 1,
    height:20,
   // Adjust the width of the line
    marginVertical: 10, // Adjust the spacing above and below the line
  },
  selected: {
    opacity: 1,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'row', // Arrange the content horizontally 
  },
  scrollContainer: {
    flexDirection: 'row',
  },
    postContainer:{
        width:"100%",
        height:"100%",
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
    },
    videoContainer:{
        width:"100%",
        height:"100%",
        backgroundColor:"black",
        alignItems:"center",
        justifyContent:"center",
        zIndex: 1
    },
    videoFY: {
        width: '100%',
        height: '100%',
        zIndex: 1,
      },
      titleForYou: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      description: {
        fontSize: 16,
        marginBottom: 16,
      },
      userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      likes: {
        fontSize: 16,
        marginRight: 8,
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
});