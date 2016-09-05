import React, {PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class DemoForm extends React.Component {

  constructor() {
    super();
  }

  render() {
    const {
      count,
      onResetClicked,
      onIncrementClicked
    } = this.props;

    return (
      <div>
        <h2>Demo Redux</h2>
        <h4>Count: {count}</h4>
        <RaisedButton label="Increment" onClick={onIncrementClicked} primary={true} style={{marginRight: 10}} />
        <RaisedButton label="Reset" onClick={onResetClicked} primary={true} style={{marginBottom: 10}} />
      </div>
    );
  }
}

DemoForm.propTypes = {
  count: PropTypes.number,
  onResetClicked: PropTypes.func,
  onIncrementClicked: PropTypes.func
};

export default DemoForm;
