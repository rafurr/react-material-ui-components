/*eslint-disable react/no-set-state */
import React, {PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

// NumberInput is based on rc-input-number
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
    const props = this.props;
    const value = this.toPrecisionAsStep(('value' in props) ? props.value : props.defaultValue);
    return {
      inputValue: value,
      value: value,
      focused: props.autoFocus
    };
  }

  onChange(event) {
    const value = this.toPrecisionAsStep(event.target.value.trim());
    //If the value is greater than the max then set value tp max
    this.setInputValue(value > this.props.max ? this.props.max : value);
  }

  onKeyDown(e, ...args) {
    const keyCode = e.keyCode;
    const validKeyCodes = "8 37 39 46 48 49 50 51 52 53 54 55 56 57 189";
    if (keyCode === 38) {
      this.up(e);
    } else if (keyCode === 40) {
      this.down(e);
    } else if (validKeyCodes.includes(keyCode)) {
      this.props.onKeyDown(e, ...args);
    } else {
      e.preventDefault();
    }
  }

  onFocus(...args) {
    this.setState({
      focused: true
    });
    this.props.onFocus(...args);
  }

  onBlur(e, ...args) {
    this.setState({
      focused: false
    });

    let value = e.target.value.trim();
    value = value.length > 0 ? value : this.props.min;
    value = this.getCurrentValidValue(value);
    this.setValue(value);
    this.props.onBlur(e, ...args);
  }

  onStepMouseDown(e) {
    e.preventDefault();
    const value = this.getCurrentValidValue(this.state.inputValue);
    this.setState({ value });
  }

  getCurrentValidValue(value) {
    let val = value;
    const props = this.props;
    if (val === '') {
      val = '';
    } else if (!isNaN(val)) {
      val = Number(val);
      if (val < props.min) {
        val = props.min;
      }
      if (val > props.max) {
        val = props.max;
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
    const props = this.props;
    const stepString = props.step.toString();
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
      step,
      min
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
    if (e) {
      e.preventDefault();
    }
    const props = this.props;
    if (props.disabled) {
      return;
    }
    const value = this.state.value;
    if (isNaN(value)) {
      return;
    }
    const val = this[type + 'Step'](value);
    if (val > props.max || val < props.min) {
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

  render() {
    if (!this.state) {
      return (<div />);
    }
    const props = {...this.props};
    // Remove React warning.
    // Warning: Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both).
    delete props.defaultValue;

    //ToDo: Either pull in classNames or find another way
    /*const classes = classNames({
     [prefixCls]: true,
     [props.className]: !!props.className,
     [`${prefixCls}-disabled`]: props.disabled,
     [`${prefixCls}-focused`]: this.state.focused
     });*/

    let upDisabledClass = '';
    let downDisabledClass = '';
    const value = this.state.value;
    if (!isNaN(value)) {
      const val = Number(value);
      if (val >= props.max) {
        upDisabledClass = `rc-input-number-handler-up-disabled`;
      }
      if (val <= props.min) {
        downDisabledClass = `rc-input-number-handler-down-disabled`;
      }
    } else {
      upDisabledClass = `rc-input-number-handler-up-disabled`;
      downDisabledClass = `rc-input-number-handler-down-disabled`;
    }

    // focus state, show input value
    // unfocus state, show valid value
    const inputDisplayValue = this.state.focused ? this.state.inputValue : this.state.value;

    let inputStyle;
    let buttonStyle;
    let divStyle;

    if (props.floatingLabelText) {
      divStyle = {height: 56, width: 200};
      inputStyle = {transform: 'translate(0, -12px)'};
      buttonStyle = {transform: 'translate(0, -23px)', minHeight: '57px', height: '57px'};
    } else {
      divStyle = {height: 36, width: 200};
      inputStyle = {transform: 'translate(0, -8px)'};
      buttonStyle = {transform: 'translate(0, -6px)'};
    }
    divStyle = {...divStyle, ...this.props.style, border: "1px solid #ccc", borderRadius: 2};
    inputStyle = {...inputStyle, marginLeft: '5px', marginRight: '5px', width: 'calc(100% - 90px)'};//90 = 40 + 40 + 10 + 2
    buttonStyle = {...buttonStyle, borderRadius: '0', minWidth: '40px', width: '40px'};
    const leftButtonStyle = {...buttonStyle, borderRight: '1px solid #ccc' };
    const rightButtonStyle = {...buttonStyle, borderLeft: '1px solid #ccc' };

    return (
      <div style={divStyle}>
        <FlatButton
          ref="down"
          label="-"
          disabled={props.disabled}
          onMouseDown={this.onStepMouseDown}
          onClick={downDisabledClass ? ()=>{} : this.down}
          style={leftButtonStyle}/>
        <TextField
          ref="input"
          value={inputDisplayValue}
          hintText={props.hintText}
          floatingLabelText={props.floatingLabelText}
          autoComplete="off"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          autoFocus={props.autoFocus}
          readOnly={props.readOnly}
          disabled={props.disabled}
          max={props.max}
          min={props.min}
          name={props.name}
          onChange={this.onChange}
          style={inputStyle}/>
        <FlatButton
          ref="up"
          label="+"
          disabled={props.disabled}
          onMouseDown={this.onStepMouseDown}
          onClick={upDisabledClass ? ()=>{} : this.up}
          style={rightButtonStyle}/>
      </div>
    );
  }
}

NumberInput.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  width: PropTypes.string
};

NumberInput.defaultProps = {
  max: Infinity,
  min: -Infinity,
  step: 1,
  style: {},
  defaultValue: '',
  onChange: ()=>{},
  onKeyDown: ()=>{},
  onFocus: ()=>{},
  onBlur: ()=>{}
};
