import React, {PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {NumberInput} from './NumberInput';

class MaterialUIForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      label,
      value,
      onNumberChange
    } = this.props;

    return (
      <div>
        <h2>Material UI Components</h2>
        <RaisedButton label={label} primary={true} style={{marginBottom: 10}} />
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
          floatingLabelText={'Floating Text'}
          min={0}
          max={1000}
          value={value}
          readOnly={false}
          onChange={onNumberChange}
          disabled={false} />
      </div>
    );
  }
}

MaterialUIForm.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  onNumberChange: PropTypes.func
};

export default MaterialUIForm;
