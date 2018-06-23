import React from "react";
import { TableDetail, Select, Input, History } from "carrot";
import { message } from "antd";
import { Breadcrumb } from "srcDir/component";
import { getCodeMap } from "srcDir/util/codeMap";

import styles from "./style.module.scss";

const sendMethod = getCodeMap(10012);

if (Array.isArray(sendMethod)) {
  sendMethod.map((item) => {
    item.text = item.value;
    item.value = item.code;
    return item;
  });
}

const View = () => {
  const {
    customerId,
    customerUsername,
    productType,
    productId,
    productTitle
  } = History.location.state;

  const optionsCustomer = [{
    value: customerId,
    text: customerUsername,
  }];

  const optionsProductType = [
    {
      value: 1,
      text: "房屋信息",
    },
    {
      value: 2,
      text: "找人信息",
    }
  ];

  const optionsProductId = productId ? [
    {
      value: productId,
      text: productTitle,
    }
  ] : [];

  const detailForm = [
    [
      {
        title: "联系人",
        key: "customer_id",
        type: "custom",
        placeholder: "请输入联系人",
        initialValue: {
          key: customerId,
          label: customerUsername
        },
        rules: [{ required: true, message: "联系人必填!" }],
        content: (
          <Select
            disabled={!!1}
            labelInValue={!!1}
            options={optionsCustomer}
            onChange={(value) => console.log(value)}
          />
        ),
      },
      {
        title: "发送方式",
        key: "method",
        type: "custom",
        initialValue: {
          key: "21201",
          label: "站内信"
        },
        rules: [{ required: true, message: "请选择发送方式!" }],
        content: (
          <Select
            disabled={!!1}
            labelInValue={!!1}
            options={sendMethod}
            onChange={(value) => console.log(value)}
          />
        ),
      },
      {
        title: "关联类别",
        key: "product_type",
        type: "custom",
        initialValue: {
          key: productType,
          label: optionsProductType.find(v => v.value === productType)
        },
        // rules: [{ required: true, message: "关联类别!" }],
        content: (
          <Select
            disabled={!!1}
            labelInValue={!!1}
            options={optionsProductType}
            onChange={(value) => console.log(value)}
          />
        ),
      },
      {
        title: "关联ID",
        key: "product_id",
        type: "custom",
        initialValue: {
          key: productId,
          label: productTitle && (productTitle.length > 7 ? productTitle.substr(0, 6) + "..." : productTitle),
        },
        // rules: [{ required: true, message: "关联ID!" }],
        content: (
          <Select
            disabled={!!1}
            labelInValue={!!1}
            options={optionsProductId}
            onChange={(value) => console.log(value)}
          />
        ),
      },
      {
        title: "内容",
        key: "text",
        type: "custom",
        rules: [
          { required: true, message: "内容必填!" },
          { max: 50, message: "最多50字!" },
        ],
        content: (
          <Input.TextArea
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        ),
      }
    ],
  ];

  return (
    <div className={styles.user}>
      <Breadcrumb className={styles.breadcrumb} crumb={[{ title: "首页", link: "/" }, { title: "通知信息管理" }]} />
      <TableDetail
        title="发送信息"
        formItemGroup={detailForm}
        readonly={!1}
        beforeSend={(values) => {
          values.customer_id = values.customer_id.key * 1;
          values.product_id = values.product_id.key * 1;
          values.product_type = values.product_type.key * 1;
          values.method = values.method.key * 1;
          // values.method *= 1;
        }}
        afterSend={(res) => {
          if (res.success) {
            message.success("信息已发送");
            setTimeout(() => {
              History.go(-1);
            }, 1000);
          } else {
            message.error(res.msg);
          }
        }}
        addURL={{
          url: "server-web-management/notice/add",
          // method: "POST"
        }}
      />
    </div>
  );
};

export default View;
