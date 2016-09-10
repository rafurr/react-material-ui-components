import React, {PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import {NumberInput} from './NumberInput';

class NumberInputForm extends React.Component {

  constructor() {
    super();
  }

  render() {
    const {
      value,
      onNumberChange,
      onResetClicked
    } = this.props;

    return (
      <div>
        <h2>xxxNumberInput Component</h2>
        hintText
        <NumberInput
          style={{marginBottom: 10, width: 200}}
          name="NumberInput1"
          hintText={'Hint Text'}
          min={0}
          max={100}
          value={value}
          onChange={onNumberChange} />
        hintText and floatingLabelText
        <NumberInput
          style={{marginBottom: 10}}
          name="NumberInput2"
          hintText={'Hint Text'}
          floatingLabelText={'Floating Label'}
          min={0}
          max={100}
          value={value}
          onChange={onNumberChange} />
        readOnly
        <NumberInput
          style={{marginBottom: 10}}
          name="NumberInput3"
          hintText={'Hint Text'}
          floatingLabelText={'Floating Label'}
          min={0}
          max={100}
          value={value}
          readOnly
          onChange={onNumberChange} />
        disabled
        <NumberInput
          style={{marginBottom: 10}}
          name="NumberInput4"
          hintText={'Hint Text'}
          floatingLabelText={'Floating Label'}
          min={0}
          max={100}
          value={value}
          disabled
          onChange={onNumberChange} />
        <RaisedButton label="Reset" primary={true} onClick={onResetClicked} />
      </div>
    );
  }
}

NumberInputForm.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onNumberChange: PropTypes.func,
  onResetClicked: PropTypes.func
};

export default NumberInputForm;
