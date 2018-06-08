/*
 * File: /Users/fengchengpu/Project/TangQuan/BlockChainBrowser-TangQuan/src/pages/home/index.js
 * Project: /Users/fengchengpu/Project/TangQuan/BlockChainBrowser-TangQuan
 * Created Date: Sunday April 8th 2018 3:40:29 pm
 * Author: gumingxing
 * -----
 * Last Modified:Monday April 16th 2018 3:52:25 pm
 * Modified By: Djoz
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
import { Form, Row, Col } from "antd";
import { Button, Input, Storage, Notification, Request } from "carrot";

const LoginHost = Storage.get("LoginHost");


const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


class View extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form,
      type,
      parentThis
    } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        Request.PUT(`${LoginHost}/admin-user/update-password`, {
          body: Object.assign({}, values, {
            uid: Storage.get("loginRes").id
          })
        }).then((res) => {
          if (res.status && res.status !== 200) {
            Notification.error({
              message: "修改失败"
            });
          } else {
            Notification.success({
              message: "修改成功"
            });
            if (type === "update") {
              parentThis.toggleModal();
            } else {
              parentThis.setState({
                activeKey: "1"
              });
            }
            form.resetFields();
          }
        });
      }
    });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("两次密码输入不一致");
    } else {
      callback();
    }
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  render () {
    const { type, form, parentThis, dataSource = {} } = this.props;
    const {
      name = "",
      bundleCount = "",
      columns = "",
    } = dataSource;
    const { getFieldDecorator } = form;
    return (
      <div className="modal-content">
        <Form>
          <FormItem {...formItemLayout} label="原密码">
            {getFieldDecorator("oldPassword", {
              initialValue: name,
              rules: [{
                required: true,
                message: "请输入原密码",
              }],
            })(
              <Input type="password" placeholder="请输入原密码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="新密码">
            {getFieldDecorator("newPassword", {
              initialValue: bundleCount + "",
              rules: [{
                required: true,
                message: "请输入新密码",
              }],
            })(
              <Input type="password" placeholder="请输入新密码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="重复密码">
            {getFieldDecorator("confirmPassword", {
              initialValue: columns + "",
              rules: [{
                required: true,
                message: "请再次输入新密码",
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" placeholder="请再次输入新密码" />
            )}
          </FormItem>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button
                title="确定"
                onClick={(e) => {
                  this.handleSubmit(e);
                }}
              />
              <Button
                title={type === "update" ? "取消" : "重置"}
                primary={!1}
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  if (type === "update") {
                    parentThis.toggleModal();
                  } else {
                    this.handleReset();
                  }
                }}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const Detail = Form.create()(View);

export default Detail;
