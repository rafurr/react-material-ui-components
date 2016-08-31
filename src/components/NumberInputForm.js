import React, {PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import {NumberInput} from './NumberInput';

class NumberInputForm extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      value,
      onNumberChange,
      onResetClicked
    } = this.props;

    return (
      <div>
        <h2>NumberInput Component</h2>
        <NumberInput
          style={{marginBottom: 10}}
          name="NumberInput1"
          hintText={'Hint Text'}
          min={0}
          max={1000}
          value={value}
          readOnly={false}
          onChange={onNumberChange}
          disabled={false} />
        <NumberInput
          style={{marginBottom: 10, width: 300}}
          name="NumberInput2"
          hintText={'Hint Text'}
          floatingLabelText={'Floating Label'}
          min={0}
          max={1000}
          value={value}
          readOnly={false}
          onChange={onNumberChange}
          disabled={false} />
        <RaisedButton label="Reset" primary={true} onClick={onResetClicked} />
      </div>
    );
  }
}

NumberInputForm.propTypes = {
  value: PropTypes.number,
  onNumberChange: PropTypes.func,
  onResetClicked: PropTypes.func
};

export default NumberInputForm;
