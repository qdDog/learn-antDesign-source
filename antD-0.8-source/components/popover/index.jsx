import React from 'react';
import Tooltip from 'rc-tooltip';
const prefixCls = 'ant-popover';

export default React.createClass({
  getDefaultProps() {
    return {
      transitionName: '',
      placement: 'top',
      trigger: 'hover',
      overlayStyle: {}
    };
  },
  render() {
    const overlay = <div>
      <div className={prefixCls + '-title'}>
        {this.props.title}
      </div>
      <div className={prefixCls + '-content'}>
        {this.props.overlay}
      </div>
    </div>;

    const transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];

    return (
      <Tooltip placement={this.props.placement}
               prefixCls={prefixCls}
               delay={0.1}
               overlayStyle={this.props.overlayStyle}
               transitionName={transitionName}
               trigger={this.props.trigger}
               overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
});
