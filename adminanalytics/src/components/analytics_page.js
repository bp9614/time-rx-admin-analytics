import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Menu } from 'semantic-ui-react';
import { getUsername, logout, verifyFirst } from '../actions/jwt';

class AnalyticsPage extends Component {
  componentWillMount() {
    if (!this.props.username) {
      this.props.verifyFirst(
        this.props.access, 
        this.props.refresh, 
        getUsername,
      );
    }
  }

  render() {
    return (
      <div>
        <Menu inverted color="blue" borderless>
          <Menu.Item disabled={true}>
            <p className="cursive-font larger-text">Time-Rx</p>
          </Menu.Item>
          <Menu.Item>
            {this.props.username ? 
              <p className="cursive-font larger-text">
                Welcome, {this.props.username}
              </p> : <Loader active></Loader>}
          </Menu.Item>
          <Menu.Item
              position="right"
              onClick={this.props.logout}>
            <p className="larger-text">Logout</p>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    access: state.jwt.access,
    refresh: state.jwt.refresh,
    username: state.jwt.username,
  }
}

export default connect(mapStateToProps, {
  logout, 
  verifyFirst, 
})(AnalyticsPage)