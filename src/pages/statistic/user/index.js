import React, { Component } from "react";
import { Storage, Request } from "carrot";
import { Breadcrumb } from "srcDir/component";
import QuotaBox from "srcDir/component/statistic/quotaBox";

// import moment from "moment";

import styles from "./style.module.scss";

const host = Storage.get("host");

class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
      customerCount: {}
    };
  }
  componentDidMount () {
    this.loadData();
  }
  loadData = () => {
    Request.GET(`${host}/server-web-statistic/user`).then((res) => {
      this.setState({
        customerCount: res
      });
    });
  };

  render () {
    const {
      yestodayTotalCustomer,
      totalCustomer,
      newTotalCustomer
    } = this.state.customerCount;
    return (
      <div className={styles.user}>
        <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "用户分析" }]} />
        <QuotaBox
          cardTitle="昨日核心指标"
          content={[
            {
              title: "新注册用户",
              value: newTotalCustomer
            },
            {
              title: "昨日访问",
              value: yestodayTotalCustomer
            },
            {
              title: "累计注册",
              value: totalCustomer
            },
          ]}
        />
      </div>
    );
  }
}

export default View;
