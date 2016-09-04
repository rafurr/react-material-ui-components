/*eslint-disable react/no-set-state */
import React, {PropTypes} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Tooltip from 'material-ui/internal/Tooltip';

export class SpeedDial extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    direction: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    speedDialElement: PropTypes.node,
    tooltipDirection: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
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
    //Todo: Option to have the tooltips show only when hovered over
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

  calculateWidth(miniButton, miniItem, itemsCount) {
    const sizeOffset = miniButton ? 11 : 14;
    const sizeSeparator = miniItem ? 9 : 10;
    const floatingActionButton = getMuiTheme().floatingActionButton;
    const sizeItem = miniItem ? floatingActionButton.miniSize : floatingActionButton.buttonSize;
    const sizeButton = miniButton ? floatingActionButton.miniSize : floatingActionButton.buttonSize;

    const buttonOffset = !miniButton && miniItem ? sizeOffset + 2 : sizeOffset;
    return sizeButton + buttonOffset + (itemsCount * sizeItem) + ((itemsCount - 1) * sizeSeparator);
  }

  render() {
    const {
      open,
      style,
      children,
      className,
      direction,
      speedDialElement
    } = this.props;

    const items = this.buildItems();
    const miniActions = children[0].props.mini;
    const miniSpeedDial = speedDialElement.props.mini;
    const visibleClassName = open ? 'is-visible' : 'is-hidden';
    const miniClassName = miniSpeedDial ? ' speed-dial-small' : '';

    let divStyle = style;
    if (direction=='left' || direction=='right') {
      const divSize = this.calculateWidth(miniSpeedDial, miniActions, children.length) + 'px';
      const textAlign = direction === 'right' ? 'left' : 'right';
      divStyle = {...style, textAlign: textAlign, width: divSize};
    }

    return (
      <div ref={(ref) => this._speeddial = ref}
           style={divStyle}
           className={className + miniClassName + ' speed-dial-' + direction}
           onMouseEnter={e => this.handleMouseEnter(e)}
           onMouseLeave={e => this.handleMouseLeave(e)}>
        {(direction === 'down' || direction === 'right') && speedDialElement}
        <ul className={'speed-dial-list ' + visibleClassName}>
          {items}
        </ul>
        {(direction === 'up' || direction === 'left') && speedDialElement}
      </div>
    );
  }
}
