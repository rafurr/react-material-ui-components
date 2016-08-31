import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import MaterialUIForm from '../components/MaterialUIForm';

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

export class MaterialUIPage extends React.Component {

  render() {
    const label = 'Material UI';

    return (
      <MaterialUIForm
        label={label}
      />
    );
  }
}

MaterialUIPage.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialUIPage);