import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet, Input, Icon, TextInput, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config.js'
const Quote = require('inspirational-quotes');
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default class Motivation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            Username: "",
            emailId: firebase.auth().currentUser.email
        }
    }
    componentDidMount(){
        this.getUserDetails()
    }
    getUserDetails=()=>{
        db.collection('users').where('emailId', '==', this.state.emailId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    Username:doc.data().Username
                })
            })
        })
    }

    getQuote(){
       const q= Quote.getRandomQuote()
       return q 
    }
    getImage(){
        let l =[
            "https://picsum.photos/700",
        ]
        l[Math.floor(Math.random()*l.length)]
        return l
     }

    render(){
        return(
            <View>
            {/* <Text style={{fontWeight:"bold", fontSize:100, alignItems: 'center'}}>{`Hello, ${this.state.Username}` }</Text> */}
            <Card style={{width:"30%", height:"50%", justifyContent:'center', alignItems:"center", marginLeft: 500}}>  
            <Card.Title>A Motivational Quote By Author Nm</Card.Title>          
            <Card.Cover source={{ uri: this.getImage()}} />
            <Card.Content>
      <Paragraph>{this.getQuote()}</Paragraph>
    </Card.Content>
    <TouchableOpacity 
    style={{width:100}}
      onPress={()=>{
         const q2 = Quote.getRandomQuote()
         return(
             <Text>{q2}</Text>
         ) 
      }}
      >
          <Text>Regenerate</Text>
      </TouchableOpacity>
      <TouchableOpacity 
    style={styles.button}
      onPress={()=>{
        this.props.navigation.navigate('MainPage')
      }}
      >
          <Text>Back Home</Text>
      </TouchableOpacity>
            </Card>
            </View>
        )
    }
  
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFFFFF",
    },
    title:{
        fontSize:50,
        fontWeight:"bold",
        color:"#546a76",
        marginTop:"1%",
        marginLeft:"35%"
    },
    text:{
        width:"30%",
        height: "10%",
        marginTop: 30,
        color:"#3cab4f",
        padding:10,
        borderWidth: 5,
        borderColor: "#14213d",
        textAlign: "center",
        shadowColor:"#14213d",
        shadowOffset:{width:0,height:10},
        shadowRadius:5,
        shadowOpacity:0.2,
    },
    button:{
        width:500,
        height: 40,
        padding:10,
        backgroundColor:"#0197f6",
        marginRight:10,
        justifyContent: "center",
        textAlign: "center",
        borderRadius:30,
        marginLeft: 30,
        marginTop:30,

    }
})