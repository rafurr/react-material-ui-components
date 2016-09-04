import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import SpeedDialForm from '../components/SpeedDialForm';

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export class SpeedDialPage extends React.Component {

  render() {
    const label = 'Speed Dial';

    return (
      <SpeedDialForm
        label={label}
      />
    );
  }
}

SpeedDialPage.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeedDialPage);