import React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import Touchable from 'rc-touchable';
import SegmentedControlProps from './PropsType';
@observer
export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
  static defaultProps = {
    prefixCls: 'am-segment',
    selectedIndex: 0,
    disabled: false,
    values: [],
    onChange() {},
    onValueChange() {},
    style: {},
  };
  @observable _state = {
    selectedIndex: null,
  }
  @action changeState(state: any, callBack?: Function) {
    this._state = Object.assign(toJS(this._state), state);
    callBack();
  }
  constructor(props) {
    super(props);
    this.changeState({
      selectedIndex: props.selectedIndex,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this._state.selectedIndex) {
      this.changeState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  onClick(e, index, value) {
    const { disabled, onChange, onValueChange } = this.props;
    if (!disabled && this._state.selectedIndex !== index) {
      // just do a mock so that the api to be the same as react-native
      e.nativeEvent = e.nativeEvent ? e.nativeEvent : {};
      e.nativeEvent.selectedSegmentIndex = index;
      e.nativeEvent.value = value;
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(value);
      }
      this.changeState({
        selectedIndex: index,
      });
    }
  }

  renderSegmentItem(idx, value, selected) {
    const { prefixCls, disabled, tintColor } = this.props;

    const itemCls = classNames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-selected`]: selected,
    });

    const itemStyle = {
      color: selected ? '#fff' : tintColor,
      backgroundColor: selected ? tintColor : '#fff',
      borderColor: tintColor,
    };
    return (
      <Touchable
        key={idx}
        disabled={disabled}
        activeClassName={`${prefixCls}-item-active`}
      >
        <div
          className={itemCls}
          style={itemStyle}
          onClick={disabled ? undefined : (e) => this.onClick(e, idx, value)}
        >
          <div className={`${prefixCls}-item-inner`} />
          {value}
        </div>
      </Touchable>
    );
  }

  render() {
    const { className, prefixCls, style, disabled, values = [] } = this.props;

    const wrapCls = classNames({
      [className as string]: !!className,
      [`${prefixCls}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    });

    return (
      <div className={wrapCls} style={style}>
        {values.map((value, idx) => this.renderSegmentItem(idx, value, idx === this._state.selectedIndex))}
      </div>
    );
  }
}
