import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
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
    if (!this.state.newRoomName) { return }
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: ' ' })
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render(){
    return (
      <div>
      <form onSubmit={ (e) => this.createRoom(e) }>
        <fieldset>
          <label htmlFor="newRoom">Create New Room:</label>
          <input type="text" id="newRoom" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) }/>
          <input type="submit" />
        </fieldset>
      </form>
      <ul>
      {
         this.state.rooms.map( (room, index) =>
         <div key={room.key} onClick={ (e) => this.selectRoom(room,e) }>
         {room.name}
         </div>
         )
       }
       </ul>
      </div>
    )
  }
}

export default RoomList;
