import React, { Component } from "react";
import { Storage, Request, TableCRUD } from "carrot";
import { Breadcrumb } from "srcDir/component";

// import moment from "moment";

import styles from "./style.module.scss";

const host = Storage.get("host");

/**
 * 表头信息格式
 */
const columns = [
  {
    title: "用户头像",
    key: "avatar",
  }, {
    title: "昵称",
    key: "name",
  }, {
    title: "微信用户名",
    key: "weichat_name",
  }, {
    title: "性别",
    key: "gender",
  }, {
    title: "手机号",
    key: "username",
  }, {
    title: "出生年份",
    key: "birth_year",
  }, {
    title: "职业",
    key: "vocation",
  }, {
    title: "所在区域",
    key: "district",
  }, {
    title: "注册时间",
    key: "create_time",
  },
];

// const advancedSearchGroup = [{
//   title: "角色编码",
//   key: "code",
//   type: "input",
//   placeholder: "请输入姓名"
// }, {
//   title: "角色名称",
//   key: "name",
//   type: "select",
//   placeholder: "请选择性别"
// }, {
//   title: "是否停用",
//   key: "status",
//   type: "time",
//   placeholder: "请选择时间"
// }, {
//   title: "地区",
//   key: "dict",
//   type: "cascader",
//   placeholder: "请选择时间"
// }, {
//   title: "自定义",
//   key: "mendian",
//   type: "custom",
//   placeholder: "请选择门店"
// }];

const customURL = {
  getURL: {
    url: "server-web-management/user",
    method: "GET"
  },
  // getDetailURL: {
  //   url: "role/detail",
  //   //method: "POST"
  // },
  // addURL: {
  //   url: "sys/role/save",
  //   //method: "POST"
  // },
  // updateURL: {
  //   url: "role/update",
  //   method: "POST"
  // },
  // deleteURL: {
  //   url: "role/delete",
  //   method: "get"
  // },
  // exportAllURL: "order/order/bespeak/exportBespeakExcelByCondition",
  // exportPartURL: "order/order/bespeak/exportBespeakExcelByOrderId"
};

// const detailForm = [
//   [
//     {
//       title: "角色编码",
//       key: "code",
//       type: "input",
//       placeholder: "请输入姓名",
//       rules: [{ required: true, message: "角色编码必填!" }],
//     },
//     {
//       title: "角色名称",
//       key: "name",
//       rules: [{ required: true, message: "角色名称必填!" }],
//     },
//     {
//       title: "是否停用",
//       key: "status",
//       rules: [{ required: true, message: "是否停用必填!" }],
//     }
//   ],
//   [
//     {
//       title: "描述",
//       key: "description",
//     },
//     {
//       title: "其他",
//       key: "other",
//     }
//   ],
//   [
//     {
//       title: "描述2",
//       key: "description2",
//     },
//     {
//       title: "其他2",
//       key: "other2",
//     }
//   ],
//   [
//     {
//       title: "描述3",
//       key: "description3",
//     },
//     {
//       title: "其他3",
//       key: "other3",
//     }
//   ],
//   [
//     {
//       title: "描述4",
//       key: "description4",
//     },
//     {
//       title: "其他4",
//       key: "other4",
//     }
//   ],
//   [
//     {
//       title: "描述41",
//       key: "description41",
//     },
//     {
//       title: "其他41",
//       key: "other41",
//     }
//   ],
//   [
//     {
//       title: "描述42",
//       key: "description42",
//     },
//     {
//       title: "其他42",
//       key: "other42",
//     }
//   ],
//   [
//     {
//       title: "描述43",
//       key: "description43",
//     },
//     {
//       title: "其他43",
//       key: "other43",
//     }
//   ],
//   [
//     {
//       title: "描述44",
//       key: "description44",
//     },
//     {
//       title: "其他44",
//       key: "other44",
//     }
//   ],
//   [
//     {
//       title: "描述45",
//       key: "description45",
//     },
//     {
//       title: "其他45",
//       key: "other45",
//     }
//   ],
//   [
//     {
//       title: "描述46",
//       key: "description46",
//     },
//     {
//       title: "其他46",
//       key: "other46",
//     }
//   ]
// ];


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
        <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "用户信息管理" }]} />
        <TableCRUD
          // type="normal"
          title={() => "用户列表"}
          dataSourceKey="content"
          // actionGroup={actionGroup}
          // pagination={!1}
          columns={columns}
          // filterGroup={!1}
          // advancedSearchGroup={advancedSearchGroup}
          // hasOperation={!1}
          hasAdd={!1}
          hasView={!1}
          hasUpdate={!1}
          hasDelete={!1}
          // hasExport={!!1}
          // hasPrint={!!1}
          // restURL="server-web-management/user"
          customURL={customURL}
          // detailForm={detailForm}
        />
      </div>
    );
  }
}

export default View;
