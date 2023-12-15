
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//FIREBASE
import { collection, doc, getDoc,getDocs } from "firebase/firestore";
import { db } from '../../firebase';

const UpcomingBox = ({ event_id,navigation }) => {

//<********************FUNCTIONS************************>

//NAVIGATE TO PARTY PAGE
const handleNavigation = () => {
    // navigation.navigate("PartyPage");
}

//<********************VARIABLES************************>

//EVENT DATA
const [eventData, setEventData] = useState([]);

//MEMBERS
const [members, setMembers] = useState([]);

//FETCH MEMBERS
const fetchData = async () => {
    const eventRef = doc(db,"events", event_id);
    const eventSnapshot = await getDoc(eventRef);
    const Documents = eventSnapshot.data();
    setEventData(Documents);
    const fetchMembers = async () => {
        const memberRef = collection(db,"events", event_id,"Members");
        const memberSnapshot = await getDocs(memberRef);
        const tempMembers = [];
        memberSnapshot.forEach((doc) => {
            tempMembers.push({
                id: doc
            });
        })
        setMembers(tempMembers);
    }
    fetchMembers()
}

useEffect(() => {
    fetchData();
},[])


return(
<TouchableOpacity onPress={handleNavigation}>
    <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.columnBox}>
                <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between",height:30}}>
                    <Text numberOfLines={1} style={styles.title}>{eventData.title}</Text>
                    <View style={{alignItems:"center"}}>

                        <Text style={{fontWeight:"600"}}>12 days left</Text>
                        <Text style={{marginTop:3,fontSize:11}}>{eventData.start_at}</Text>
                        <MaterialCommunityIcons
                            name="calendar-month-outline"
                            size={18}
                            color="black"
                            style={{marginTop:3}}
                        />
                    </View>
                </View>
                
                <View style={styles.row2}>
                    <MaterialCommunityIcons
                        name="home"
                        size={18}
                        color="black"
                        style={{marginRight:3}}
                    />
                    <Text>Host:</Text>
                    <Text style={styles.dataHighlight}>Orban Tamas</Text>
                </View>
                <View style={styles.row2}>
                    <MaterialCommunityIcons
                        name="account-tie"
                        size={18}
                        color="black"
                        style={{marginRight:3}}
                    />
                    <Text>Members:</Text>
                    <Text style={styles.dataHighlight}>{members.length}</Text>
                </View>

                <View style={styles.row2}>
                    <MaterialCommunityIcons
                        name="face-recognition"
                        size={18}
                        color="black"
                        style={{marginRight:3}}
                    />
                    <Text>Mutual Friends:</Text>
                    <Text style={styles.dataHighlight}>3</Text>
                </View>

                <View style={styles.row2}>
                    <MaterialCommunityIcons
                        name="city"
                        size={18}
                        color="black"
                        style={{marginRight:3}}
                    />
                    <Text>Location:</Text>
                    <Text numberOfLines={1} style={styles.dataHighlight}>Budapset, Csepel</Text>
                </View>

                {/* ABSOLUT POSITIONED OPEN ICON */}
                <MaterialCommunityIcons
                    name="arrow-right"
                    size={30}
                    color="black"
                    style={{position:"absolute",right:30,bottom:30,borderWidth:2,borderColor:"black",padding:3,borderRadius:20}}
                />
            </View>
        </View>
    </View>
</TouchableOpacity>
)}

const styles = StyleSheet.create({
    container:{
        width:"90%",
        marginLeft:"auto",
        marginRight:"auto",
        height:200,
        borderTopWidth:3,
        borderBottomWidth:0,

        
    },
    columnBox:{
        width:"100%",
        height:"100%",
        flexDirection:"column",
        justifyContent:"space-between",
        padding:20,
    },
    title:{
        fontSize:20,
        fontWeight:"600",
        maxWidth:200
    },
    row2:{
        flexDirection:"row",
        alignItems:"center",
        maxWidth:160, 
    },
    dataHighlight:{
        fontWeight:"600",
        marginLeft:10
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"100%",
        height:"100%",
    },
    columnBox2:{
        width:"20%",
        height:"100%",
        flexDirection:"column",
        justifyContent:"space-between",
        padding:20,
    },
})

export default UpcomingBox;