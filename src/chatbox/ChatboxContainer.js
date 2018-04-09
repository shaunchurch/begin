import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chatbox from './ui/Chatbox';

import { doSendMessage, doJoinChannel } from './chatbox.actions';

class ChatboxContainer extends Component {
  state = {};

  handleTextInput = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  sendMessage = e => {
    e.preventDefault();
    const { activeChannel, sendMessage } = this.props;
    const { message } = this.state;
    if (message && message.length > 0) {
      sendMessage(activeChannel, message);
    }
  };

  render() {
    return (
      <Chatbox
        {...this.props}
        onSend={this.sendMessage}
        onHandleInput={this.handleTextInput}
        onJoinChannel={this.props.joinChannel}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeChannel: state.activeChannel,
    channels: state.channels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (channel, message) =>
      dispatch(doSendMessage(channel, message)),
    joinChannel: channel => dispatch(doJoinChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatboxContainer);
