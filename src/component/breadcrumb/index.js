/**
 * File: /Users/fengchengpu/Project/WFace/wface-ui/src/component/breadcrumb/index.js
 * Project: /Users/fengchengpu/Project/WFace/wface-ui
 * Created Date: Tuesday January 30th 2018 4:07:02 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday January 30th 2018 4:07:02 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import { Breadcrumb } from "antd";
import { History } from "carrot";


export default (props) => {
  const { crumb } = props;
  const breadcrumbItemLoop = data => data.map((cell, i) => {
    return (
      <Breadcrumb.Item key={cell.title}>
        {i < data.length - 1 ? <span className="jump-link" onClick={() => History.push(cell.link)} >{cell.title}</span> : <span>{cell.title}</span> }
      </Breadcrumb.Item>);
  });
  return (
    <div style={{
      marginBottom: "20px",
      // padding: "0px 10px 10px"
    }}
    >
      <Breadcrumb separator=">">
        {breadcrumbItemLoop(crumb)}
      </Breadcrumb>
    </div>);
};
