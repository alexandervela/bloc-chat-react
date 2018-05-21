import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.convertTimestamp = this.convertTimestamp.bind(this);
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
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    })
    this.setState({ newMessage: '' })
  }

  handleMessageChange(e) {
    this.setState({ newMessage: e.target.value })
  }

  convertTimestamp(timestamp) {
  var d = new Date(timestamp),
		hh = d.getHours(),
		hour = hh,
		minutes = ('0' + d.getMinutes()).slice(-2),
		ampm = 'AM',
		time;

	if (hh > 12) {
		hour = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		hour = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		hour = 12;
	}

	time = hour + ':' + minutes + ' ' + ampm;

	return time;
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
            {message.username}: {message.content} - {this.convertTimestamp(message.sentAt)}
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
