/*
 * File: /Users/fengchengpu/Project/TangQuan/BlockChainBrowser-TangQuan/src/pages/home/index.js
 * Project: /Users/fengchengpu/Project/TangQuan/BlockChainBrowser-TangQuan
 * Created Date: Sunday April 8th 2018 3:40:29 pm
 * Author: gumingxing
 * -----
 * Last Modified:Monday April 16th 2018 3:52:25 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
// import { Icon } from "antd";
import { Storage, Notification, Request } from "carrot";
import { money } from "srcDir/component/conversionClass/index.js";
import OutBound from "../../component/outboundStatus/index.js";
import InformationDisplay from "../../component/informationDisplay/index.js";
import "./style.scss";


const host = Storage.get("host");
// const bankInfoLocal = Storage.get("bankInfoLocal");

class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: {
        inBankStatistics: {},
        outBankStatistics: {}
      }
    };
  }

  componentDidMount () {
    Request.GET(`${host}/overview`, {
      params: {
        // bank: bankInfoLocal.bankCode
      }
    }).then((res) => {
      console.log(res);
      if (res.status && res.status !== 200) {
        Notification.error({
          message: "数据接口请求失败"
        });
      } else {
        this.setState({
          data: res
        });
      }
    });
  }
  render () {
    const {
      data
    } = this.state;
    return (
      <div className="body">
        <OutBound
          title="今日跨行调入" // 标题
          version="V 5.0.0" // 版本信息 没有传空值
          notReleased={data.inBankStatistics.readyCount} // 未出库
          onTheWay={data.inBankStatistics.workingCount}// 在途
          completed={data.inBankStatistics.finishCount}// 已完成
          url="/taskOverview" // 详情跳转
        />
        <OutBound
          title="今日跨行调出" // 标题
          version="" // 版本信息 没有传空值
          notReleased={data.outBankStatistics.readyCount} // 未出库
          onTheWay={data.outBankStatistics.workingCount}// 在途
          completed={data.outBankStatistics.finishCount}// 已完成
          url="/taskOverview" // 详情跳转
        />
        <InformationDisplay
          title="库存打包" // 标题
          url="/inventory"
          data={[
            {
              keyName: "总计打包",
              newAdd: "",
              bagOrbundle: <span>今日新增{data.packsCountToday}包 </span>,
              total: money(data.packAmountsSum),
              type: `${data.packsTotal}包`
            }
          ]}
        />
        <InformationDisplay
          title="今日清分" // 标题
          url="/clearing"
          data={[
            {
              keyName: "总计",
              newAdd: "",
              bagOrbundle: data.cleanCountToday,
              total: money(data.cleanAmountToday),
              type: "捆"
            },
            {
              keyName: "已关联",
              newAdd: "",
              bagOrbundle: data.relationCountToday,
              total: money(data.relationAmountToday),
              type: "捆"
            },
            {
              keyName: "未打包",
              newAdd: "",
              bagOrbundle: data.bundlesTotalToday,
              total: money(data.bundlesAmountTotalToday),
              type: "捆"
            }
          ]}
        />
        <InformationDisplay
          title="历史清分" // 标题
          url={
            data.requireUploadTotal === 0 && "/clearing"
          } // 空为没有详情跳转
          tips={data.requireUploadTotal}
          data={[
            {
              keyName: "累计清分",
              newAdd: "",
              bagOrbundle: data.cleanCount,
              total: money(data.cleanAmount),
              type: "捆",
              // open: true, // （true）清分提示 (false) 详情
            }
          ]}
        />
      </div>
    );
  }
}

export default View;
