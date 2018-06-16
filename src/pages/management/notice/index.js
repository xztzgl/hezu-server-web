import React from "react";
import { TableCRUD } from "carrot";
import { Breadcrumb } from "srcDir/component";
import { getCodeMap, translate } from "srcDir/util/codeMap";


import styles from "./style.module.scss";

const sendMethod = getCodeMap(10012);
const sendType = getCodeMap(10013);

/**
 * 表头信息格式
 */
const columns = [
  {
    title: "编号",
    key: "id",
  }, {
    title: "内容",
    key: "text",
  }, {
    title: "联系人",
    key: "username",
  }, {
    title: "发送方式",
    key: "method",
    render: (text) => {
      return translate(sendMethod, text);
    }
  }, {
    title: "发送类别",
    key: "type",
    render: (text) => {
      return translate(sendType, text);
    }
  }, {
    title: "发送时间",
    key: "create_time",
  }
];

const View = () => (
  <div className={styles.user}>
    <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "通知信息管理" }]} />
    <TableCRUD
      type="normal"
      title={() => "通知信息列表"}
      filterGroup={!1}
      dataSourceKey="content"
      columns={columns}
      hasOperation={!1}
      hasAdd={!1}
      hasDelete={!1}
      restURL="server-web-management/notice"
    />
  </div>
);


export default View;
