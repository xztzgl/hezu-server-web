/*
 * Created Date: Monday April 9th 2018 2:10:52 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday April 9th 2018 2:10:52 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Comp = props => {
  return (
    <div className="block-browser-foot" >
      {props.title}
    </div>
  );
};

Comp.propTypes = {
  title: PropTypes.string.isRequired
};

export default Comp;
