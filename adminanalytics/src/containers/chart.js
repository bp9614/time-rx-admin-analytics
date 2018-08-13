import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';
import { Button, Form } from 'semantic-ui-react';

class Chart extends Component {
  constructor() {
    super();

    this.state = {
      plot: 'Line',
    }

    this.changePlot = this.changePlot.bind(this);
  }

  changePlot() {
    if (this.state.plot === 'Line') {
      this.setState({plot: 'Bar'});
    }

    if (this.state.plot === 'Bar') {
      this.setState({plot: 'Line'});
    }
  }

  getGraph() {
    return this.state.plot === 'Line' ? 
      <Line data={this.props.chart} width={700} height={500}
        options={{
          responsive: false,
          maintainAspectRatio: false
        }}/> : <Bar data={this.props.chart} width={700} height={500}
        options={{
          responsive: false,
          maintainAspectRatio: false
        }}/>;
  }

  render() {
    return (
      <div className="chart-center">
        <h1>{ this.props.chartTitle }</h1>
        {this.getGraph()}
        <Form.Field>
          <Button onClick={this.changePlot}>{'<'}</Button>
          <p className="inline side-margins">{this.state.plot}</p>
          <Button onClick={this.changePlot}>{'>'}</Button>
        </Form.Field>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartTitle: state.query.chartTitle,
    chart: state.query.chart,
  }
}

export default connect(mapStateToProps)(Chart);