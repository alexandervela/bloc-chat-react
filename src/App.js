import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import User from './components/User'

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
      activeRoomKey: '',
    };
  }

  handleActiveRoom(room) {
  this.setState({ activeRoom: room });
  this.setState({ activeRoomKey: room.key });
}

setUser(user) {
  if (user === null) {
    return this.setState({ username: 'Guest' })
  } else {
    return this.setState({ username: user.displayName })
  }
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
          <User classname="User"
          firebase={firebase}
          username={this.state.username}
          setUser={this.setUser.bind(this)}
          />
        </header>
        <aside className="Room-list">
          <RoomList
          firebase={firebase}
          activeRoom={this.handleActiveRoom.bind(this)}
          />
        </aside>
        <main className="Message-list">
          <h2>{this.state.activeRoom.name}</h2>
          <MessageList
          firebase={firebase}
          activeRoomKey={this.state.activeRoomKey}
          username={this.state.username}
          setUser={this.setUser.bind(this)}
          />
        </main>
      </div>
    );
  }
}

export default App;
