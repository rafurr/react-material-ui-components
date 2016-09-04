import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import SpeedDialForm from '../components/SpeedDialForm';

import {
  setOpen
} from '../actions/speedDialActions';

function mapStateToProps(state) {
  return {
    open: state.speedDialAppState.open
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setOpen
    }, dispatch)
  };
}

export class SpeedDialPage extends React.Component {

  constructor() {
    super();

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleMouseEnter() {
    this.props.actions.setOpen(true);
  }

  handleMouseLeave() {
    this.props.actions.setOpen(false);
  }

  handleClicked() {
    this.props.actions.setOpen(true);
  }

  render() {
    return (
      <SpeedDialForm
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClicked}
        open={this.props.open}
      />
    );
  }
}

SpeedDialPage.propTypes = {
  actions: PropTypes.shape({
    setOpen: PropTypes.func
  }),
  open: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeedDialPage);