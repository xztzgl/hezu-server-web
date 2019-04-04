/**
 * File: /Users/fengchengpu/Project/WFace/wface-ui/src/pages/richEditorDemo/sourceModal/index.js
 * Project: /Users/fengchengpu/Project/WFace/wface-ui
 * Created Date: Wednesday February 7th 2018 3:47:33 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday February 27th 2018 4:11:12 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
import { Button, Modal, Form, Input, TreeSelect,
  message, Row, Col, Radio, InputNumber } from "antd";
import { Storage, Request } from "carrot";
import ModalHeader from "../../../component/modalHeader";

const loginHost = Storage.get("LoginHost"); // 访问地址

const FormItem = Form.Item;

const changeData = (arr) => {
  const treeArr = arr.map((x) => {
    const level = {};
    level.key = x.id + "";
    level.value = x.id + "";
    level.label = x.title;
    if (x.children && x.children.length > 0) {
      level.children = changeData(x.children);
    }
    return level;
  });
  return treeArr;
};
class ModalContent extends Component {
  static defaultProps = {
    operation: {},
    type: "normal",
    style: {},
  };
  constructor (props) {
    super(props);
    this.state = {
      treeData: changeData(props.jurs)
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const { dataSource } = this.props;
        this.setState({
          saving: true
        });
        if (+fields.pid === 0) {
          fields.name = "level-1";
        }
        if (dataSource._type === "edit") {
          fields.id = dataSource.id;
          Request.PUT(`${loginHost}/order-manage/update`, { body: fields }).then((response) => {
            this.setState({
              saving: false
            });
            if (response.status) {
              response.json().then(res => {
                message.error(res.msg);
              });
              return;
            }

            message.success("保存成功");
            this.props.hideModal();
            this.props.refresh();
          });
        } else {
          Request.POST(`${loginHost}/order-manage/add`, { body: fields }).then((response) => {
            this.setState({
              saving: false
            });
            if (response.status) {
              response.json().then(res => {
                message.error(res.msg);
              });
              return;
            }
            message.success("保存成功");
            this.props.hideModal();
            this.props.refresh();
          });
        }
      }
    });
  }
  render () {
    const { style, hideModal, dataSource } = this.props;
    const { saving } = this.state;
    const type = dataSource._type;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const isShowMoreFilds = (+dataSource.id !== 0 && +dataSource.pid !== 0) || (+dataSource.pid === 0 && type === "add");

    return (
      <div style={style}>
        <ModalHeader title={type !== "add" ? "编辑资源" : "新增资源"} />
        <div style={{ marginTop: 40 }}>
          <Form
            onSubmit={this.handleSubmit}
          >
            <Row>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="上级目录"
                >
                  {getFieldDecorator("pid", {
                    initialValue: type === "add" ? dataSource.id + "" : dataSource.pid + ""
                  })(
                    <TreeSelect
                      disabled
                      treeData={this.state.treeData}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="菜单名称"
                >
                  {getFieldDecorator("title", {
                    rules: [{
                      required: true, message: "请填写资源名称!",
                    }],
                    initialValue: type !== "add" ? dataSource.title : null
                  })(<Input disabled={type === "detail"} />)}
                </FormItem>
              </Col>
              {isShowMoreFilds &&
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="访问路径"
                >
                  {getFieldDecorator("name", {
                    rules: [{
                      required: true, message: "请填写访问路径!",
                    }],
                    initialValue: type !== "add" ? dataSource.name : null
                  })(<Input disabled={type === "detail"} />)}
                </FormItem>
              </Col>}
              {isShowMoreFilds &&
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="资源路径"
                >
                  {getFieldDecorator("icon", {
                    rules: [{
                      required: true, type: "string", message: "请填写资源路径!",
                    }],
                    initialValue: type !== "add" ? dataSource.icon : null
                  })(<Input disabled={type === "detail"} />)}
                </FormItem>
              </Col>}
            </Row>
            <Row>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="状态"
                >
                  {getFieldDecorator("status", {
                    initialValue: type !== "add" ? dataSource.status : 1
                  })(
                    <Radio.Group disabled={type === "detail"} name="radiogroup">
                      <Radio value={1}>显示</Radio>
                      <Radio value={0}>隐藏</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="排序"
                >
                  {getFieldDecorator("sort", {
                    initialValue: type !== "add" ? dataSource.sort : 1
                  })(
                    <InputNumber disabled={type === "detail"} min={0} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <div style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "center"
            }}
            >
              <Button
                type="primary"
                style={{ marginLeft: 25 }}
                htmlType="submit"
                loading={saving}
                disabled={type === "detail"}
              >保存
              </Button>
              <Button className="operation-button" style={{ marginLeft: 25 }} onClick={hideModal}>关闭</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
const Content = Form.create()(ModalContent);

const SourceModal = (props) => {
  const {
    visible, hideModal, refresh, dataSource, jurs
  } = props;

  return (
    <div>
      <Modal
        visible={visible}
        footer={null}
        closable={false}
        style={{
          borderRadius: "5px",
          overflow: "hidden"
        }}
        width="700px"
      >
        {
          visible &&
          <Content
            jurs={jurs}
            key="inv-type-modal"
            hideModal={hideModal}
            dataSource={dataSource}
            refresh={refresh}
          />
        }
      </Modal>
    </div>
  );
};
export { SourceModal as default };
