//<********************************************>
//LAST EDITED DATE: 2023.12.03
//EDITED BY: Orban Tamas
//DESCRIPTION: This is the login page, where the user can login to the app
//<********************************************>

//BASIC IMPORTS
import React,{useState} from 'react';
import { View, Text,SafeAreaView,StyleSheet,TextInput,Button,Pressable  } from 'react-native';

//CONTEXT
import { useAuth } from '../context/UserAuthContext'

//FIREBASE



const RegisterPage = ({navigation}) => {

//<********************VARIABLES************************>

//CURRENT USER | LOGIN
const {SignUp, currentuser} = useAuth()

//INPUTS | LOGIN
const [inputEmail, setInputEmail] = useState('')
const [inputPassword, setInputPassword] = useState('')
const [inputUsername, setInputUsername] = useState('')


//<********************FUNCTIONS************************>

  
//SUBMIT HANDLER | REGISTER
const SubmitHandler = async (e) => {
    e.preventDefault()
    const email = inputEmail;
    const password = inputPassword;
    const UserName = inputUsername;
    if (password == "" ||  email == "" || UserName == "") {
        setInterval(() => {
        setError("")
        }, 5000)
        return setError("please fill All the field ")
    } else if (!password.length >= 6 ) {
        setInterval(() => {
        setError("")
        }, 5000)
        return setError("Password Must be Greater then 6 Length")
    } else {
        SignUp(email, password, UserName)
        { currentuser && setUser({
            UserName: "",
            email: "",
            password: "",
        })
        };
    };
};



return (
<SafeAreaView style={styles.container}>
  <View style={styles.paper}>
    <Text style={styles.title}>Register</Text>

    <View style={styles.inputArea}>
      {/* EMAIL INPUT */}
      <View style={styles.inputContainer}>
      <Text style={styles.text}>Email</Text>
      <TextInput
          style={styles.inputField}
          placeholder='Email'
          value={inputEmail}
          onChangeText={text => setInputEmail(text)}
        />
      </View>

    {/* EMAIL INPUT */}
    <View style={styles.inputContainer}>
      <Text style={styles.text}>Username</Text>
      <TextInput
          style={styles.inputField}
          placeholder='username'
          value={inputUsername}
          onChangeText={text => setInputUsername(text)}
        />
    </View>

      {/* PASSWORD INPUT */}
      <View>
        <Text style={styles.text}>Password</Text>
        <TextInput
            style={styles.inputField}
            placeholder='Password'
            secureTextEntry={true}
            value={inputPassword}
            onChangeText={text => setInputPassword(text)}
          />
      </View>

      <Button onPress={SubmitHandler} title='Register'/>
    </View>

    <View style={styles.bottomText} >
      <Text>Alredy a user of Lupody?</Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={{fontWeight:"500",marginLeft:10}}> Login </Text>
      </Pressable>
    </View>
  </View>
</SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
      },
    paper: {
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 30,
        backgroundColor: 'white',
        marginBottom:0,
        marginTop:"auto"
      },
      title: {
        fontSize: 32,
        marginTop:50,
        alignSelf: 'center',
        fontWeight:'500',
      },
      text: {
        fontSize: 20,
        marginLeft:50,
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      },
        inputArea:{
            width:'100%',
            height:'60%',
            flexDirection:'column',
            justifyContent:'space-evenly',
            marginTop:50
        },
        inputContainer:{
            flexDirection:'column',
            justifyContent:'space-evenly',
            height:"30%",
            
        },
        inputField:{
            alignSelf:'center',
            width:'80%',
            height:50,
            backgroundColor:'white',
            borderColor:'black',
            borderWidth:1,
            borderRadius:10,
            paddingLeft:10,
            fontSize:20,
            fontWeight:'500'
        },
        bottomText:{
            flexDirection:'row',
            justifyContent:'center',
            marginTop:"auto",
            marginBottom:10
        },
})

export default RegisterPage
