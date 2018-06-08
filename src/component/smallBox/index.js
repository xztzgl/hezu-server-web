/*
 * Created Date: Friday April 20th 2018 8:15:46 pm
 * Author: gumingxing
 * -----
 * Last Modified:Friday April 20th 2018 8:15:46 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import "./style.scss";

const bundles = (props) => {
  props.bundles(props.code);
};
const View = (props) => (
  <div className="box" onClick={() => bundles(props)}>
    <div>{props.name}</div>
    <div>{props.nameChild}</div>
    <div>{props.code}</div>
  </div>);

export default View;
