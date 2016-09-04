/*eslint-disable react/no-set-state */
import React, {PropTypes} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Tooltip from 'material-ui/internal/Tooltip';

import '../styles/speed-dial.scss';

export class SpeedDial extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    speedDialElement: PropTypes.node,
    style: PropTypes.object,
    open: PropTypes.bool,
    direction: PropTypes.string,
    tooltipDirection: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
  };

  static defaultProps = {
    direction: 'up',
    tooltipDirection: 'left'
  };

  constructor(props) {
    super(props);
    this.state = {isMouseOver: false};
  }

  isMouseOver() {
    return this.state.isMouseOver;
  }

  resetIsMouseOver() {
    this.setState({isMouseOver: false});
  }

  setIsMouseOver() {
    this.setState({isMouseOver: true});
  }

  isMouseInside(x, y, rect) {
    return (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom);
  }

  handleMouseEnter(e) {
    if(!this.isMouseOver()) {
      this.props.onMouseEnter && this.props.onMouseEnter(e, this);
      this.setIsMouseOver();
    }
  }

  handleMouseLeave(e) {
    const rect = this._speeddial.getBoundingClientRect();
    const mouseInside = this.isMouseInside(e.clientX, e.clientY, rect);

    if (!mouseInside) {
      this.props.onMouseLeave && this.props.onMouseLeave(e, this);
      this.resetIsMouseOver();
    }
  }

  buildItems() {
    //ToDo: Work on tooltip location option, i.e, for up tooltip can be either on the left or right side. etc.
    //Todo: another option is to have the tooltips show only when hovered over
    const {
      open,
      direction,
      tooltipDirection,
      children
    } = this.props;

    const mini = children[0].props.mini;
    let top, right;
    if (direction === 'left' || direction === 'right') {
      top = mini ? -15 : -15;
      right = mini ? 3 : 11;
      if (tooltipDirection === 'bottom') {
        top = mini ? 64 : 80;
      }
    } else {
      top = mini ? 22 : 30;
      right = mini ? 50 : 65;
      if (tooltipDirection === 'right') {
        right = mini ? -45 : -45;
      }
    }
    let i = open ? 0 : children.length - 1;
    let o = open ? 1 : -1;
    return children.map((item, index) => {
      const delay = 0.05 * i + 's';
      i = i + o;
      return (
        <li
          key={'item' + index}
          style={{
            WebkitAnimationDelay: delay,
            animationDelay: delay
          }}
          className="speed-dial-option">
          {item}
          {item.props['data-tooltip'] && <Tooltip
            show
            label={item.props['data-tooltip']}
            style={{right: right, top:top}}
            horizontalPosition="left"
            verticalPosition="top"
            touch={false}
          />}
        </li>
      );});
  }
/*
 <div style={{verticalAlign:'middle', background:'pink'}}>
 <span style={{background:'red'}}>Hello</span>
 <FloatingActionButton style={{verticalAlign:'middle'}} mini={miniSubAction}>
 <ContentMail />
 </FloatingActionButton>
 </div>
*/
  calculateWidth(miniButton, miniItem, itemsCount) {
    const floatingActionButton = getMuiTheme().floatingActionButton;
    const sizeButton = miniButton ? floatingActionButton.miniSize : floatingActionButton.buttonSize;
    let sizeOffset = miniButton ? 11 : 14;
    sizeOffset = !miniButton && miniItem ? sizeOffset + 2 : sizeOffset;
    const sizeItem = miniItem ? floatingActionButton.miniSize : floatingActionButton.buttonSize;
    const separatorSize = miniItem ? 9 : 10;
    return sizeButton + sizeOffset + (itemsCount * sizeItem) + ((itemsCount - 1) * separatorSize);
  }

  render() {
    const {
      className,
      speedDialElement,
      style,
      open,
      direction,
      children
    } = this.props;

    const items = this.buildItems();

    const isVisibleClassName = open ? 'is-visible' : 'is-hidden';

    const smallClassName = speedDialElement.props.mini ? ' speed-dial-small' : '';
    
    let divStyle=style;
    if (direction=='right') {
      const divSize = this.calculateWidth(speedDialElement.props.mini, children[0].props.mini, children.length);
      divStyle={textAlign:'left', width: divSize+'px', ...divStyle};
    }
    if (direction=='left') {
      const divSize = this.calculateWidth(speedDialElement.props.mini, children[0].props.mini, children.length);
      divStyle={textAlign:'right', width: divSize+'px', ...divStyle};
    }

    return (
      <div ref={(ref) => this._speeddial = ref}
           style={divStyle}
           className={className + smallClassName + ' speed-dial-' + direction}
           onMouseEnter={e => this.handleMouseEnter(e)}
           onMouseLeave={e => this.handleMouseLeave(e)}>
        {(direction==='down' || direction==='right') && speedDialElement}
        <ul className={'speed-dial-list ' + isVisibleClassName}>
          {items}
        </ul>
        {(direction==='up' || direction==='left') && speedDialElement}
      </div>
    );
  }
}
