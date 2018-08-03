import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { fetchJWT, closeModal } from '../actions/index';
import renderField from './render_field';
import './login_page.css';

const customStyles = {
  overlay: {zIndex: 3},
  content : {
    top: '35%',
    bottom: '35%',
    left: '40%',
    right: '40%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
  },
};

Modal.setAppElement('#root');

class LoginPage extends Component {
  onSubmit(values) {
    this.props.fetchJWT(values.username, values.pw, () => {
      this.props.history.push('/analytics');
    });
  }

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.history.push('/analytics');
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="outer">
          <div className="middle">
            <div className="login-page">
              <div className="form">
                <h3 className="text-centered cursive-font">Time-Rx</h3>
                <h3 className="text-centered lower-margin">Admin Analytics</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} 
                    className="login-form">
                  <Field
                    label="Username" id="username" name="username"
                    type="text" placeholder="Username"
                    component={renderField} />
                  <Field
                    label="Password" id="pw" name="pw" type="password"
                    placeholder="Password" component={renderField} />
                  <button type="submit" disabled={this.props.isLoading}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Modal 
            isOpen={this.props.showModal} 
            onRequestClose={this.props.closeModal}
            style={customStyles}>
          <button 
              onClick={this.props.closeModal} 
              type="button" 
              className="close right" 
              aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="fill vertical-centered error-msg">
            <h1>{this.props.errorMsg}</h1>
          </div>
        </Modal>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Enter a Username!';
  }

  if (!values.pw) {
    errors.pw = 'Enter a Password!';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    authenticated: state.jwt.authenticated,
    isLoading: state.loading.isLoading,
    showModal: state.modal.showModal,
    errorMsg: state.modal.msg,
  };
}

export default reduxForm({
  validate: validate,
  form: 'LoginPageForm',
})(connect(mapStateToProps, { fetchJWT, closeModal })(LoginPage));