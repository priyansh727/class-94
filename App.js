import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Text,
  View,
    StyleSheet,
  TextInput, 
    TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './database';  


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      word: '',
      definition: '',
      wordData: '',
            definitionUrl: '',
      searchDefinitionJSON: '',
      inputDATA: '',
      isSearchPressed: false,
      wordOffline: [],
      definitionOffline: []

    }

  }


  getWord = (word) => {



    var searchWord = this.state.word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchWord + ".json"
    var checkErrorIsSearch = false;

    //console.log(url);
    return fetch(url)
      .then((data) => {

        if (data.status === 200) {


          return data.json()


        } else {

          alert("'" + this.state.word + "' " + "was not found in the dictionary. Please check your spelling.");
          this.setState({ definition: 'Sorry, Word Not Found In Dictionary', word: 'Error' });
          return null

        }

      })
      .then((response) => {
        var responseObject = response
        console.log(responseObject)
        if (responseObject) {

          var definitionOfflineArr = dictionary["searchWord"]
         

          if (definitionOfflineArr != undefined || definitionOfflineArr != null) {

            var definitionOffline = definitionOfflineArr["definition"];
      

          }

          var definitionDATA = responseObject.definitions[0].description.slice('1', '9999');
          var definitionDATAUpper = responseObject.definitions[0].description.charAt(0).toUpperCase()
         


          var fullDefinitionData = definitionDATAUpper + definitionDATA

         
          if (definitionOfflineArr === undefined || definitionOfflineArr === null) {
            this.setState({ definition: fullDefinitionData })
          } else {

            this.setState({ definition: definitionOffline });
           

          }



        }



      })
  }
  render() {
    return (
      <View style={styles.container}>

        <Header
          backgroundColor={'blue'}
          centerComponent={{
            text: 'priyansh ',
            style: { color: 'cyan', fontSize: 30, fontFamily : 'French Script MT '},
          }}
        />

<Image style = {styles.imageIcon} source = {uri = 'data:image/jpeg;base64,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'} 
  />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {

            this.setState({ word: text });

          }}

          value={this.state.word}

        />

        <TouchableOpacity
          style={styles.goButton}
          onPress={this.getWord}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <Text style={{ color: 'red', fontSize: 30, fontWeight: 'bold', marginLeft: 10, marginTop: 80 }}>Word:</Text>
        <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', marginLeft: 110, marginTop: -35 }}>{this.state.word.toLowerCase()}</Text>
        <Text style={{ color: 'red', fontSize: 30, fontWeight: 'bold', marginLeft: 10, marginTop: 50 }}>Definition:</Text>
        <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', marginLeft: 170, marginTop: -30 }}>{this.state.definition}</Text>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
 inputBox : {
    marginTop: 40,
    width: '70%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 3,
    outline: 'none',
    backgroundColor : 'yellow'
  },
  miniText: {
    color: 'red',
    fontSize: 10,
    fontFamily : 'French Script MT',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 260
  },
  goButton: {

    height: 55,
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    borderRadius: '10%',
    borderWidth : 3,
    backgroundColor: 'blue',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'red',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  
  imageIcon :{ marginTop:10,marginLeft:95, width:125, height: 200}
});