/*
 * Created Date: Thursday April 26th 2018 11:02:34 am
 * Author: gumingxing
 * -----
 * Last Modified:Friday April 27th 2018 3:06:01 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
// import { Icon } from "antd";
// import { TableDetail, Request } from "carrot";
import { Table, Storage, Request } from "carrot";
// import config from "projectRoot/config.json";
import { Tabs, Card, Button, Modal, Tree, notification } from "antd";
import Form from "./form.js";


import "./style.scss";

const statusName = {
  0: "禁用",
  1: "启用"
};
const LoginHost = Storage.get("LoginHost");
// const host = Storage.get("host");
// const authorizedButton = (_this, id) => {
//   const rules = _this.state.rules.join(",");
//   Request.PUT(`${LoginHost}/auth-group/accredit`,
//     {
//       body: {
//         id,
//         rules
//       }
//     }).then((res) => {
//     console.log(res);
//     _this.loadData();
//   });
// };
// const editSubmit = (_this, id) => {
//   const nametext = _this.editNameInput.current.input.value;
//   const sta = _this.state.status;
//   Request.PUT(`${LoginHost}/auth-group/update`,
//     {
//       body: {
//         id,
//         title: nametext,
//         status: sta
//       }
//     }).then((res) => {
//     console.log(res);
//     _this.loadData();
//   });
//   // console.log(nametext, sta, 1111);
// };
// const authorized = async (_this, data) => {
//   // console.log(_this, data);
//   const checkedKeys = data.rules ? data.rules.split(",") : [];
//   await _this.setState({
//     authorizedState: true,
//     eidtState: false,
//     defaultKey: "4",
//     id: data.id
//   });
//   Request.GET(`${LoginHost}/auth-group/access-auth-group/${data.id}`).then((res) => {
//     console.log(res);
//     // _this.loadData();
//     _this.setState({
//       checkedKeys: checkedKeys,
//       tree: res,
//     });
//   });
// };
const edit = async (_this, data) => {
  const authorityArry = _this.state.authority.length > 0;
  if (!authorityArry) {
    // await Request.GET(`${host}/branch-banks/get-net-list`).then((res) => {
    //   _this.setState({
    //     getNetList: res,
    //   });
    // });
    await Request.GET(`${LoginHost}/auth-group/find-all`).then((res) => {
      _this.setState({
        authority: res,
        // defaultKey: "3",
        // eidtState: false,
        // eidtState: true,
        // defaultKey: "3",
        // editData: data,
        // eidtStatus: data.status
      });
    });
    await _this.setState({
      eidtState: true,
      defaultKey: "3",
      editData: data,
      eidtStatus: data.status
    });
  } else {
    await _this.setState({
      eidtState: true,
      defaultKey: "3",
      editData: data,
      eidtStatus: data.status
    });
  }
  // await _this.setState({
  //   eidtState: true,
  //   defaultKey: "3",
  //   editData: data,
  //   eidtStatus: data.status
  // });
  // _this.onTabs("3");
  // console.log(_this, data);
};
const del = (_this, data) => {
  // /auth-group/del /
  Modal.confirm({
    title: "信息",
    content: (
      <div>
        <p>确定要删除{data.username}?</p>
      </div>
    ),
    onOk () {
      Request.DELETE(`${LoginHost}/admin-user/del/${data.id}`).then((res) => {
        if (res.status) {
          notification.warning({
            message: "删除失败",
          });
        } else {
          notification.success({
            message: "删除成功",
          });
        }
        _this.loadData();
      });
    },
    onCancel () { },
  });
  // console.log(_this, data);
};
const columns = _this => [{
  title: "ID",
  dataIndex: "id",
  width: 50,
  fixed: "left"
}, {
  title: "登录名",
  dataIndex: "loginName",
  width: 200,
  fixed: "left"
  // render: (text) => <span>{bankName(text, "s")}</span>
}, {
  title: "姓名",
  dataIndex: "username",
  // render: (text) => <span>{bankName(text, "s")}</span>
}, {
  title: "用户组",
  dataIndex: "groupName",
  // render: (text) => <span>{bankName(text, "s")}</span>
}, {
  title: "状态",
  dataIndex: "status",
  render: (text) => <span>{statusName[text * 1]}</span>
}, {
  title: "创建时间",
  dataIndex: "createTime",
  // render: (text) => <span>{bankName(text, "s")}</span>
}, {
  title: "最后登陆时间",
  dataIndex: "lastLoginTime",
  // render: (text) => <span>{bankName(text, "s")}</span>
}, {
  title: "最后登陆IP",
  dataIndex: "lastLoginIP",
  // render: (text) => <span>{bankName(text, "s")}</span>
}, {
  title: "操作",
  width: 150,
  fixed: "right",
  dataIndex: "groupType",
  render: (text, record) => (
    <div>
      {(() => {
        switch (text) {
        case 1:
          return true;
        case 2:
          return (
            <div className="operating-button-administrator">
              <Button size="small" onClick={() => edit(_this, record)}>编辑</Button>
              <Button size="small" onClick={() => del(_this, record)}>删除</Button>
            </div>);
        default:
          return (
            <div className="operating-button-administrator">
              <Button size="small" onClick={() => edit(_this, record)}>编辑</Button>
              <Button size="small" onClick={() => del(_this, record)}>删除</Button>
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
      // status: 0,
      defaultKey: "1",
      eidtState: false,
      // authorizedState: false,
      editData: {},
      authority: [],
      getNetList: [],
      // expandedKeys: ["90"],
      // autoExpandParent: true,
      // checkedKeys: [],
      // selectedKeys: [],
      rules: [],
      // id: ""
    };
  }
  componentDidMount () {
    this.loadData();
  }
  onTabs= async (e) => {
    const authorityArry = this.state.authority.length > 0;
    console.log(e, authorityArry);
    if (!authorityArry) {
      if (e !== 1) {
        // await Request.GET(`${host}/branch-banks/get-net-list`).then((res) => {
        //   this.setState({
        //     getNetList: res,
        //   });
        // });
        Request.GET(`${LoginHost}/auth-group/find-all`).then((res) => {
          this.setState({
            authority: res,
            defaultKey: e,
            eidtState: false,
          });
        });
      }
    } else {
      this.setState({
        defaultKey: e,
        eidtState: false,
        // authorizedState: false,
      });
    }
  };
  loadData = () => {
    Request.GET(`${LoginHost}/admin-user/find-all`).then((res) => {
      this.setState({
        dataSource: res
      });
    });
  };
  callback = (e, trueOrfalse) => {
    // console.log(e, 11111);
    e.props.form.validateFields((err, values) => {
      if (!err) {
        if (trueOrfalse) {
          Request.PUT(`${LoginHost}/admin-user/update`,
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
              // e.props.form.resetFields();
              this.loadData();
            }
          });
        } else {
          Request.POST(`${LoginHost}/admin-user/add`,
            {
              body: values,
            }).then((res) => {
            if (res.status) {
              notification.warning({
                message: "添加失败",
                // description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
              });
            } else {
              notification.success({
                message: "添加成功",
                // description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
              });
              e.props.form.resetFields();
              this.loadData();
            }
          });
        }
      }
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
      editData
    } = this.state;
    const emptyObject = Object.keys(editData).length > 0;
    // console.log(dataSource.statistics);
    console.log(this.state.rules);
    return (
      <div className="body">
        <Tabs defaultActiveKey="1" onChange={(e) => this.onTabs(e)} activeKey={this.state.defaultKey} >
          <Tabs.TabPane tab="管理员" key="1">
            <Table
              dataSource={dataSource && dataSource}
              columns={columns(this)}
              rowSelection={null}
              rowKey="id"
              scroll={{ x: 1600 }}
              pagination={!1}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="添加管理员" key="2">
            <Card>
              {/* <div className="auhority">
                <span>名称</span><Input ref={this.input} />
              </div>
              <div className="auhority">
                <span>状态</span>
                <RadioGroup onChange={this.onChange} value={this.state.status}>
                  <Radio value={0}>禁用</Radio>
                  <Radio value={1}>启用</Radio>
                </RadioGroup>
              </div>
              <div className="button">
                <Button onClick={() => submit(this)}>保存</Button>
                <Button>重置</Button>
              </div> */}
              <Form callback={this.callback} isTrue={false} authority={this.state.authority} getNetList={this.state.getNetList} />
            </Card>
          </Tabs.TabPane>
          {
            this.state.eidtState &&
            <Tabs.TabPane tab="编辑管理员" key="3">
              <Card>
                {/* <div className="auhority">
                  <span>名称</span><Input ref={this.editNameInput} defaultValue={emptyObject ? editData.title : ""} />
                </div>
                <div className="auhority">
                  <span>状态</span>
                  <RadioGroup onChange={this.onEidt} value={this.state.eidtStatus}>
                    <Radio value={0}>禁用</Radio>
                    <Radio value={1}>启用</Radio>
                  </RadioGroup>
                </div>
                <div className="button">
                  <Button onClick={() => editSubmit(this, emptyObject ? editData.id : "")}>保存</Button>
                  <Button>重置</Button>
                </div> */}
                {emptyObject && <Form callback={this.callback} data={editData} authority={this.state.authority} getNetList={this.state.getNetList} isTrue={!false} />}
              </Card>
            </Tabs.TabPane>
          }
        </Tabs>
      </div>
    );
  }
}

export default View;
