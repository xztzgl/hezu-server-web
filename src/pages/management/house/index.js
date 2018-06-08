import React, { Component } from "react";
import { Storage, Request } from "carrot";
import { Breadcrumb } from "srcDir/component";

// import moment from "moment";

// import styles from "./style.module.scss";

const host = Storage.get("host");

class View extends Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     clearingRecordDataSource: {}
  //   };
  // }
  componentDidMount () {
    this.loadData();
  }
  loadData = (obj = {}) => {
    const { limit = 20, page = 1 } = obj;
    Request.GET(`${host}/clean-records`, {
      params: {
        page,
        limit,
      }
    }).then((res) => {
      console.log(res);
    });
  };

  render () {
    return (
      <div>
        <Breadcrumb crumb={[{ title: "首页", link: "/" }, { title: "房屋信息管理" }]} />
      </div>
    );
  }
}

export default View;
