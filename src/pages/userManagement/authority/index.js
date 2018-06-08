/*
 * Created Date: Thursday April 26th 2018 11:02:34 am
 * Author: gumingxing
 * -----
 * Last Modified:Thursday April 26th 2018 11:02:34 am
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
import { Table, Storage, Request } from "carrot";
import { Tabs, Card, Button, Modal, Tree, notification } from "antd";
import Form from "./form.js";


import "./style.scss";

const statusName = {
  0: "禁用",
  1: "启用"
};
const LoginHost = Storage.get("LoginHost");
const authorizedButton = (_this, id) => {
  const rules = _this.state.rules.join(",");
  Request.PUT(`${LoginHost}/auth-group/accredit`,
    {
      body: {
        id,
        rules
      }
    }).then(() => {
    _this.loadData();
    _this.showList();
  });
};
const authorized = async (_this, data) => {
  const checkedKeys = data.rules ? data.rules.split(",") : [];
  await _this.setState({
    authorizedState: true,
    eidtState: false,
    defaultKey: "4",
    id: data.id
  });
  Request.GET(`${LoginHost}/auth-group/access-auth-group/${data.id}`).then((res) => {
    _this.setState({
      checkedKeys: checkedKeys,
      tree: res,
    });
  });
};
const edit = async (_this, data) => {
  await _this.setState({
    eidtState: true,
    defaultKey: "3",
    editData: data,
    eidtStatus: data.status
  });
};
const del = (_this, data) => {
  Modal.confirm({
    title: "信息",
    content: (
      <div>
        <p>确定要删除{data.title}?</p>
      </div>
    ),
    onOk () {
      Request.DELETE(`${LoginHost}/auth-group/del/${data.id}`).then(() => {
        _this.loadData();
      });
    },
    onCancel () { },
  });
};
const columns = _this => [{
  title: "ID",
  dataIndex: "id",
}, {
  title: "名称",
  dataIndex: "title",
}, {
  title: "状态",
  dataIndex: "status",
  render: (text) => <span>{statusName[text * 1]}</span>
}, {
  title: "操作",
  dataIndex: "groupType",
  render: (text, record) => (
    <div>
      {(() => {
        switch (text) {
        case 1:
          return true;
        case 2:
          return (
            <div className="operating-button">
              <Button size="small" onClick={() => authorized(_this, record)}>授权</Button>
              <Button size="small" onClick={() => edit(_this, record)}>编辑</Button>
              <Button size="small" onClick={() => del(_this, record)}>删除</Button>
            </div>);
        default:
          return (
            <div className="operating-button">
              <Button size="small" onClick={() => authorized(_this, record)}>授权</Button>
              <Button size="small" onClick={() => edit(_this, record)}>编辑</Button>
              <Button size="small" onClick={() => del(_this, record)}>删除</Button>
            </div>);
        }
      })()}
    </div>
  )
}
];
class View extends Component {
  constructor (props) {
    super(props);
    this.input = React.createRef();
    this.editNameInput = React.createRef();
    this.state = {
      defaultKey: "1",
      eidtState: false,
      authorizedState: false,
      editData: {},
      tree: [],
      expandedKeys: ["90"],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      rules: [],
      id: ""
    };
  }
  componentDidMount () {
    this.loadData();
  }
  onTabs= (e) => {
    this.setState({
      defaultKey: e,
      eidtState: false,
      authorizedState: false,
    });
  };
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys, rules: checkedKeys });
  };
  loadData = () => {
    Request.GET(`${LoginHost}/auth-group/find-all`).then((res) => {
      this.setState({
        dataSource: res
      });
    });
  };
  callback = (e, trueOrfalse) => {
    const _this = this;
    e.props.form.validateFields((err, values) => {
      if (!err) {
        if (trueOrfalse) {
          Request.PUT(`${LoginHost}/auth-group/update`,
            {
              body: values
            }).then((res) => {
            if (res.status) {
              notification.warning({
                message: "编辑失败",
              });
            } else {
              notification.success({
                message: "编辑成功",
              });
              this.loadData();
              _this.showList();
            }
          });
        } else {
          Request.POST(`${LoginHost}/auth-group/add`,
            {
              body: values,
            }).then((res) => {
            if (res.status) {
              notification.warning({
                message: "添加失败",
              });
            } else {
              notification.success({
                message: "添加成功",
              });
              e.props.form.resetFields();
              _this.loadData();
              _this.showList();
            }
          });
        }
      }
    });
  };
  showList = () => {
    this.setState({
      defaultKey: "1",
      authorizedState: false,
      eidtState: false,
    });
  };
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.title} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.title} key={item.id} />;
    });
  };
  render () {
    const {
      dataSource,
      editData,
      rules
    } = this.state;
    const emptyObject = Object.keys(editData).length > 0;
    return (
      <div className="body">
        <Tabs defaultActiveKey="1" onChange={(e) => this.onTabs(e)} activeKey={this.state.defaultKey} >
          <Tabs.TabPane tab="权限组" key="1">
            <Table
              dataSource={dataSource && dataSource}
              columns={columns(this)}
              rowSelection={null}
              rowKey="id"
              pagination={!1}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="添加权限组" key="2">
            <Card>
              <Form callback={this.callback} isTrue={false} />
            </Card>
          </Tabs.TabPane>
          {
            this.state.eidtState &&
            <Tabs.TabPane tab="编辑权限组" key="3">
              <Card>
                {emptyObject && <Form callback={this.callback} data={editData} isTrue={!false} />}
              </Card>
            </Tabs.TabPane>
          }
          {
            this.state.authorizedState &&
            <Tabs.TabPane tab="授权" key="4">
              <Tree
                rules={rules}
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                selectedKeys={this.state.selectedKeys}
              >
                {this.renderTreeNodes(this.state.tree)}
              </Tree>
              <div className="authorized">
                <Button onClick={() => authorizedButton(this, this.state.id)}>授权</Button>
              </div>
            </Tabs.TabPane>
          }
        </Tabs>
      </div>
    );
  }
}

export default View;
