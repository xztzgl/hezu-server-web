/*
 * Created Date: Friday April 20th 2018 5:27:25 pm
 * Author: gumingxing
 * -----
 * Last Modified:Friday April 20th 2018 5:27:25 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import "./style.scss";

const View = (props) => (
  <div className="block-info" >
    <div className="key">{props.keyname}</div>
    <div className="value">{props.value}</div>
  </div >);

export default View;
