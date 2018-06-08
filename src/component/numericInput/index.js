/**
 * File: /Users/fengchengpu/Project/WFace/wface-ui/src/component/numericInput/index.js
 * Project: /Users/fengchengpu/Project/WFace/wface-ui
 * Created Date: Friday February 2nd 2018 3:36:25 pm
 * Author: chengpu
 * -----
 * Last Modified:Sunday February 11th 2018 2:32:10 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import { Input } from "antd";
import { limitSomeDecimals } from "../../util/tools";

export default class NumericInput extends React.Component {
  static defaultPropss = {
    max: Infinity,
    min: 0,
    precision: 2,
  };
  state={
    value: ""
  };
  onChange = (e) => {
    const { value } = e.target;
    const { onChange, precision } = this.props;
    // const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    // if ((!Number.isNaN(value) && reg.test(value)) || value === "" || value === "-") {
    // }
    const rv = limitSomeDecimals(value, +precision);
    if (onChange) {
      onChange(rv);
    } else {
      this.setState({
        value: rv
      });
    }
  };
  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange, max, min } = this.props;
    const rv = limitSomeDecimals(value);
    if (onChange) {
      if (!rv) {
        onChange(rv);
      } else if (max < value) {
        onChange(max);
      } else if (min > value) {
        onChange(min);
      } else {
        onChange(+rv);
      }
    } else if (max < value) {
      this.setState({
        value: max
      });
    } else if (min > value) {
      this.setState({
        value: min
      });
    } else {
      this.setState({
        value: +rv
      });
    }
    if (onBlur) {
      onBlur();
    }
  };
  render () {
    return (
      <Input
        value={this.state.value}
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
