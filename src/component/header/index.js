/*
 * Created Date: Monday April 9th 2018 2:11:00 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday April 9th 2018 2:11:00 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React from "react";
import PropTypes from "prop-types";
import { History, Icon, Avatar, Storage } from "carrot";
// import { SearchInput } from "../index";
import logoImg from "../../../public/asset/image/logo.png";
import styles from "./style.module.scss";

const Comp = () => {
  const logoPNG = Storage.get("logo");
  const appTitle = Storage.get("app-title");
  const loginRes = Storage.get("loginRes");
  const { bankId } = loginRes;

  return (
    <div className={styles["block-browser-header"]} >
      <div className={styles["header-content"]} >
        <div className={styles.logo} onClick={() => { History.push("/"); }} >
          <img className={styles.logoImg} src={logoImg} alt="logo" />
          <Avatar
            style={{
              width: "22px",
              height: "22px",
              background: "transparent",
            }}
            src={logoPNG}
          />
          <span
            style={{
              verticalAlign: "middle",
              marginLeft: "10px"
            }}
          >
            {
              `${appTitle}（${bankId}）`
            }
          </span>
        </div>
        <div>
          <span>
            你好，
            <span
              className={styles.clickable}
              onClick={() => {
                History.push("/userManagement/changePassword");
              }}
            >
              {
                loginRes.username
              }
            </span>
          </span>
          <span
            className={styles.clickable}
            onClick={() => {
              Storage.remove("Authorization");
              window.location.reload();
              // Request.POST(`${host}/logout`, {
              //   body: {
              //     logout: "logout"
              //   }
              // }).then((res) => {
              //   console.log(res);
              // });
            }}
          >
            <Icon type="logout" style={{ margin: "0 5px 0 30px" }} />退出
          </span>
        </div>
      </div>
    </div>
  );
};

Comp.propTypes = {
  title: PropTypes.string.isRequired,
  searchBar: PropTypes.bool
};
Comp.defaultProps = {
  searchBar: true
};


export default Comp;
