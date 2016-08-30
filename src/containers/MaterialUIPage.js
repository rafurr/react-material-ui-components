import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import MaterialUIForm from '../components/MaterialUIForm';

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
      },
      dispatch
    )
  };
}

export class MaterialUIPage extends React.Component {

  handleNumberChange(e, v) {
    this.props.actions.setValue(v);
  }

  render() {
    const label = 'Material UI';
    return (
      <MaterialUIForm
        onNumberChange={this.handleNumberChange.bind(this)}
        label={label}
        value={this.props.value}
      />
    );
  }
}

MaterialUIPage.propTypes = {
  actions: PropTypes.object.isRequired,
  value: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialUIPage);