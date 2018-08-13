import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Header, Modal } from 'semantic-ui-react';
import { verifyFirst } from '../actions/jwt';
import { closeModal, openModal } from '../actions/modal';
import { query } from '../actions/query';
import checkBoxField from '../components/checkbox_field';
import datePickerField from '../components/datepicker_field';
import dropDownFormField from '../components/dropdown_form_field';
import radioButtonField from '../components/radio_button_field';
import renderField from '../components/render_field';
import { COLLECTIONS } from '../consts/index';

class SearchModal extends Component {
  onSubmit(values) {
    this.props.closeModal();
    this.props.verifyFirst(
      this.props.access, 
      this.props.refresh,
      query,
      values, 
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Modal
            trigger={
              <Button
                  className="slight-off-corner"
                  onClick={this.props.openModal}>
                Search
              </Button>
            }
            open={this.props.showModal}
            onClose={this.props.closeModal}
            size="small"
            closeIcon>
          <Header>Refine Search</Header>
          <Modal.Content>
            <form 
                id="query" 
                onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                  label="Collection" id="collection" name="collection"
                  options={COLLECTIONS} component={dropDownFormField} />
              <Field
                  label="Number of Results" id="results"
                  name="results" type="text" placeholder="#"
                  className="bootstrap-form-control reduced-width"
                  component={renderField} />
              <Field label="Start Date" id="startDate" name="startDate"
                  component={datePickerField}/>
              <Field label="End Date" id="endDate" name="endDate"
                  component={datePickerField}/>
              <Field title="Display as: " id="asChart" name="asChart"
                  label="Chart" component={checkBoxField}/>
              <Field id="asHistory" name="asHistory"
                  label="History" component={checkBoxField}/>
            </form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.props.closeModal}>Cancel</Button>
            <Button color="green" form="query">Search</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.collection) {
    errors.collection = 'Choose a collection!';
  }

  if (!values.results) {
    errors.results = 'Enter a value!';
  }


  if (values.results) {
    if (values.asHistory && (values.results < 5 || values.results > 100)) {
      errors.results = 'Enter a value between 5 and 100!';
    }
    if (!values.asHistory && (values.results < 5 || values.results > 20)) {
      errors.results = 'Enter a value between 5 and 20!';
    }
  }

  if (!values.startDate) {
    errors.startDate = 'Enter a start date!';
  }

  if (!values.endDate) {
    errors.endDate = 'Enter an end date!'
  }

  if (values.startDate && values.endDate &&
      new Date(values.startDate) >= new Date(values.endDate)) {
    errors.startDate = 'Start date must be earlier than end date!';
    errors.endDate = 'Start date must be earlier than end date!';
  }

  if (!values.asChart && !values.asHistory) {
    errors.asHistory = 'Select at least one!';
  }

  return errors;
}

function mapStateToProps(state, initialProps) {
  return {
    access: state.jwt.access,
    refresh: state.jwt.refresh,
    showModal: state.modal.showModal,
    collection: (formValueSelector(initialProps.form))(state, 'collection'),
  };
}

export default reduxForm({
  validate: validate,
  form: 'RefineSearchForm',
  initialValues: {
    asChart: false,
    asHistory: false,
  }
})(connect(mapStateToProps, {
  closeModal,
  openModal,
  verifyFirst
})(SearchModal));