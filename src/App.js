import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <main>
         <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
