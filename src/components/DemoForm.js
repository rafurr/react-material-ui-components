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
      onDecrementClicked,
      onIncrementClicked
    } = this.props;

    return (
      <div>
        <h2>Demo Redux with Material UI</h2>
        <h4>Count: {count}</h4>
        <RaisedButton label="-" style={{marginRight: 10}} primary={true} disabled={count==0} onClick={onDecrementClicked} />
        <RaisedButton label="+" style={{marginRight: 10}} primary={true} onClick={onIncrementClicked} />
        <RaisedButton label="Reset" style={{marginBottom: 10}} secondary={true} disabled={count==0} onClick={onResetClicked} />
      </div>
    );
  }
}

DemoForm.propTypes = {
  count: PropTypes.number,
  onResetClicked: PropTypes.func,
  onDecrementClicked: PropTypes.func,
  onIncrementClicked: PropTypes.func
};

export default DemoForm;
