import React from "react";
import { TableCRUD } from "carrot";
import { Breadcrumb } from "srcDir/component";
import { getCodeMap, translate } from "srcDir/util/codeMap";
import { getDistrict } from "srcDir/util/district";

import styles from "./style.module.scss";

const gender = getCodeMap(10001);
const vocation = getCodeMap(10002);

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
    render: (text) => {
      return translate(gender, text);
    }
  }, {
    title: "手机号",
    key: "username",
  }, {
    title: "出生年份",
    key: "birth_year",
  }, {
    title: "职业",
    key: "vocation",
    render: (text) => {
      return translate(vocation, text);
    }
  }, {
    title: "所在区域",
    key: "district",
    render: (text) => {
      return getDistrict(text);
    }
  }, {
    title: "注册时间",
    key: "create_time",
  }, {
    title: "操作",
    render: (text, record) => (
      <div>
        <span
          className={`${styles.clickable} ${styles.action}`}
          roles="button"
          data-val="出库"
          onClick={() => {
            console.log(record);
            // _this.props.history.push("/internal/inOutDetail/out", {
            //   type: "out",
            //   taskCode: record.taskCode,
            //   has: "out"
            // });
          }}
        >
        发信息
        </span>
      </div>
    )
  },
];

const View = () => (
  <div className={styles.user}>
    <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "用户信息管理" }]} />
    <TableCRUD
      type="normal"
      title={() => "用户列表"}
      dataSourceKey="content"
      // actionGroup={actionGroup}
      // pagination={!1}
      columns={columns}
      // filterGroup={!1}
      // advancedSearchGroup={advancedSearchGroup}
      hasOperation={!1}
      hasAdd={!1}
      // hasView={!1}
      // hasUpdate={!1}
      hasDelete={!1}
      // hasExport={!!1}
      // hasPrint={!!1}
      restURL="server-web-management/user"
      // customURL={customURL}
      // detailForm={detailForm}
    />
  </div>
);


export default View;
