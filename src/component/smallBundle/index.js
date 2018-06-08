/*
 * Created Date: Saturday April 21st 2018 3:54:46 pm
 * Author: gumingxing
 * -----
 * Last Modified:Saturday April 21st 2018 3:54:46 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";

class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  changeName = () => {
    const checked = this.props.checkedValue; // 查找的字符值
    const checkedLenght = checked.length; // 字符长度
    const newArry = [];
    const nameValue = this.props.name; // 原始值
    if (checkedLenght > 0) {
      const nameSmall = nameValue.toLowerCase(); // 转化成小写
      const start = nameSmall.indexOf(checked); // 字符位置
      const interceptValue = nameValue.substr(start, checkedLenght); // 截取值
      const interceptreplace = nameValue.replace(interceptValue, "-"); // 截取值的下标
      const interceptArry = interceptreplace.length === 1 ? [""] : interceptreplace.split("-");
      const recombinationString = () => { // 拆分字符串
        interceptArry.map(v => {
          const length = v.length > 0;
          newArry.push({
            name: length ? v : interceptValue,
            open: length ? !true : true,
          });
          return true;
        });
      };
      if (start === 0 || interceptArry[interceptArry.length - 1].length === 0) {
        recombinationString();
      } else {
        recombinationString();
        const d = {
          name: interceptValue,
          open: true,
        };
        newArry.splice(1, 0, d);
      }
    }
    return newArry.length > 0 ? newArry : [{ name: `${nameValue}`, open: false }];
  };
  render () {
    return (
      <div className="gzh" >{this.changeName().map((v, i) => <span key={i} style={v.open ? { color: "#a94442", fontWeight: "bold" } : {}} >{v.name}</span>)}</div>
    );
  }
}

export default View;
