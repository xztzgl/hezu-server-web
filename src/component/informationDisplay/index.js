/*
 * Created Date: Tuesday April 17th 2018 11:09:00 am
 * Author: gumingxing
 * -----
 * Last Modified:Tuesday April 17th 2018 11:09:00 am
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
import { Icon } from "antd";
import { History } from "carrot";
// import config from "projectRoot/config.json";
import "./style.scss";


class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
      whether: "none"
    };
  }
  componentDidMount () {
  }
  onMouseEnter = () => {
    this.setState({
      whether: "block"
    });
  };
  onMouseLeave = () => {
    this.setState({
      whether: "none"
    });
  };
  url = (e) => {
    History.push(e);
  };
  render () {
    const { title, url, data } = this.props;
    const show = url.length > 0 ?
      <div className="url clickable" onClick={() => this.url(url)} >详情 <Icon type="right" /></div> :
      (
        <div className="tips">
          <div>{this.props.tips}捆数据未上传 <Icon onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()} type="exclamation-circle-o" /></div>
          <div className="tips-box" style={{ display: `${this.state.whether}` }}>
            <div className="grayA">请联系客服人员解决</div>
            <div className="green">
              <i className="icon_phone">1</i> 400 999 9999
            </div>
          </div>
        </div>
      );
    return (
      <div className="blocks">
        <div className="title-today"><div>{title}</div>{show}</div>
        {
          data.map((v, i) => (
            <div className="block-content" key={i}><div>{v.keyName}</div>
              <div>
                <div><span>{v.newAdd.length > 0 ? `今日新增${v.newAdd}包` : ""}</span><b>{v.bagOrbundle}{v.type}</b></div>
                <div>合计{v.total}元</div>
              </div>
            </div>))
        }
      </div>
    );
  }
}

export default View;
