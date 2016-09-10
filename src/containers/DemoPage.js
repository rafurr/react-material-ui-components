import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import DemoForm from '../components/DemoForm';

import {
  setCount
} from '../actions/demoActions';

function mapStateToProps(state) {
  return {
    count: state.demoAppState.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCount
    }, dispatch)
  };
}

export class DemoPage extends React.Component {

  constructor() {
    super();

    this.handleDecrementClicked = this.handleDecrementClicked.bind(this);
    this.handleIncrementClicked = this.handleIncrementClicked.bind(this);
    this.handleResetClicked = this.handleResetClicked.bind(this);
  }

  handleDecrementClicked() {
    this.props.actions.setCount(this.props.count - 1);
  }

  handleIncrementClicked() {
    this.props.actions.setCount(this.props.count + 1);
  }

  handleResetClicked() {
    this.props.actions.setCount(0);
  }

  render() {
    return (
      <DemoForm
        onDecrementClicked={this.handleDecrementClicked}
        onIncrementClicked={this.handleIncrementClicked}
        onResetClicked={this.handleResetClicked}
        count={this.props.count}
      />
    );
  }
}

DemoPage.propTypes = {
  actions: PropTypes.shape({
    setCount: PropTypes.func
  }),
  count: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(DemoPage);