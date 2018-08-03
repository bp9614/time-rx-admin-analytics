import React, { Component } from 'react';

import { connect } from 'react-redux';

import { verifyJWT } from '../actions/jwt';

class AnalyticsPage extends Component {
  render() {
    return (
      <div>Analytics Page!</div>
    );
  }
}

export default connect(null, { verifyJWT })(AnalyticsPage);