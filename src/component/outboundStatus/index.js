/*
 * Created Date: Tuesday April 17th 2018 10:31:35 am
 * Author: gumingxing
 * -----
 * Last Modified:Tuesday April 17th 2018 10:31:35 am
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
    };
  }
  componentDidMount () {
    // console.log(document.querySelectorAll("circle")[1], 11111);
    // const circle = document.querySelectorAll("circle")[1];
    // const circle = this.canvas.childNodes[1];
    // const notReleasedStr = this.props.notReleased;
    // const onTheWayStr = this.props.onTheWay;
    // const completedStr = this.props.completed;
    // const total = this.addition(notReleasedStr, onTheWayStr, completedStr);
    // const a = notReleased + onTheWay + completed;
    // console.log(a, completed / a);
    // const perimeter = Math.PI * 2 * 55;
    // if (total !== 0) {
    //   setTimeout(() => {
    //     circle.setAttribute("stroke-dasharray", (perimeter * (completedStr / total)), "1069");
    //   }, 500);
    // }
    this.circle(this.props.notReleased, this.props.onTheWay, this.props.completed);
  }
  componentWillReceiveProps (nextProps) {
    this.circle(nextProps.notReleased, nextProps.onTheWay, nextProps.completed);
  }
  circle = (notReleasedStr, onTheWayStr, completedStr) => {
    const circle = this.canvas.childNodes[1];
    const total = this.addition(notReleasedStr, onTheWayStr, completedStr);
    const perimeter = Math.PI * 2 * 55;
    if (total !== 0) {
      setTimeout(() => {
        circle.setAttribute("stroke-dasharray", (perimeter * (completedStr / total)) + " " + 2000);
      }, 500);
    }
  };
  addition = (notReleased, onTheWay, completed) => {
    const notReleasedNum = notReleased * 1;
    const onTheWayNum = onTheWay * 1;
    const completedNum = completed * 1;
    const a = notReleasedNum + onTheWayNum + completedNum;
    return a;
  };
  url = (e) => {
    History.push(e);
  };
  render () {
    const { title, version, notReleased, onTheWay, completed, url } = this.props;
    const show = url.length > 0 ?
      <div className="url clickable" onClick={() => this.url(url)} >详情 <Icon type="right" /></div> : "";
    return (

      <div className="task">
        <div className="title-today"><div>{title}</div><small>{version}</small></div>
        <div className="task-info-box">
          <div>
            <div className="task-info">
              <div className="canvas">
                {/* <canvas ref={(e) => { this.canvas = e; }}>当前浏览器不支持canvas组件请升级！</canvas> */}
                <svg width="140" height="140" ref={(e) => { this.canvas = e; }}>
                  <circle cx="70" cy="70" r="55" strokeWidth="15" stroke="#D1D3D7" fill="none">灰色圆</circle>
                  <circle cx="70" cy="70" r="55" strokeWidth="15" stroke="rgb(29,179,161)" fill="none" transform="rotate(-90,70,70)" strokeDasharray="0, 2000">绿色圆</circle>
                  <text x="50%" y="95" fill="#8a8a8a" textAnchor="middle">任务总计</text>
                  <text x="50%" y="45%" style={{ fontSize: "16px", fontWeight: "600" }} textAnchor="middle">{this.addition(notReleased, onTheWay, completed)}</text>
                </svg>
              </div>
              <div>未出库 <span className="red">{notReleased}</span></div>
              <div>在途 <span className="gray">{onTheWay}</span></div>
              <div>已完成 <span className="green">{completed}</span></div>
            </div>
          </div>
          {show}
        </div>
      </div>

    );
  }
}

export default View;
