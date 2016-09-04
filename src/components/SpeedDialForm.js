import React, {PropTypes} from 'react';

import '../styles/speed-dial.scss';
import {SpeedDial} from './SpeedDial';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentMail from 'material-ui/svg-icons/content/mail';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import ContentSort from 'material-ui/svg-icons/content/sort';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {blue300, green300, yellow300, red300} from 'material-ui/styles/colors';

class SpeedDialForm extends React.Component {

  constructor() {
    super();
  }

  makeSpeedDial(className, miniAction, miniSubAction, direction, tooltipDirection) {
    const {
      open,
      onMouseEnter,
      onMouseLeave,
      onClick
    } = this.props;

    return (
      <SpeedDial
        name={name}
        className={className}
        onMouseLeave={onMouseLeave}
        speedDialElement={
          <FloatingActionButton backgroundColor={blue300} mini={miniAction} onMouseEnter={onMouseEnter} onClick={onClick}>
          <ContentAdd />
          </FloatingActionButton>
        }
        direction={direction}
        tooltipDirection={tooltipDirection}
        open={open}>
        <FloatingActionButton backgroundColor={green300} data-tooltip={'Mail'} mini={miniSubAction}>
          <ContentMail />
        </FloatingActionButton>
        <FloatingActionButton backgroundColor={yellow300} data-tooltip={'Sort'} mini={miniSubAction}>
          <ContentSort />
        </FloatingActionButton>
        <FloatingActionButton backgroundColor={red300} data-tooltip={'Flag'} mini={miniSubAction}>
          <ContentFlag />
        </FloatingActionButton>
      </SpeedDial>
    );
  }

  render() {
    return (
      <div>
        <h2>SpeedDial Component</h2>
        <h4>Note: Look Bottom Right</h4>
        {this.makeSpeedDial('up1-speed-dial', false, true, 'up', 'left')}
      </div>
    );
  }
}

SpeedDialForm.propTypes = {
  open: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func
};

export default SpeedDialForm;
