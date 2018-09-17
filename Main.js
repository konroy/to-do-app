import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    ScrollView,
    TouchableOpacity ,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import Note from './Note';

export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.state={
      noteArray: [],
      noteText: '',
    }
  }

  render() {

    let notes = this.state.noteArray.map((val, key)=>{
      return <Note key={key} keyval={key} val={val}
              deleteMethod={()=> this.deleteMethod(key)}/>
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
          To Do App
          </Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>

        <KeyboardAvoidingView style={styles.footer} behavior='padding' enabled>
          <TextInput 
            style={styles.textInput}
            onChangeText={(noteText)=> this.setState({noteText})}
            value={this.state.noteText}
            placeholder='Note'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'>
            
          </TextInput>
          <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton} behavior='padding' enabled>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        
      </View>
    );
  }

  addNote(){
    if(this.state.noteText){
      var d = new Date();
      this.state.noteArray.push({
        'date': d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate(),
        'note': this.state.noteText
      });
      this.setState({ noteArray: this.state.noteArray })
      this.setState({ noteText: ''});
    };
  }

  deleteMethod(key){
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText:{
    color:'white',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer:{
    flex:1,
    marginBottom:100,
  },
  footer:{
    position: 'absolute',
    bottom:0,
    left:0,
    right:0,
    zIndex:10,
  },
  textInput:{
    alignSelf: 'stretch',
    color:'white',
    padding: 20,
    backgroundColor: 'black',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton:{
    position: 'absolute',
    zIndex: 0,
    right: 0,
    backgroundColor: 'red',
    width: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText:{
    color: 'white',
    fontSize: 24,
  }
});
