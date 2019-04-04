import React from "react";
import { TableCRUD, History, Storage, Request } from "carrot";
import { message, Popconfirm } from "antd";
import { Breadcrumb } from "srcDir/component";
import { getCodeMap, translate } from "srcDir/util/codeMap";


import styles from "./style.module.scss";

const host = Storage.get("host");

const publishStatus = getCodeMap(10011);

/**
 * 表头信息格式
 */
const columns = _this => ([
  {
    title: "编号",
    dataIndex: "id",
  }, {
    title: "描述",
    dataIndex: "description",
  }, {
    title: "状态",
    dataIndex: "publish_id",
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
          onClick={() => {
            console.log(record);
            History.push("/management/notice/add", {
              customerId: record.creator_id,
              customerUsername: record.username,
              productType: "2",
              productId: record.id,
              productTitle: record.title
            });
          }}
        >
        发信息
        </span>
        {
          (record.publish_id === 21101 || record.publish_id === 21102 || record.publish_id === 21103) && (
            <span
              className={`${styles.clickable} ${styles.action} ${styles.marginleft}`}
              roles="button"
              onClick={() => {
                console.log(record);
                Request.PUT(`${host}/server-web-management/person/confirm/${record.id}`).then((res) => {
                  console.log(res);
                  if (res.success) {
                    message.success("确认成功");
                    _this.loadData();
                  } else {
                    message.error("确认失败");
                  }
                });
              }}
            >
            确认
            </span>
          )
        }
        {
          (record.publish_id === 21101 || record.publish_id === 21102 || record.publish_id === 21103) && (
            <Popconfirm
              title="确认删除？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                Request.DELETE(`${host}/server-web-management/person/delete/${record.id}`).then((res) => {
                  console.log(res);
                  if (res.success) {
                    message.success("删除成功");
                    _this.loadData();
                  } else {
                    message.error("删除失败");
                  }
                });
              }}
            >
              <span
                className={`${styles.clickable} ${styles.action} ${styles.marginleft}`}
                roles="button"
              >
              删除
              </span>
            </Popconfirm>
          )
        }
      </div>
    )
  },
]);

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
