import React, {PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class MaterialUIForm extends React.Component {

  constructor() {
    super();
  }

  render() {
    const {
      label
    } = this.props;

    return (
      <div>
        <h2>Material UI Components</h2>
        <RaisedButton label={label} primary={true} style={{marginBottom: 10}} />
      </div>
    );
  }
}

MaterialUIForm.propTypes = {
  label: PropTypes.string
};

export default MaterialUIForm;
