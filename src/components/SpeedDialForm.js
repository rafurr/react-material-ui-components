import React, {PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import {SpeedDial} from './SpeedDial';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentMail from 'material-ui/svg-icons/content/mail';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import ContentSort from 'material-ui/svg-icons/content/sort';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {red300, yellow700, blue300, green600} from 'material-ui/styles/colors';

class SpeedDialForm extends React.Component {

  constructor() {
    super();
  }

  handleSpeedDialClick(menuName) {
    //this.props.actions.setMenuName(this.props.menuName !== menuName ? menuName : '');
  }

  handleMouseEnter(e, speedDial) {
    // this.props.actions.setMenuName(speedDial.props.name);
  }

  handleMouseLeave(e, speedDial) {
    // this.props.actions.setMenuName('');
  }

  makeSpeedDial(className, miniAction, miniSubAction, direction, tooltipDirection, open, tooltip='') {
    return (
      <SpeedDial
        name={name}
        className={className}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        speedDialElement={
          <FloatingActionButton backgroundColor={blue300} mini={miniAction} onClick={() => this.handleSpeedDialClick(open)}>
          <ContentAdd />
          </FloatingActionButton>
        }
        direction={direction}
        tooltipDirection={tooltipDirection}
        open={open}>
        <FloatingActionButton backgroundColor={green600} data-tooltip={'Mail'} mini={miniSubAction}>
          <ContentMail />
        </FloatingActionButton>
        <FloatingActionButton backgroundColor={yellow700} data-tooltip={'Sort'} mini={miniSubAction}>
          <ContentSort />
        </FloatingActionButton>
        <FloatingActionButton backgroundColor={red300} data-tooltip={'Flag'} mini={miniSubAction}>
          <ContentFlag />
        </FloatingActionButton>
      </SpeedDial>
    );
  }

  render() {
    const {
      label
    } = this.props;

    return (
      <div>
        <h2>SpeedDial Component</h2>
        {this.makeSpeedDial('up1-speed-dial', false, true, 'up', 'left', false, 'Tooltip')}
        <RaisedButton label={label} primary={true} style={{marginBottom: 10}} />

      </div>
    );
  }
}

SpeedDialForm.propTypes = {
  label: PropTypes.string
};

export default SpeedDialForm;
