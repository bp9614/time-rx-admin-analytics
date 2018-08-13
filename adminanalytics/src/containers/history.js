import React, { Component } from 'react';
import { connect } from 'react-redux';

class History extends Component {
  renderHistory() {
    let totalHistory = '';
    for (let history of this.props.history) {
      totalHistory += history + '\n';
    }

    return totalHistory;
  }

  render() {
    return (
      <div>
        <h1>{this.props.historyTitle}</h1>
        <textarea className="rounded-corners shadowed"
            rows={40} cols={90} value={this.renderHistory()} readOnly/>
      </div>
    );
  }
}

function mapStatesToProps(state) {
  return {
    historyTitle: state.query.historyTitle,
    history: state.query.history
  }
}

export default connect(mapStatesToProps)(History);