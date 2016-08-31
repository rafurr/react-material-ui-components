import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NumberInputForm from '../components/NumberInputForm';

import {
  setValue
} from '../actions/numberInputActions';

function mapStateToProps(state) {
  return {
    value: state.numberInputAppState.value
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
        setValue
    }, dispatch)
  };
}

export class NumberInputPage extends React.Component {

  constructor() {
    super();

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleResetClicked = this.handleResetClicked.bind(this);
  }

  handleNumberChange(e, v) {
    this.props.actions.setValue(v);
  }

  handleResetClicked() {
    this.props.actions.setValue('');
  }

  render() {
    return (
      <NumberInputForm
        onNumberChange={this.handleNumberChange}
        onResetClicked={this.handleResetClicked}
        value={this.props.value}
      />
    );
  }
}

NumberInputPage.propTypes = {
  actions: PropTypes.shape({
    setValue: PropTypes.func
  }),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberInputPage);