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
import PropTypes from "prop-types";

class View extends Component {
  static propTypes = {
    /**
     * 图表id
     */
    id: PropTypes.string,
    /**
     * 图表类型
     */
    type: PropTypes.string,
    /**
     * 图表配色
     */
    colors: PropTypes.array,
    /**
     * X轴数据
     */
    xAxisCategories: PropTypes.array,
    /**
     * Y轴名称
     */
    yAxisTitle: PropTypes.string,
    /**
     * 数据
     */
    series: PropTypes.array,
    /**
     * 工具
     */
    tooltip: PropTypes.object,
  };
  static defaultProps = {
    yAxisTitle: "",
    colors: [
      "#1DB3A1",
      "#EE713B"
    ]
  };
  componentDidUpdate () {
    this.renderClearingChart();
  }

  renderClearingChart = () => {
    const {
      id,
      type,
      colors,
      xAxisCategories,
      yAxisTitle,
      series,
      tooltip = {},
    } = this.props;
    window.Highcharts.chart(id, {
      chart: {
        type: type
      },
      colors,
      credits: {
        enabled: false // 不显示LOGO
      },
      title: {
        text: ""
      },
      subtitle: {
        text: ""
      },
      xAxis: {
        categories: xAxisCategories
      },
      yAxis: {
        title: {
          text: yAxisTitle
        }
      },
      plotOptions: {

        areaspline: {
          fillOpacity: 0.2
        }
      },
      series,
      tooltip,
    });
  };

  render () {
    const {
      id,
      style
    } = this.props;
    return (
      <div
        id={id}
        style={style}
      />
    );
  }
}

export default View;
