/**
 * File: /Users/fengchengpu/Project/WFace/wface-ui/src/util/tool.js
 * Project: /Users/fengchengpu/Project/WFace/wface-ui
 * Created Date: Monday January 22nd 2018 10:59:39 am
 * Author: chengpu
 * -----
 * Last Modified:Tuesday February 27th 2018 4:11:12 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */

/**
 * URL拼接字符串
 *
 * @param {any} url
 * @param {any} param
 * @returns {String} url
 */
export function urlAppendQuery (url, param) {
  if (!param) {
    return url;
  }
  let queryString = "";
  for (const key in param) {
    if ({}.hasOwnProperty.call(param, key)) {
      if (param[key] === false || param[key] === 0 || param[key]) {
        queryString += `&${key}=${param[key]}`;
      }
    }
  }
  if (queryString) {
    return `${url}?${queryString.substring(1)}`;
  }
  return url;
}
/**
 * 保留多位小数（非负，默认两位小数）
 * @param {*object} obj
 */
export function limitSomeDecimals (value, precision = 2) {
  if (value) {
    precision = Number.isNaN(+precision) ? 2 : +precision;
    value = value.toString();
    value = value.replace(/[^\d.]/g, ""); // 清除"数字"和"."以外的字符
    value = value.replace(/^\./g, ""); // 验证第一个字符是数字
    value = value.replace(/\.{2,}/g, "."); // 只保留第一个, 清除多余的
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    const reg = new RegExp(`^()*(\\d+)\\.(\\d{${precision}}).*$`);
    value = value.replace(reg, "$1$2.$3"); // 只能输入两个小数
    if (precision === 0) {
      value.replace(/\.+$/, "");
    }
  }
  return value;
}
/**
 * 高性能去重
 *
 * @param {any} array
 * @param {any} key
 * @returns
 */
export function removeDuplicate (array, key) {
  if (key) {
    for (let i = 0; i < array.length; i += 1) {
      const pattern = array[i][key];
      for (let j = i + 1; j < array.length; j += 1) {
        const element = array[j];
        if (pattern === element[key]) {
          array.splice(j -= 1, 1);
        }
      }
    }
  } else {
    for (let i = 0; i < array.length; i += 1) {
      const pattern = array[i];
      for (let j = i + 1; j < array.length; j += 1) {
        const element = array[j];
        if (pattern === element) {
          array.splice(j -= 1, 1);
        }
      }
    }
  }
  return array;
}
/**
 * 深度遍历定位元素
 *
 * @param {{Array<String>}} array
 * @param {String} key
 * @param {Stirng} b
 * @param {Function} func
 * @returns {any}
 */
export function findPath (array, key, b, func, path = []) {
  for (let i = 0; i < array.length; i += 1) {
    const element = array[i];
    if (element.children && element.children.length) {
      path.push(element);
      if (element[key].toString() === b.toString()) {
        return func(path.concat());
      }
      findPath(element.children, key, b, func, path);
    } else if (element[key].toString() === b.toString()) {
      path.push(element);
      return func(path.concat());
    }
    if (i === array.length - 1) {
      path.pop();
    }
  }
}

export const isString = obj => Object.prototype.toString.call(obj) === "[object String]";
export const isFunction = obj => Object.prototype.toString.call(obj) === "[object Function]";

export function getMapValueByKeyString (obj, key) {
  const keys = key.split(".");
  if (keys.length < 2) {
    return obj[key];
  }
  return keys.reduce((a, b, i) => {
    if (i === 1) {
      const s = obj[a];
      if (s) {
        return s[b];
      }
    }
    if (a) {
      return a[b];
    }
    return a;
  });
}
export function isEmpty (obj) {
  if (obj === null) return true;
  if (typeof obj === "undefined") {
    return true;
  }
  if (typeof obj === "string") {
    if (obj === "") {
      return true;
    }
    const reg = new RegExp("^([ ]+)|([　]+)$");
    return reg.test(obj);
  }
  return false;
}
export function isDuplicate (arr, vl) {
  for (let i = 0; i < arr.length; i += 1) {
    const element = arr[i];
    if (element === vl) return true;
  }
  return false;
}

export function trim (str) {
  return str.replace(/\s+/g, "");
}
// 文件大小转换
export function bytesToSize (bytes) {
  if (bytes === 0) return "0 B";

  const k = 1024;

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / (k ** i)).toPrecision(4) + " " + sizes[i];
  // toPrecision(3) 后面保留一位小数，如1.0GB
  // return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/**
 * 包含小数的两个数运算 精确计算
 *
 * @param {any} f1
 * @param {any} f2
 * @returns
 */
export function fxf (f1, f2, type) {
  f1 += "";
  f2 += "";
  const f1Len = f1.split(".")[1] ? f1.split(".")[1].length : 0;
  const f2Len = f2.split(".")[1] ? f2.split(".")[1].length : 0;
  if (f1Len) {
    f1 = f1.replace(".", "");
  }
  if (f2Len) {
    f2 = f2.replace(".", "");
  }
  let ret;
  switch (type) {
  case "*": ret = (f1 * f2) / (10 ** (f1Len + f2Len));
    break;
  case "-": ret = (f1 - f2) / (10 ** (f1Len + f2Len));
    break;
  case "+": ret = (f1 + f2) / (10 ** (f1Len + f2Len));
    break;
  default: ret = null;
    break;
  }
  return ret;
}
