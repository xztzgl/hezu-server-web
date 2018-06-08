import React from "react";
import ReactDOM from "react-dom";
import { Storage, Notification, Request } from "carrot";
import { Modal } from "antd";
import config from "projectRoot/config.json";
import LoginPage from "projectRoot/src/component/loginPage";
import "moment/locale/zh-cn";
import moment from "moment";
import registerServiceWorker from "./registerServiceWorker";

moment.locale("zh-cn");
Object.keys(config).forEach((item) => {
  Storage.set(item, (window.envConfig && window.envConfig[item]) || config[item]);
});

if (window.envConfig) {
  Object.keys(window.envConfig).forEach((item) => {
    Storage.set(item, window.envConfig[item]);
  });
}

const host = Storage.get("host");

const Authorization = Storage.get("Authorization");

if (Authorization && Authorization !== "") {
  import("./App")
    .then((App) => {
      const { bankId } = Storage.get("loginRes");
      Request.POST(`${host}/bank-infos/sync`);
      Request.POST(`${host}/branch-banks/sync`);
      Request.POST(`${host}/valuta-infos/sync`);

      const getInfo = Request.GET(`${host}/bank-infos/current`);

      const getBankInfos = Request.GET(`${host}/bank-infos`);

      const getValutaInfos = Request.GET(`${host}/valuta-infos`);

      const getCurrentBankBranch = Request.GET(`${host}/branch-banks/current`);

      const getAllBankBranch = (bankCode) => Request.GET(`${host}/branch-banks/all`, {
        params: {
          bankCode,
        }
      });

      const getBranchBanks = (bankCode) => Request.GET(`${host}/branch-banks`, {
        params: {
          bankCode,
        }
      });

      window.Promise.all([
        getBankInfos,
        getValutaInfos,
        getCurrentBankBranch,
        getInfo,
      ]).then((resolved) => {
        const bankInfos = resolved[0];
        const valutaInfos = resolved[1];
        const currentBankBranch = resolved[2];
        const bankInfoLocal = resolved[3];

        Storage.set("bankInfoLocal", bankInfoLocal);
        Storage.set("bankInfos", bankInfos);
        Storage.set("valutaInfos", valutaInfos);
        Storage.set("X-Bank-Code", bankId);
        Storage.set("currentBankBranch", currentBankBranch);

        Storage.set("pKey", bankInfoLocal.pKey);

        Storage.set("app-title", `${currentBankBranch.branchName}`);

        getAllBankBranch(bankId).then((allBankBranch) => {
          Storage.set("allBankBranch", allBankBranch);
          getBranchBanks(bankId).then((branchBanks) => {
            Storage.set("branchBanks", branchBanks);
            ReactDOM.render(<App.default />, document.getElementById("root"));
          });
        });
      }, (rejected) => {
        Notification.error({
          message: "获取数据错误, 请检查服务端接口"
        });
        console.error(rejected);
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
} else {
  ReactDOM.render(<LoginPage />, document.getElementById("root"));
}

window.addEventListener("storage", (e) => {
  if (e.key === "Authorization") {
    window.tokenErrorModal = Modal.warning({
      title: "登录认证已变更，请重新登录",
      content: "",
      destroyOnClose: true,
      okText: "确认",
      onOk () {
        Storage.remove("Authorization");
        window.location.reload();
        window.tokenErrorModal = null;
      },
    });
  }
});

registerServiceWorker();
