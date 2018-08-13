import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Menu } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import { getUsername, logout, verifyFirst } from '../actions/jwt';
import LoadingSpinner from './loading_spinner';
import Chart from '../containers/chart';
import EmptyResponseModal from '../components/empty_response_modal';
import History from '../containers/history';
import SearchModal from '../containers/search_modal';

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
        <SearchModal/>
        <EmptyResponseModal/>
        <div className="wrap">
          <div className="left-half thin-border">
            <div className="middle horizontally-centered">
              <Chart/>
            </div>
          </div>
          <div className="right-half thin-border">
            <div className="middle horizontally-centered">
              <History/>
            </div>
          </div>
        </div>
        <LoadingSpinner/>
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

export default reduxForm({
  form: 'RefineSearchForm'
})(connect(mapStateToProps, { logout, verifyFirst })(AnalyticsPage));