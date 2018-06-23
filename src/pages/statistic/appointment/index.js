import React, { Component } from "react";
import { Storage, Request } from "carrot";
import { Breadcrumb } from "srcDir/component";
import QuotaBox from "srcDir/component/statistic/quotaBox";
// import ChartBox from "srcDir/component/statistic/chartBox";

// import moment from "moment";

import styles from "./style.module.scss";

const host = Storage.get("host");

/* eslint-disable */
// const data = [{"cleanCount":4,"relationAmount":250000,"cleanAmount":250000,"cleanUserName":"admin","relationCount":4},{"cleanUserName":"testbb","relationCount":40,"cleanAmount":3000000,"cleanCount":40,"relationAmount":3000000},{"cleanCount":5,"relationAmount":250000,"cleanUserName":"yangzhou","cleanAmount":250000,"relationCount":5}];
/* eslint-enable */

class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
      orderCount: {}
    };
  }
  componentDidMount () {
    this.loadData();
  }
  loadData = () => {
    Request.GET(`${host}/server-web-statistic/appointment/yesterday`).then((res) => {
      this.setState({
        orderCount: res
      });
    });
  };

  render () {
    const {
      newTotalOrder,
      finishedTotalOrder,
      totalRental
    } = this.state.orderCount;
    return (
      <div className={styles.user}>
        <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "预约分析" }]} />
        <QuotaBox
          cardTitle="昨日核心指标"
          content={[
            {
              title: "新增预约数",
              value: newTotalOrder
            },
            {
              title: "已完成数",
              value: finishedTotalOrder
            },
            {
              title: "累计金额",
              value: totalRental
            },
          ]}
        />
        {
          /*
          <ChartBox
            id="ChartBox-1"
            cardTitle="按区域分析"
            // data={data}
            chartType="column"
            url="server-web-statistic/appointment/statistic"
            columnTitle="清分员"
            xAxisCategoriesName="cleanUserName"
            rowKey="cleanUserName"
            type="districtData"
          />
          <ChartBox
            id="ChartBox-2"
            cardTitle="按职业分析"
            data={data}
            chartType="column"
            url="clean-statistic-user"
            columnTitle="清分员"
            xAxisCategoriesName="cleanUserName"
            rowKey="cleanUserName"
          />
          <ChartBox
            id="ChartBox-3"
            cardTitle="按租金分析"
            data={data}
            chartType="column"
            url="clean-statistic-user"
            columnTitle="清分员"
            xAxisCategoriesName="cleanUserName"
            rowKey="cleanUserName"
          />
          <ChartBox
            id="ChartBox-4"
            cardTitle="按年龄分析"
            data={data}
            chartType="column"
            url="clean-statistic-user"
            columnTitle="清分员"
            xAxisCategoriesName="cleanUserName"
            rowKey="cleanUserName"
          />
          */
        }
      </div>
    );
  }
}

export default View;
