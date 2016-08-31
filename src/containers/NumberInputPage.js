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

  handleNumberChange(e, v) {
    this.props.actions.setValue(v);
  }

  handleResetClicked(e) {
    this.props.actions.setValue(0);
  }

  render() {
    return (
      <NumberInputForm
        onNumberChange={this.handleNumberChange.bind(this)}
        onResetClicked={this.handleResetClicked.bind(this)}
        value={this.props.value}
      />
    );
  }
}

NumberInputPage.propTypes = {
  actions: PropTypes.shape({
    setValue: PropTypes.func
  }),
  value: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberInputPage);