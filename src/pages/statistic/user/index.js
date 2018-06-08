import React, { Component } from "react";
import { Storage, Request } from "carrot";
import { Breadcrumb } from "srcDir/component";
import QuotaBox from "srcDir/component/statistic/quotaBox";

// import moment from "moment";

import styles from "./style.module.scss";

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
      <div className={styles.user}>
        <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "用户分析" }]} />
        <QuotaBox
          cardTitle="昨日核心指标"
          content={[
            {
              title: "新注册用户",
              value: 100
            },
            {
              title: "昨日访问",
              value: 1000
            },
            {
              title: "累计注册",
              value: 1000000
            },
          ]}
        />
      </div>
    );
  }
}

export default View;
