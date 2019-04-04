/*
 * Created Date: Thursday April 19th 2018 8:00:42 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday April 19th 2018 8:00:42 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import PropTypes from "prop-types";

import { Icon } from "antd";

const Tag = props => {
  return (
    <span
      style={{
        border: "1px solid #dfdfdf",
        borderRadius: "5px",
        padding: "5px 10px",
        userSelect: "none",
        margin: 5,
        display: "flex",
        ...props.style
      }}
      ref={props.reference}
    >
      <span
        style={{
          maxWidth: "150px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          userSelect: "none"
        }}
      >
        {props.children}
      </span>
      <span
        style={{
          cursor: "pointer",
          marginLeft: "auto",
        }}
        onClick={() => {
          props.onClick(props.record, props.idx);
        }}
      >
        <Icon type="close" />
      </span>
    </span>
  );
};

Tag.propTypes = {
  record: PropTypes.any,
  idx: PropTypes.number,
  onClick: PropTypes.func
};

export default Tag;
