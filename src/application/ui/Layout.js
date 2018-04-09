import React, { Component } from 'react';
import { ChatboxContainer } from '../../chatbox';
import { Site } from './styles';

class Layout extends Component {
  render() {
    const { ping } = this.props;
    return (
      <Site>
        <ChatboxContainer />
        {this.props.children}
      </Site>
    );
  }
}

export default Layout;
