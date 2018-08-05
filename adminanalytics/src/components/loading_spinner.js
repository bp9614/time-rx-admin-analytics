import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Modal } from 'semantic-ui-react';

class LoadingSpinner extends Component{
  render() {
    return (
      <Modal basic open={this.props.isLoading} size="mini">
        <Modal.Content>
          <Loader size="large" active>Loading</Loader>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.loading.isLoading,
  }
}

export default connect(mapStateToProps)(LoadingSpinner);