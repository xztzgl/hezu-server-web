/*
 * Created Date: Thursday April 26th 2018 9:19:14 pm
 * Author: gumingxing
 * -----
 * Last Modified:Friday April 27th 2018 3:05:54 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import { Form, Radio, Input, Button, Select } from "antd";
// import { margin } from "polished";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// function hasErrors (fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }
const reset = (_this) => {
  _this.props.form.resetFields();
};
class ViewForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }
  componentDidMount () {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
    if (this.props.isTrue) {
      this.setdata();
    }
  }
  setdata = () => {
    this.setState({
      groupId: this.props.data.groupId
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.callback(this, this.props.isTrue);
  };
  handleConfirmBlur = (e) => {
    const values = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!values });
  };
  checkPassword = (rule, value, callback) => {
    const formF = this.props.form;
    // console.log(form);
    if (value && value !== formF.getFieldValue("password")) {
      callback("您输入的两个密码不一致!");
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const formF = this.props.form;
    if (value && this.state.confirmDirty) {
      formF.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    // console.log(this.props.isTrue && this.state.groupId, 1111);
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="登录名"
          // style={{ display: "none" }}
          {...formItemLayout}
        >
          {getFieldDecorator("loginName", {
            initialValue: this.props.isTrue ? this.props.data.loginName : "",
            rules: [{ required: true, message: "请输入登录名！" }],
          })(
            <Input placeholder="请输入登录名" />
          )}
        </FormItem>
        <FormItem
          label="姓名"
          // style={{ display: "none" }}
          {...formItemLayout}
        >
          {getFieldDecorator("username", {
            initialValue: this.props.isTrue ? this.props.data.username : "",
            rules: [{ required: true, message: "请输入姓名名！" }],
          })(
            <Input placeholder="请输入姓名" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        // hasFeedback
        >
          {getFieldDecorator("password", {
            rules: [{
              required: !this.props.isTrue, message: "",
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" placeholder={!this.props.isTrue ? "请输入密码" : "(选填)如果不修改则留空"} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重复密码"
        // hasFeedback
        >
          {getFieldDecorator("confirmPassword", {
            rules: [{
              required: !this.props.isTrue, message: "",
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} placeholder={!this.props.isTrue ? "请输入密码" : "(选填)如果不修改则留空"} />
          )}
        </FormItem>
        <FormItem
          label="状态"
          {...formItemLayout}
        >
          {getFieldDecorator("status", {
            initialValue: this.props.isTrue ? this.props.data.status : 1,
            rules: [{ required: true, message: "" }],
          })(
            <RadioGroup >
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          label="所属权限组"
          {...formItemLayout}
        >
          {getFieldDecorator("groupId", {
            initialValue: this.props.isTrue ? this.state.groupId : "",
            rules: [{ required: true, message: "请选择权限组！" }],
          })(
            <Select placeholder="请选择权限组">
              {/* <Select.Option value="china">China</Select.Option>
              <Select.Option value="use">U.S.A</Select.Option> */}
              {
                this.props.authority.map(v => {
                  let dom;
                  if (v.status === 1) {
                    dom = <Select.Option value={v.id} key={v.id}>{v.title}</Select.Option>;
                  }
                  return dom;
                })
              }
            </Select>
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
          <div style={{ textAlign: "center" }} className="submit-button">
            <Button htmlType="submit" style={{ marginRight: 5 }}>{!this.props.isTrue ? "保存" : "更新"}</Button>
            <Button style={{ marginLeft: 5 }} onClick={() => reset()}>重置</Button>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const View = Form.create()(ViewForm);
export default View;
