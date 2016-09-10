/*eslint-disable react/no-set-state */

/**
 * Initial code is based on author below but modified by Robert Furr
 * rc-input-number - input number ui component for react
 *
 * @version v2.7.0
 * @homepage https://github.com/fis-components/rc-input-number
 * @license MIT
 */

import React, {PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export class NumberInput extends React.Component {

  constructor() {
    super();

    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onStepMouseDown = this.onStepMouseDown.bind(this);
    this.onStepMouseDown = this.onStepMouseDown.bind(this);
  }

  componentWillMount() {
    this.state = this.getState();
  }

  componentDidMount() {
    // this.state = this.getState();
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = this.toPrecisionAsStep(nextProps.value);
      this.setState({
        inputValue: value,
        value: value
      });
    }
  }

  componentDidUpdate() {
    if (this.state.focused && document.activeElement !== this.refs.input) {
      this.refs.input.focus();
    }
  }

  getState() {
    const {
      value,
      defaultValue,
      autoFocus
    } = this.props;

    const v = this.toPrecisionAsStep(('value' in this.props) ? value : defaultValue);
    return {
      inputValue: v,
      value: v,
      focused: autoFocus
    };
  }

  onChange(event) {
    const {
      max
    } = this.props;

    const value = this.toPrecisionAsStep(event.target.value.trim());
    //If the value is greater than the max then set value tp max
    this.setInputValue(value > max ? max : value);
  }

  onKeyDown(e, ...args) {
    const {
      readOnly,
      onKeyDown
    } = this.props;

    if (!readOnly) {
      const keyCode = e.keyCode;
      const validKeyCodes = "8 37 39 46 48 49 50 51 52 53 54 55 56 57 189";
      if (keyCode === 38) {
        this.up(e);
      } else if (keyCode === 40) {
        this.down(e);
      } else if (validKeyCodes.includes(keyCode)) {
        onKeyDown(e, ...args);
      } else {
        e.preventDefault();
      }
    }
  }

  onFocus(...args) {
    this.setState({
      focused: true
    });
    this.props.onFocus(...args);
  }

  onBlur(e, ...args) {
    const {
      min,
      readOnly,
      nopOnBlur,
      onBlur
    } = this.props;

    this.setState({
      focused: false
    });

    if (!readOnly && !nopOnBlur) {
      let value = e.target.value.trim();
      value = value.length > 0 ? value : min;
      value = this.getCurrentValidValue(value);
      this.setValue(value);
      onBlur(e, ...args);
    }
  }

  onStepMouseDown(e) {
    e.preventDefault();
    const value = this.getCurrentValidValue(this.state.inputValue);
    this.setState({value});
  }

  getCurrentValidValue(value) {
    const {
      min,
      max
    } = this.props;

    let val = value;
    if (val === '') {
      val = '';
    } else if (!isNaN(val)) {
      val = Number(val);
      if (val < min) {
        val = min;
      }
      if (val > max) {
        val = max;
      }
    } else {
      val = this.state.value;
    }
    return this.toPrecisionAsStep(val);
  }

  setValue(v) {
    if (!('value' in this.props)) {
      this.setState({
        value: v,
        inputValue: v
      });
    }
    this.props.onChange(null, isNaN(v) || v === '' ? undefined : v);
  }

  setInputValue(v) {
    this.setState({
      inputValue: v
    });
  }

  getPrecision() {
    const stepString = this.props.step.toString();
    if (stepString.indexOf('e-') >= 0) {
      return parseInt(stepString.slice(stepString.indexOf('e-')), 10);
    }
    let precision = 0;
    if (stepString.indexOf('.') >= 0) {
      precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
  }

  getPrecisionFactor() {
    const precision = this.getPrecision();
    return Math.pow(10, precision);
  }

  toPrecisionAsStep(num) {
    if (isNaN(num) || num === '') {
      return num;
    }
    const precision = this.getPrecision();
    return Number(Number(num).toFixed(precision));
  }

  upStep(val) {
    const {
      step,
      min
    } = this.props;

    const precisionFactor = this.getPrecisionFactor();
    let result;
    if (typeof val === 'number') {
      result = (precisionFactor * val + precisionFactor * step) / precisionFactor;
    } else {
      result = min === -Infinity ? step : min;
    }
    return this.toPrecisionAsStep(result);
  }

  downStep(val) {
    const {
      min,
      step
    } = this.props;

    const precisionFactor = this.getPrecisionFactor();
    let result;
    if (typeof val === 'number') {
      result = (precisionFactor * val - precisionFactor * step) / precisionFactor;
    } else {
      result = min === -Infinity ? -step : min;
    }
    return this.toPrecisionAsStep(result);
  }

  step(type, e) {
    const {
      min,
      max,
      disabled
    } = this.props;

    if (e) {
      e.preventDefault();
    }

    if (disabled) {
      return;
    }
    const value = this.state.value;
    if (isNaN(value)) {
      return;
    }
    const val = this[type + 'Step'](value);
    if (val > max || val < min) {
      return;
    }
    this.setValue(val);
    this.setState({
      focused: true
    });
  }

  down(e) {
    this.step('down', e);
  }

  up(e) {
    this.step('up', e);
  }

  focus() {
    this.refs.input.focus();
  }

  styles() {
    const {
      style,
      disabled,
      readOnly,
      floatingLabelText
    } = this.props;

    let inputStyle;
    let buttonStyle;
    let componentStyle;

    if (floatingLabelText) {
      componentStyle = {height: 56, width: 200};
      inputStyle = {transform: 'translate(0, -12px)'};
      buttonStyle = {transform: 'translate(0, -23px)', minHeight: '57px', lineHeight: '57px'};
    } else {
      componentStyle = {height: 36, width: 200};
      inputStyle = {transform: 'translate(0, -8px)'};
      buttonStyle = {transform: 'translate(0, -6px)'};
    }

    buttonStyle = {...buttonStyle, borderRadius: '0', minWidth: '40px', width: '40px'};
    buttonStyle = disabled || readOnly ? {...buttonStyle, cursor: 'not-allowed'} : buttonStyle;

    return {
      componentStyle: {...componentStyle, ...style, border: "1px solid #ccc", borderRadius: 2},
      inputStyle: {...inputStyle, marginLeft: '5px', marginRight: '5px', width: 'calc(100% - 90px)'}, //90 = 40 + 40 + 10 + 2
      leftButtonStyle: {...buttonStyle, borderRight: '1px solid #ccc'},
      rightButtonStyle: {...buttonStyle, borderLeft: '1px solid #ccc'}
    };
  }

  render() {
    if (!this.state) {
      return (<div />);
    }

    const {
      value,
      inputValue,
      focused
    } = this.state;

    // Remove React warning.
    // Warning: Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both).
    const props = {...this.props};
    delete props.defaultValue;

    const {
      min,
      max,
      name,
      disabled,
      readOnly,
      autoFocus,
      hintText,
      floatingLabelText
    } = props;

    let upDisabledClass = '';
    let downDisabledClass = '';

    if (!isNaN(value)) {
      const val = Number(value);
      if (val >= max) {
        upDisabledClass = `rc-input-number-handler-up-disabled`;
      }
      if (val <= min) {
        downDisabledClass = `rc-input-number-handler-down-disabled`;
      }
    } else {
      upDisabledClass = `rc-input-number-handler-up-disabled`;
      downDisabledClass = `rc-input-number-handler-down-disabled`;
    }

    // focus state, show input value
    // unfocus state, show valid value
    const inputDisplayValue = focused ? inputValue : value;

    const styles = this.styles();

    return (
      <div style={styles.componentStyle}>
        <FlatButton
          ref="down"
          label="-"
          style={styles.leftButtonStyle}
          disabled={disabled || readOnly}
          onMouseDown={this.onStepMouseDown}
          onClick={downDisabledClass ? ()=>{} : this.down} />
        <TextField
          ref="input"
          style={styles.inputStyle}
          value={inputDisplayValue}
          hintText={hintText}
          floatingLabelText={floatingLabelText}
          autoComplete="off"
          autoFocus={autoFocus}
          readOnly={readOnly}
          disabled={disabled}
          min={min}
          max={max}
          name={name}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange} />
        <FlatButton
          ref="up"
          label="+"
          style={styles.rightButtonStyle}
          disabled={disabled || readOnly}
          onMouseDown={this.onStepMouseDown}
          onClick={upDisabledClass ? ()=>{} : this.up} />
      </div>
    );
  }
}

NumberInput.propTypes = {
  style: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  width: PropTypes.string,
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  nopOnBlur: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

NumberInput.defaultProps = {
  min: -Infinity,
  max: Infinity,
  step: 1,
  style: {},
  defaultValue: '',
  readOnly: false,
  disabled: false,
  nopOnBlur: false,
  onBlur: ()=>{},
  onFocus: ()=>{},
  onChange: ()=>{},
  onKeyDown: ()=>{}
};
