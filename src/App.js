/**
 * File: /Users/fengchengpu/Project/WFace/wface-ui/src/App.js
 * Project: /Users/fengchengpu/Project/WFace/wface-ui
 * Created Date: Thursday February 1st 2018 2:42:21 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday February 27th 2018 4:11:12 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React, { Component } from "react";

import zhCN from "antd/lib/locale-provider/zh_CN";
import { LocaleProvider, Spin } from "antd";
import { Layout, NotificationCenter, Storage, Request } from "carrot";
import config from "projectRoot/config.json";
import { Header } from "./component";
import styles from "./App.module.scss";

const host = Storage.get("host"); // 访问地址
const loginRes = Storage.get("loginRes");

// 1首页      home
// 202区块详情   block-detail

// const staticMenus = [
//   {
//     id: "1",
//     path: "/",
//     component: "home",
//   }, {
//     id: "20",
//     name: "公告管理",
//     children: [
//       {
//         id: "2001",
//         path: "/notice",
//         name: "公告列表",
//         component: "notice",
//       },
//     ]
//   }, {
//     id: "30",
//     name: "跨行调款",
//     children: [
//       {
//         id: "3001",
//         path: "/transfer",
//         name: "预约交取款",
//         component: "transfer/subscribe",
//       }, {
//         id: "3002",
//         path: "/taskOverview",
//         name: "调拨任务概览",
//         component: "transfer/taskOverview",
//       }, {
//         id: "3003",
//         path: "/taskOverDetail",
//         component: "transfer/taskOverDetail",
//       }, {
//         id: "3004",
//         path: "/taskPackage",
//         component: "transfer/taskPackage",
//       }, {
//         id: "3005",
//         path: "/taskBundles",
//         component: "transfer/taskBundles",
//       }, {
//         id: "3006",
//         path: "/outBound",
//         component: "transfer/outBound",
//       }, {
//         id: "3007",
//         path: "/inBound",
//         component: "transfer/inBound",
//       },
//     ]
//   }, {
//     id: "40",
//     name: "金库管理",
//     children: [
//       {
//         id: "401",
//         path: "/inventory",
//         name: "库存状态",
//         component: "valut/inventory",
//       }, {
//         id: "402",
//         path: "/packages", // 包列表
//         component: "valut/packages",
//       }, {
//         id: "403",
//         path: "/bundles", // 困列表
//         component: "valut/bundles",
//       }, {
//         id: "404",
//         path: "/invDetail", // 库存明细
//         component: "valut/invDetail",
//       }, {
//         id: "405",
//         path: "/pkgDetail", // 包详情
//         name: "查包",
//         component: "valut/pkgDetail",
//       }, {
//         id: "406",
//         path: "/bundleDetail", // 困详情
//         name: "查捆",
//         component: "valut/bundleDetail",
//       }, {
//         id: "407",
//         path: "/clearing",
//         name: "清分状态",
//         component: "clearing",
//       }, {
//         id: "408",
//         path: "/crownNumber",
//         name: "冠字号查询",
//         component: "valut/crownNumber",
//       }, {
//         id: "409",
//         path: "/damagedCurrency",
//         name: "残损币上报",
//         component: "valut/damagedCurrency",
//       }, {
//         id: "410",
//         path: "/pack",
//         component: "valut/pack",
//       }, {
//         id: "411",
//         path: "/uploadFile",
//         name: "手动上传",
//         component: "valut/uploadFile",
//       }, {
//         id: "412",
//         path: "/invReported",
//         name: "库存上报",
//         component: "valut/invReported",
//       }
//     ]
//   }, {
//     id: "500",
//     name: "代理业务",
//     children: [
//       {
//         id: "501",
//         path: "/agency",
//         name: "代理业务",
//         component: "agency",
//       }, {
//         id: "502",
//         path: "/agency/taskDetail",
//         component: "agency/taskDetail",
//       }, {
//         id: "503",
//         path: "/agency/inStorage",
//         component: "agency/inStorage",
//       }, {
//         id: "504",
//         path: "/agency/outStorage",
//         component: "agency/outStorage",
//       },
//     ]
//   }, {
//     id: "600",
//     name: "行内调款",
//     children: [
//       {
//         id: "601",
//         path: "/internal",
//         name: "行内任务",
//         component: "internal/task",
//       },
//       {
//         id: "602",
//         path: "/internal/fastTransfer",
//         // name: "",
//         component: "internal/task/fastTransfer",
//       },
//       {
//         id: "603",
//         path: "/internal/inOutDetail",
//         // name: "",
//         component: "internal/task/inOutDetail",
//       },
//       {
//         id: "604",
//         path: "/internal/inOutDetail/in",
//         // name: "",
//         component: "internal/task/inOutDetail",
//       },
//       {
//         id: "605",
//         path: "/internal/inOutDetail/out",
//         // name: "",
//         component: "internal/task/inOutDetail",
//       }, {
//         id: "606",
//         path: "/internal/cashStatistic",
//         name: "现金出入库统计",
//         component: "internal/cashStatistic",
//       }, {
//         id: "607",
//         path: "/internal/trend",
//         name: "出入库走势分析",
//         component: "internal/trend",
//       },
//       {
//         id: "608",
//         path: "/internal/banksStatistical",
//         name: "网点交取款统计",
//         component: "internal/banksStatistical",
//       },
//     ]
//   }, {
//     id: "700",
//     name: "系统配置",
//     children: [
//       {
//         id: "701",
//         path: "/sysSet/packSet",
//         name: "打包设置",
//         component: "sysSet/packSet",
//       }, {
//         id: "702",
//         path: "/sysSet/tagPrint",
//         name: "标签打印",
//         component: "sysSet/tagPrint",
//       },
//     ]
//   }, {
//     id: "800",
//     name: "用户管理",
//     children: [
//       {
//         id: "801",
//         path: "/userManagement/administrator",
//         name: "管理员",
//         component: "userManagement/administrator",
//       },
//       {
//         id: "802",
//         path: "/userManagement/authority",
//         name: "权限组",
//         component: "userManagement/authority",
//       },
//       {
//         id: "803",
//         path: "/userManagement/clearer",
//         name: "清分员管理",
//         component: "userManagement/clearer",
//       },
//       {
//         id: "804",
//         path: "/userManagement/changePassword",
//         name: "修改密码",
//         component: "userManagement/changePassword",
//       },
//     ]
//   }, {
//     id: "1000",
//     name: "查坐支",
//     children: [
//       {
//         id: "1001",
//         path: "/zuozhi/branchStatistics",
//         name: "网点坐支情况统计",
//         component: "zuozhi/branchStatistics",
//       },
//       {
//         id: "1002",
//         path: "/zuozhi/branchStatistics/detail",
//         component: "zuozhi/branchStatistics/detail",
//       },
//       {
//         id: "1003",
//         path: "/zuozhi/search",
//         name: "坐支查询",
//         component: "zuozhi/search",
//       },
//     ]
//   }, {
//     id: "90",
//     name: "菜单管理",
//     children: [
//       {
//         id: "901",
//         path: "/sysSource",
//         name: "后台菜单",
//         component: "sysSource",
//       },
//     ]
//   },
// ];

const changeData = (arr) => {
  const treeArr = arr.map((x) => {
    const level = {};
    level.id = x.id + "";
    level.component = x.icon;
    if (x.name !== "level-1") {
      level.path = x.name;
    } else {
      level.children = [];
    }
    if (x.status) {
      level.name = x.title;
    }
    if (x.children && x.children.length) {
      if (x.children[0].name === "/") {
        level.path = "/";
        level.name = x.children[0].title;
        level.component = x.children[0].icon;
        delete level.children;
      } else {
        level.children = changeData(x.children);
      }
    }
    return level;
  });
  return treeArr;
};

@NotificationCenter
export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      menus: [],
      spinning: true,
      headerSearchVisiable: true
    };
    const { observer } = this.props.notification;
    observer("CALL_AHOb", msg => {
      this.setState({
        headerSearchVisiable: msg
      });
    });
  }
  componentDidMount () {
    Request.GET(`${host}/order-manage/get-all-orders/${loginRes.groupId}`).then((res) => {
      if (Array.isArray(res)) {
        this.setState({
          menus: changeData(res.filter(x => x.checked)),
        });
      }
    });
  }
  render () {
    const { spinning, headerSearchVisiable, menus } = this.state;
    return (
      <div className={styles.app} style={{ height: "100%" }}>
        <LocaleProvider locale={zhCN}>
          <Spin spinning={!spinning} tip="正在初始化..." >
            <Header searchBar={headerSearchVisiable} title={config["app-title"]} />
            {/* { menu ?
              <Layout menus={menu} portrait={userInfo.picture || "/asset/image/avatar.png"} dropdown={dropdown} /> :
              <img style={{ width: "100%" }} src={spingImg} alt="spingImg" />
            } */}
            {menus.length > 0 && <Layout className={styles.content} menus={menus} />}

            {
              /*
            <Footer title={config["app-copyright"]} />
               */
            }
          </Spin>
        </LocaleProvider>
      </div>
    );
  }
}
