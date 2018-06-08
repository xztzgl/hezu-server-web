import React from "react";
import PropTypes from "prop-types";

import { Avatar, Input, Button, Icon, Checkbox, Storage as store, Notification, Request } from "carrot";

import logoImg from "../../../public/asset/image/login_logo.png";

import "./style.scss";

const iconStyles = {
  color: "rgba(0,0,0,.25)"
};

const contentStyle = {
  maxWidth: "400px",
  margin: "50px auto"
};


/**
 * 登录页面
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class LoginPage extends React.Component {
  static propTypes = {
    /** 标题 */
    title: PropTypes.string,
    /** logo图片src地址或base64，默认为磁云logo */
    logo: PropTypes.string,
    /** 获取验证码vid的接口地址 */
    // codeVidURL: PropTypes.string,
    /** 通过vid获取验证码code的接口地址 */
    // codeURL: PropTypes.string,
    /** 登录接口地址 */
    loginURL: PropTypes.string,
    /** 登录后回调函数 */
    afterLogin: PropTypes.func,
  };
  static defaultProps = {
    // codeVidURL: "vid",
    // codeURL: "vcode",
    loginURL: "admin-user/login",
    afterLogin: () => {}
  };
  constructor (props) {
    super(props);
    this.loginHandle = this.loginHandle.bind(this);
    this.state = {
      headerStyles: {
        display: "flex",
        alignItems: "center",
        marginTop: "-80px",
        justifyContent: "center"
      },
      title: store.get("app-title"),
      logo: store.get("logo"),
      username: store.get("username"),
      remembered: store.get("remembered"),
      // vid: null,
      buttonReady: false,
      password: "",
      // vcode: "",
    };
  }
  componentDidMount () {
    // this.getCode(this);
  }
  componentDidUpdate () {
    this.checkInputValue();
  }
  // async getCode (_this) {
  //   const vid = await Request.GET(`${config.host}/${_this.props.codeVidURL}`);
  //   if (vid.success && vid.data !== "") {
  //     _this.setState({
  //       vid: vid.data,
  //       useCode: true,
  //     });
  //   } else {
  //     _this.setState({
  //       useCode: false,
  //     });
  //   }
  // }
  checkInputValue () {
    const {
      username,
      password,
      buttonReady,
      useCode
    } = this.state;
    let { vcode } = this.state;
    if (!useCode) {
      vcode = "code";
    }
    if (username !== "" && password !== "" && vcode !== "" && buttonReady === false) {
      this.setState({
        buttonReady: true
      });
    } else if ((username === "" || password === "" || vcode === "") && buttonReady === true) {
      this.setState({
        buttonReady: false
      });
    }
  }
  inputChange ({ inputValue, stateName }) {
    const _this = this;
    const changeState = () => {
      _this.setState({
        [stateName]: inputValue
      });
    };
    const handle = {
      username () {
        const remembered = store.get("remembered");
        if (remembered) {
          store.set("username", inputValue);
        }
        changeState();
      },
      password () {
        changeState();
      },
      vcode () {
        changeState();
      }
    };
    handle[stateName]();
  }
  loginHandle () {
    const _this = this;
    const {
      username,
      password,
      // vcode,
      // vid,
    } = this.state;
    const data = {
      loginName: username,
      password,
      scope: "ui",
      grant_type: "password"
      // vcode,
      // vid,
    };
    Request.POST(`${store.get("LoginHost")}/${this.props.loginURL}`, {
      // headers: {
      //   Authorization: "Basic YnJvd3Nlcjo="
      // },
      body: data
    }).then((res) => {
      const token = `Bearer ${res.token}`;
      const callback = _this.props.afterLogin;
      if (res.token && callback && typeof callback === "function") {
        store.set("Authorization", token);
        store.set("loginRes", res);
        callback();
        window.location.reload();
      } else {
        Notification.error({
          message: "用户名或密码不正确"
        });
      }
    });
  }
  render () {
    const _this = this;
    const {
      title,
      logo,
      headerStyles
    } = this.state;
    return (
      <article
        className="login"
      >
        <header style={headerStyles}>
          <Avatar
            style={{
              width: "22px",
              height: "22px",
              background: "transparent",
              borderRadius: "0"
            }}
            shape="square"
            src={logo}
          />
          <h1 style={{
            margin: "0 0 0 10px",
            fontSize: "16px",
            color: "#393939"
          }}
          >
            {title}
          </h1>
        </header>
        <div style={contentStyle}>
          <Input
            key="1"
            defaultValue={this.state.username}
            placeholder="请输入用户名"
            prefix={<Icon type="user" style={iconStyles} />}
            onChange={(e) => {
              this.inputChange({
                inputValue: e.target.value,
                stateName: "username"
              });
            }}
          />
          <Input
            id="pp"
            key="2"
            placeholder="请输入密码"
            prefix={<Icon type="lock" style={iconStyles} />}
            type="password"
            onChange={(e) => {
              this.inputChange({
                inputValue: e.target.value,
                stateName: "password"
              });
            }}
            onPressEnter={(e) => {
              this.inputChange({
                inputValue: e.target.value,
                stateName: "password"
              });
              this.loginHandle();
            }}
          />
          {
            this.state.vid && <Input
              key="3"
              placeholder="输入验证码"
              addonAfter={
                <div
                  style={{ outline: "none", cursor: "pointer" }}
                  onClick={() => this.getCode(this)}
                  onKeyPress={() => this.getCode(this)}
                  role="button"
                  tabIndex="0"
                >
                  <img
                    src={`${store.get("host")}/${this.props.codeURL}/${this.state.vid}`}
                    style={{ height: "22px" }}
                    alt="code"
                  />
                </div>
              }
              onChange={(e) => {
                this.inputChange({
                  inputValue: e.target.value,
                  stateName: "vcode"
                });
              }}
            />
          }
          <Checkbox
            defaultChecked={this.state.remembered}
            onChange={(e) => {
              if (e.target.checked) {
                store.set("username", _this.state.username);
                store.set("remembered", true);
              } else {
                store.remove("username");
                store.set("remembered", false);
              }
            }}
          >
          记住我
          </Checkbox>
          <Button
            disabled={!this.state.buttonReady}
            title="登录"
            onClick={this.loginHandle}
          />
        </div>
        <img
          src={logoImg}
          alt="logo"
        />
      </article>
    );
  }
}
