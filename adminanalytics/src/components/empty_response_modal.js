import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Modal } from 'semantic-ui-react';
import { closeModal } from '../actions/modal';

class EmptyResponseModal extends Component {
  render() {
    return (
      <Modal
          open={this.props.emptyResponseModal}
          onClose={this.props.closeModal}
          size="mini"
          closeIcon>
        <Header>Error</Header>
        <Modal.Content>
          <p className="error-msg">Empty Response</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="orange" onClick={this.props.closeModal}>OK</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    emptyResponseModal: state.modal.emptyResponseModal,
  }
}

export default connect(mapStateToProps, {
  closeModal
})(EmptyResponseModal);