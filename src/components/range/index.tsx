import { observer } from 'mobx-react';
import * as React from 'react';
import RcRange from 'rc-slider/lib/Range';
import RangeProps from './PropsType';
@observer
export default class Range extends React.Component<RangeProps, any> {
  static defaultProps = {
    prefixCls: 'am-slider',
  };

  render() {
    return (
      <div className={`${this.props.prefixCls}-wrapper`}><RcRange {...this.props} /></div>
    );
  }
}
