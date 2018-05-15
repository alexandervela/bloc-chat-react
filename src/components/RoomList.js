import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms:this.state.rooms.concat( room ) });
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  render(){
    return (
      <div>
      <form onSubmit={ (e) => this.createRoom(e) }>
        <fieldset>
          <label for="newRoom">Create New Room:</label>
          <input type="text" id="newRoom" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) }/>
          <input type="submit" />
        </fieldset>
      </form>
       {
         this.state.rooms.map( (room, index) =>
         <div key={room.key} >
         {room.name}
         </div>
         )
       }
      </div>
    )
  }
}

export default RoomList;
