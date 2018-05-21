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
      username: this.props.username,
      sentAt: this.formatTimeStamp(this.props.firebase.database.ServerValue.TIMESTAMP)
    })
    this.setState({ newMessage: '' })
  }

  formatTimeStamp(e) {
       let hours = Math.floor(e / 60);
       let minutes = Math.floor(e % 60);
       let seconds = Math.floor(e % 60);
       let displayMinutes = ((minutes) < 10) ? ("0" + minutes) : (minutes);
       let displayHours = ((hours) < 10) ? ("0" + hours) : (hours);
       let ampm = 'AM'

       if (hours > 12) {
		   displayHours = hours - 12;
		   ampm = 'PM';
     } else if (hours === 12) {
		   displayHours = 12;
		   ampm = 'PM';
     } else if (hours == 0) {
		   displayHours = 12;
	     }

	     let time = displayHours + ':' + displayMinutes + ' ' + ampm;
       return time;
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
