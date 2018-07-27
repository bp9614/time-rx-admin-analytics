import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { fetchJWT } from '../actions/index';
import renderField from './render_field';
import './login_page.css';

class LoginPage extends Component {
    onSubmit(values) {
        this.props.fetchJWT(values.username, values.pw, () => {
            this.props.history.push('/analytics');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="login-page">
                <div className="form">
                    <h3 className="text-centered cursive-font">Time-Rx</h3>
                    <h3 className="text-centered lower-margin">Admin Analytics</h3>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="login-form">
                        <Field 
                            label="Username" id="username" name="username" 
                            type="text" placeholder="Username" 
                            component={renderField}/>
                        <Field
                            label="Password" id="pw" name="pw" type="password" 
                            placeholder="Password" component={renderField}/>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
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

export default reduxForm({
    validate: validate,
    form: 'LoginPageForm',
})(connect(null, {fetchJWT})(LoginPage));