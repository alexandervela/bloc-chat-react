import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'

var config = {
    apiKey: "AIzaSyCKmZl66eDG5BQ4zA_oTzY57NpBIbYQaSA",
    authDomain: "bloc-chat-react-2ece7.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-2ece7.firebaseio.com",
    projectId: "bloc-chat-react-2ece7",
    storageBucket: "bloc-chat-react-2ece7.appspot.com",
    messagingSenderId: "515221800673"
  };
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      activeRoom: '',
      activeRoomKey: ''
    };
  }

  handleActiveRoom(room) {
  this.setState({ activeRoom: room });
  this.setState({ activeRoomKey: room.key });
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <div>
        <h2>{this.state.activeRoom.name}</h2>
        </div>
        <main>
         <RoomList
         firebase={firebase}
         activeRoom={this.handleActiveRoom.bind(this)}
         />
         <MessageList
         firebase={firebase}
         activeRoomKey={this.state.activeRoomKey}
         />
        </main>
      </div>
    );
  }
}

export default App;
