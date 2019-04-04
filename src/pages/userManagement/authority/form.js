/*
 * Created Date: Thursday April 26th 2018 9:19:14 pm
 * Author: gumingxing
 * -----
 * Last Modified:Thursday April 26th 2018 9:19:14 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import { Form, Radio, Input, Button } from "antd";
// import { margin } from "polished";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// function hasErrors (fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class ViewForm extends React.Component {
  componentDidMount () {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.callback(this, this.props.isTrue);
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="名称"
          {...formItemLayout}
        >
          {getFieldDecorator("title", {
            initialValue: this.props.isTrue ? this.props.data.title : "",
            rules: [{ required: true, message: "请输入权限组名称" }],
          })(
            <Input placeholder="请输入权限组名称" />
          )}
        </FormItem>
        <FormItem
          label="状态"
          {...formItemLayout}
        >
          {getFieldDecorator("status", {
            initialValue: this.props.isTrue ? this.props.data.status : 1,
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <RadioGroup >
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {
          this.props.isTrue &&
          <FormItem
            label="状态"
            style={{ display: "none" }}
            {...formItemLayout}
          >
            {getFieldDecorator("id", {
              initialValue: this.props.isTrue ? this.props.data.id : "",
              // rules: [{ required: true, message: "Please input your Password!" }],
            })(
              <Input />
            )}
          </FormItem>
        }
        <FormItem>
          <div style={{ textAlign: "center" }}>
            <Button htmlType="submit" style={{ marginRight: 5 }}>保存</Button>
            <Button onClick={this.handleReset} style={{ marginLeft: 5 }}>重置</Button>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const View = Form.create()(ViewForm);
export default View;
