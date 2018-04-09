import React, { Component } from 'react';
import {
  ChatComponent,
  ChatFrame,
  ChannelList,
  ChannelHeader,
  Messages,
  Textbox,
  Textarea,
  SendButton,
  ChannelItem
} from './styles';

const Channel = ({ joinChannel, channel, isActive }) => (
  <ChannelItem
    onClick={() => {
      joinChannel(channel);
    }}
    isActive={isActive}>
    #{channel}
  </ChannelItem>
);

class Chatbox extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const {
      onSend,
      onHandleInput,
      message,
      joinChannel,
      activeChannel,
      channels
    } = this.props;

    const channel = channels[activeChannel];
    const messages = channel ? channel.messages : [];
    const users = channel ? channel.users : [];

    return (
      <ChatComponent>
        <ChannelList>
          <p>Channels </p>
          <div>
            <Channel
              joinChannel={joinChannel}
              isActive={activeChannel === 'general'}
              channel="general"
            />
            <Channel
              isActive={activeChannel === 'test'}
              joinChannel={joinChannel}
              channel="test"
            />
          </div>
          <p>Users</p>
          {users && users.map(user => <div>{user.substr(0, 6)}</div>)}
        </ChannelList>
        <ChatFrame>
          <ChannelHeader>#{activeChannel}</ChannelHeader>
          <Messages>
            {messages &&
              messages.map(message => {
                const shortUser = message.uuid.split('-')[0];
                const color = shortUser.substr(0, 6);
                return (
                  <ul>
                    <li style={{ color: '#' + color }}>
                      {message.uuid.split('-')[0]}:
                    </li>{' '}
                    {message.message}
                  </ul>
                );
              })}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </Messages>

          {activeChannel !== 'socket' && (
            <Textbox onSubmit={onSend}>
              <Textarea
                name="message"
                value={message}
                onChange={onHandleInput}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.form.dispatchEvent(
                      new Event('submit', { cancelable: true })
                    );
                    e.target.value = null;
                  }
                }}
              />
              {/* <SendButton type="submit">send</SendButton> */}
            </Textbox>
          )}
        </ChatFrame>
      </ChatComponent>
    );
  }
}

export default Chatbox;
