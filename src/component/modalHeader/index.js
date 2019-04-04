/**
 * File: /Users/fengchengpu/Project/WFace/wface-ui/src/component/modalHeader/index.js
 * Project: /Users/fengchengpu/Project/WFace/wface-ui
 * Created Date: Saturday January 27th 2018 4:42:18 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday January 27th 2018 4:42:18 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import { FixedTool } from "carrot";

const pageHeaderStyle = {
  position: "absolute",
  top: 0,
  width: "100%",
  marginBottom: 20,
  backgroundColor: "#fff",
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const ModalHeader = props => (
  <div>
    <FixedTool style={pageHeaderStyle}>
      <span style={{ marginLeft: 20 }}>{props.title}</span>
    </FixedTool>
  </div>
);

export default ModalHeader;
