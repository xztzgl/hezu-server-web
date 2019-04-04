/*
 * Created Date: Monday April 23rd 2018 2:13:29 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday April 23rd 2018 2:13:29 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import { Input, Button } from "antd";
import PropTypes from "prop-types";

class Comp extends React.Component {
  state = {
    value: this.props.defaultValue
  };
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  render () {
    const { onSearch, style, ...other } = this.props;
    const { value } = this.state;
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        width: 400,
        ...style
      }}
      >
        <Input value={value} onChange={this.onChange} {...other} />
        <Button type="primary" onClick={() => onSearch && onSearch(value)} >
          查询
        </Button>
      </div>
    );
  }
}

Comp.propTypes = {
  addonBefore: PropTypes.string,
};
Comp.defaultProps = {
  addonBefore: "label"
};

export default Comp;
