import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  setCount
} from '../actions/demoActions';

function mapStateToProps(state) {
  return {
    count: state.demoAppState.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCount
    }, dispatch)
  };
}

export class ReduxPage extends React.Component {

  constructor() {
    super();

    this.handleDecrementClicked = this.handleDecrementClicked.bind(this);
    this.handleIncrementClicked = this.handleIncrementClicked.bind(this);
    this.handleResetClicked = this.handleResetClicked.bind(this);
  }

  handleDecrementClicked() {
    this.props.actions.setCount(this.props.count - 1);
  }

  handleIncrementClicked() {
    this.props.actions.setCount(this.props.count + 1);
  }

  handleResetClicked() {
    this.props.actions.setCount(0);
  }

  render() {
    const {
      count
    } = this.props;

    return (
      <div>
        <h2>Redux Demo</h2>
        <div style={{ margin: '15px 0 5px 0'}}>
          Count: {count}
        </div>
        <button
          disabled={count==0}
          style={{width: '30px', marginRight: '5px'}}
          onClick={()=>this.handleDecrementClicked()}>
          -
        </button>
        <button
          style={{width: '30px', marginRight: '5px'}}
          onClick={()=>this.handleIncrementClicked()}>
          +
        </button>
        <button
          disabled={count==0}
          onClick={()=>this.handleResetClicked()}>
          Reset
        </button>
      </div>
    );
  }
}

ReduxPage.propTypes = {
  actions: PropTypes.shape({
    setCount: PropTypes.func
  }),
  count: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage);