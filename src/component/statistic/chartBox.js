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
import { Card, Row, Col } from "antd";
import { RangePicker, Button, Table, Storage, Request } from "carrot";
import moment from "moment";

import Highchart from "srcDir/component/highchart";

import styles from "./style.module.scss";

const host = Storage.get("host");

const statisticType = {
  districtData (res) {
    if (!Array.isArray(res)) {
      return [];
    }
    const obj = {};
    res.forEach((item) => {
      if (item.house_district_id in obj) {
        obj[item.house_district_id].count += 1;
        obj[item.house_district_id].total += item.house_rental;
      } else {
        obj[item.house_district_id] = {};
        obj[item.house_district_id].count = 1;
        obj[item.house_district_id].total = item.house_rental;
      }
    });

    const returnObj = {
      dateList: [],
      countList: [],
      linkList: [],
    };
    Object.keys(obj).forEach((item) => {
      returnObj.dateList.push(item);
      returnObj.countList.push(obj[item].count);
      returnObj.linkList.push(obj[item].total);
    });
    return returnObj;
  },
  // vocationData (res) {

  // },
  // rentalData (res) {

  // },
  // ageData (res) {

  // },

};

class View extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clearingChartShowed: true,
      clearingDataSource: [],
      rangeClearingPickerValue: [moment().subtract(10, "days"), moment()],
      clearingChartData: {}
    };
  }
  componentDidMount () {
    this.loadClearingData();
  }
  componentDidUpdate (props, prevState) {
    const {
      rangeClearingPickerValue,
    } = this.state;
    if (
      JSON.stringify(rangeClearingPickerValue) !== JSON.stringify(prevState.rangeClearingPickerValue)
    ) {
      this.loadClearingData(
        rangeClearingPickerValue[0] || moment().subtract(10, "days"),
        rangeClearingPickerValue[1] || moment()
      );
    }
  }
  columns = () => {
    const {
      columnTitle,
      xAxisCategoriesName
    } = this.props;
    return ([{
      title: columnTitle,
      dataIndex: xAxisCategoriesName,
      render: text => {
        let value = text;
        if (xAxisCategoriesName === "cleanDate") {
          value = moment(text).format("YYYY-MM-DD");
        }
        return value;
      }
    }, {
      title: "清分量（捆）",
      dataIndex: "cleanCount",
    }, {
      title: "关联量（捆）",
      dataIndex: "relationCount",
    },
    ]);
  };
  loadClearingData = (startDate, endDate) => {
    const {
      url,
      type
    } = this.props;
    const {
      rangeClearingPickerValue
    } = this.state;
    if (this.props.data && this.props.data.length > 0) {
      const { data } = this.props;
      this.setState({
        clearingDataSource: data,
        // clearingChartData: this.transform2chartData(data)
      });
    } else {
      Request.POST(`${host}/${url}`, {
        body: {
          startTime: (startDate || rangeClearingPickerValue[0]).format("YYYY-MM-DD HH:mm:ss"),
          endTime: (endDate || rangeClearingPickerValue[1]).format("YYYY-MM-DD HH:mm:ss"),
        }
      }).then((res) => {
        this.setState({
          clearingDataSource: res,
          clearingChartData: statisticType[type](res),
          [type]: statisticType[type](res)
        });
      });
    }
  };

  // transform2chartData = (data) => {
  //   const {
  //     xAxisCategoriesName
  //   } = this.props;
  //   return obj;
  // };

  render () {
    const {
      id,
      chartType,
      rowKey,
      cardTitle
    } = this.props;
    const {
      clearingChartShowed,
      clearingDataSource,
      rangeClearingPickerValue,
      clearingChartData
    } = this.state;
    console.log(this.state);
    return (
      <Card
        className={`${styles.card} ${styles.chart}`}
        title={cardTitle}
      >
        <Row className={styles["chart-mt"]}>
          <Col span={16}>
            <RangePicker
              allowClear={!1}
              value={rangeClearingPickerValue}
              onChange={(value) => {
                // console.log(value);
                this.setState({
                  rangeClearingPickerValue: value
                });
              }}
            />
            <Button
              title="查询"
              onClick={() => {
                this.loadClearingData();
              }}
            />
            <Button
              title="清除"
              onClick={() => {
                const reset = [null, null];
                this.setState({
                  rangeClearingPickerValue: reset
                });
              }}
            />
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Button
              title="报表形式"
              primary={!clearingChartShowed}
              onClick={() => {
                this.setState({
                  clearingChartShowed: false,
                });
              }}
            />
            <Button
              title="图表形式"
              primary={clearingChartShowed}
              onClick={() => {
                this.setState({
                  clearingChartShowed: true,
                });
              }}
            />
          </Col>
        </Row>
        <Row className="mt">
          <Highchart
            style={{
              display: clearingChartShowed ? "block" : "none"
            }}
            id={id}
            type={chartType}
            yAxisTitle="清分量 (捆)"
            xAxisCategories={clearingChartData.dateList}
            series={[{
              name: "数量",
              data: clearingChartData.countList
            }, {
              name: "金额",
              data: clearingChartData.linkList
            }]}
          />
          <Table
            style={{
              display: clearingChartShowed ? "none" : "block"
            }}
            dataSource={clearingDataSource}
            columns={this.columns(this)}
            rowSelection={null}
            rowKey={rowKey || "id"}
            bordered
            pagination={!1}
          />
        </Row>
      </Card>
    );
  }
}

export default View;
