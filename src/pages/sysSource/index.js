/**
 * File: /Users/fengchengpu/Project/WFace/wface-ui/src/pages/authority/sysSource/index.js
 * Project: /Users/fengchengpu/Project/WFace/wface-ui
 * Created Date: Wednesday February 7th 2018 5:27:27 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday February 27th 2018 4:11:12 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
import { Table, Divider, Tooltip, Icon, message, Popconfirm, Button } from "antd";
import { Storage, Request } from "carrot";

import SourceModal from "./sourceModal";

const loginHost = Storage.get("LoginHost"); // 访问地址
const loginRes = Storage.get("loginRes");

/**
 * 行操作
 */
const options = {
  add (record, target) {
    target.setState({
      visible: true,
      currentRecord: {
        _type: "add",
        ...record
      }
    });
  },
  del (record, target) {
    Request.DELETE(`${loginHost}/order-manage/del/${record.id}`).then((response) => {
      if (response.status) {
        response.json().then(res => {
          message.error(res.msg);
        });
        return;
      }
      message.success("操作成功");
      target.loadData();
    });
  },
  edit (record, target) {
    target.setState({
      visible: true,
      currentRecord: {
        _type: "edit",
        ...record
      }
    });
  },
  detail (record, target) {
    target.setState({
      visible: true,
      currentRecord: {
        _type: "detail",
        ...record
      }
    });
  },
};

const removeSpaceArr = arr => {
  return arr.map(el => {
    if (el.children) {
      if (el.children.length) {
        removeSpaceArr(el.children);
      } else {
        delete el.children;
      }
    }
    return el;
  });
};

const columns = target => [{
  title: "ID",
  dataIndex: "id",
  key: "id",
}, {
  title: "排序",
  dataIndex: "sort",
  key: "sort",
}, {
  title: "菜单名称",
  dataIndex: "title",
  key: "title",
}, {
  title: "访问路径",
  dataIndex: "name",
  key: "name",
  render (text) {
    return (
      <div>
        {text !== "level-1" ? text : "--"}
      </div>
    );
  }
}, {
  title: "状态",
  dataIndex: "status",
  key: "status",
  render (text) {
    return (
      <div>
        {text === 0 ? "关闭" : "开启"}
      </div>
    );
  }
}, {
  title: "操作",
  dataIndex: "id",
  key: "operation",
  render (text, record) {
    return (
      <span>
        <Tooltip placement="top" title="新增子菜单">
          <span>
            <Icon className="cursor" type="plus" onClick={() => options.add(record, target)} />
          </span>
        </Tooltip>
        <Divider type="vertical" />
        <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={() => options.del(record, target)}>
          <Tooltip placement="top" title="删除">
            <span>
              <Icon className="cursor" type="delete" />
            </span>
          </Tooltip>
        </Popconfirm>
        <Divider type="vertical" />
        <Tooltip placement="top" title="编辑">
          <span>
            <Icon className="cursor" type="edit" onClick={() => options.edit(record, target)} />
          </span>
        </Tooltip><Divider type="vertical" />
        <Tooltip placement="top" title="查看">
          <span>
            <Icon className="cursor" type="profile" onClick={() => options.detail(record, target)} />
          </span>
        </Tooltip>
      </span>
    );
  }
}];
class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
      columns: columns(this),
      dataSource: [],
      visible: false
    };
  }

  componentDidMount () {
    this.loadData();
  }

   loadData = () => {
     this.setState({
       loading: true
     });
     Request.GET(`${loginHost}/order-manage/get-all-orders/${loginRes.groupId}`, {}).then((res) => {
       if (Array.isArray(res)) {
         const rt = removeSpaceArr(res);
         this.setState({
           dataSource: rt,
           jur: [{
             id: "0",
             title: "一级菜单",
             children: rt
           }]
         });
       }
       this.setState({
         loading: false
       });
     });
   };

   render () {
     const { visible, currentRecord, dataSource, jur } = this.state;
     return (
       <div className="common-page">
         <Button
           type="primary"
           style={{ marginBottom: 20 }}
           onClick={() => {
             this.setState({ visible: true, currentRecord: { id: "0", _type: "add" } });
           }}
         >添加一级菜单
         </Button>
         <Table
           rowKey="id"
           dataSource={dataSource}
           columns={this.state.columns}
           loading={this.state.loading}
           pagination={false}
         />
         {
           visible && <SourceModal
             jurs={jur}
             visible={visible}
             refresh={this.loadData}
             loading={false}
             dataSource={currentRecord}
             hideModal={() => {
               this.setState({
                 visible: false
               });
             }}
           />
         }
       </div>
     );
   }
}

export default View;
