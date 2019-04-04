/*
 * Created Date: Saturday April 21st 2018 12:06:01 pm
 * Author: gumingxing
 * -----
 * Last Modified:Tuesday May 1st 2018 11:01:53 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */

import moment from "moment";
import { Storage } from "carrot";
import np from "number-precision";

// const bankInfos = Storage.get("bankInfos"); // 银行数据
// const currentBankBranch = Storage.get("currentBankBranch"); // 当前银行数据
// const valutaInfos = Storage.get("valutaInfos"); // 面值数据
// console.log(bankInfos, "测试", currentBankBranch, valutaInfos);
const storageFun = {
  bankInfos: () => {
    return Storage.get("bankInfos");
  },
  branchBanks: () => {
    return Storage.get("allBankBranch");
  },
  currentBankBranch: () => {
    return Storage.get("currentBankBranch");
  },
  valutaInfos: () => {
    return Storage.get("valutaInfos");
  }

};
// 分行翻译
const bankName = (code, selectCode) => { // a表示全称
  // console.log(storageFun.bankInfos(), 22222);
  const data = storageFun.bankInfos() || [];
  const codeok = data.filter(v => v.bankCode === code);
  let name = code;
  if (codeok.length > 0) {
    const bankname = codeok[0].bankName;
    if (codeok[0].bankCode === storageFun.currentBankBranch().bankCode) {
      name = "本行";
    } else if (selectCode === "a") {
      name = bankname;
    } else if (selectCode === "s") {
      name = codeok[0].bankShortName;
    }
  } else {
    name = code;
  }
  return name;
};

// 网点银行翻译
const branchBankName = (code, displayType) => {
  if (code === storageFun.currentBankBranch().branchCode) {
    return "本行";
  }
  let name = code;
  storageFun.branchBanks().some((brank) => {
    if (brank.branchCode === code) {
      name = brank.branchName;
      if (displayType === "s") {
        name = brank.branchShortName;
      }
      return true;
    }
    return false;
  });
  return name;
};

const bankNameObj = (code) => { // 获取银行对象
  const data = storageFun.bankInfos() || [];
  const codeok = data.filter(v => v.bankCode === code);
  let nameObj;
  if (codeok.length > 0) {
    // const bankname = codeok[0].bankName;
    nameObj = codeok;
  } else {
    nameObj = [];
  }
  return nameObj;
}; // 获取银行名称

export const bussTypes = {
  1: "代理业务调入",
  2: "代理业务调出",
  3: "内部业务调入",
  4: "内部业务调出",
  5: "相互取款调入",
  6: "相互取款调出",
  7: "向人行交款",
  8: "从人行取款",
  9: "手工调整",
  10: "手工调整"
};
export const taskTypes = {
  0: "跨行调款",
  2: "代理任务"
};

const conversion = (timeStr) => {
  const data = timeStr ? moment().millisecond(timeStr).format("YYYY-MM-DD HH:mm:ss") : "--";
  return data;
}; // 时间戳格式化

const money = (n) => {
  let m;
  if ((n / 1 >= 1) && (n / 10000 < 1)) {
    m = np.times(n, 1) + "元";
  } else if (n / 10000 >= 1) {
    m = ((Math.floor(np.divide(n, 10000)) + "万") + ((n % 10000) === 0 ? "" : ((n % 10000) + "元")));
  } else {
    m = "--";
  }
  return m;
}; // 转化成“万”为单位

const faceValue = (code) => {
  const data = storageFun.valutaInfos() || [];
  const codeok = data.filter(v => v.valuta_code === code);
  return codeok.length > 0 ? codeok[0] : false;
};

export default bankName;

export { bankName, conversion, money, faceValue, bankNameObj, branchBankName };
