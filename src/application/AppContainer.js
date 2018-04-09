import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './ui/Layout';
import { doPingSocket } from './app.actions';

class AppContainer extends Component {
  render() {
    return <Layout {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ping: () => dispatch(doPingSocket())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
