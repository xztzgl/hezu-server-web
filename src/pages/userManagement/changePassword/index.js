/*
 * File: /Users/fengchengpu/Project/TangQuan/BlockChainBrowser-TangQuan/src/pages/home/index.js
 * Project: /Users/fengchengpu/Project/TangQuan/BlockChainBrowser-TangQuan
 * Created Date: Sunday April 8th 2018 3:40:29 pm
 * Author: gumingxing
 * -----
 * Last Modified:Monday April 16th 2018 3:52:25 pm
 * Modified By: Djoz
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
import { Tabs } from "antd";

import Detail from "./detail";

import "./style.scss";

const { TabPane } = Tabs;


class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeKey: "1"
    };
  }
  toggleModal = () => this.setState((prevState) => {
    let stateData = {
      modalShowed: !prevState.modalShowed
    };
    if (prevState.modalShowed) {
      stateData = Object.assign({}, stateData, {
        modalContent: null
      });
    }
    return stateData;
  });

  render () {
    const {
      activeKey
    } = this.state;
    return (
      <div className="packset">
        <Tabs
          type="card"
          activeKey={activeKey}
          onChange={(value) => {
            this.setState({
              activeKey: value,
            });
          }}
        >
          <TabPane tab="修改密码" key="1">
            <Detail parentThis={this} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default View;
