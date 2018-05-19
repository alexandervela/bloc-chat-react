import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Messages: [],
      newMessage: ''
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ Messages:this.state.Messages.concat( message ) });
    });
  }

  createMessage(e) {
    e.preventDefault();
    if (!this.state.newMessage) { return }
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoomKey,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.username
    });
    this.setState({ newMessage: '' })
  }

  handleMessageChange(e) {
    this.setState({ newMessage: e.target.value })
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
            </li>)} else { return null }
         })
        }
        </ul>
        <form onSubmit={ (e) => this.createMessage(e) } >
          <fieldset>
          <label htmlFor="newMessage">Write Your New Message Here:</label>
          <input type="text" id="newMessage" value={this.state.newMessage} onChange={ (e) => this.handleMessageChange(e) } />
          <input type="submit" />
          </fieldset>
        </form>
        </div>
      )
    }
  }

  export default MessageList;
