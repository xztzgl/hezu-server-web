import React from "react";
import { TableCRUD, History } from "carrot";
import { Breadcrumb } from "srcDir/component";
import { getCodeMap, translate } from "srcDir/util/codeMap";


import styles from "./style.module.scss";

const publishStatus = getCodeMap(10011);

/**
 * 表头信息格式
 */
const columns = [
  {
    title: "编号",
    key: "id",
  }, {
    title: "描述",
    key: "description",
  }, {
    title: "状态",
    key: "status_id",
    render: (text) => {
      return translate(publishStatus, text);
    }
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
            History.push("/management/notice/add", {
              customerId: record.creator_id,
              customerUsername: record.username,
              productType: "2",
              productId: record.id,
              productTitle: record.description
            });
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
    <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "找人信息管理" }]} />
    <TableCRUD
      type="normal"
      title={() => "找人信息列表"}
      filterGroup={!1}
      dataSourceKey="content"
      columns={columns}
      hasOperation={!1}
      hasAdd={!1}
      hasDelete={!1}
      restURL="server-web-management/partner"
    />
  </div>
);


export default View;
