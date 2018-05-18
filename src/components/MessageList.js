import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.state.Messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ Messages:this.state.Messages.concat( message ) });
    });
  }

    render() {
      const activeRoomKey = this.props.activeRoomKey;
      return (
        <div>
        <ul>
        {
         this.state.Messages.map( (message, index) => {
         if (activeRoomKey === '') {
           return null
         } else if (message.roomId === activeRoomKey) {
           return (
             <li key={message.key}>
           {message.username}: {message.content} - {message.sentAt}
           </li>)}
         })
        }
        </ul>
        </div>
      )
    }
  }

  export default MessageList;
