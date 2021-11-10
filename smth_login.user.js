// ==UserScript==
// @name         水木自动登录
// @namespace    https://github.com/doggeddog
// @homepage     https://github.com/doggeddog/smth_scripts
// @version      0.5
// @description  水木社区不能保存登录状态, 这个脚本可以用来自动登录.
// @author       doggeddog
// @match        *.newsmth.net/*
// @match        *.mysmth.net/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function (send) {
    XMLHttpRequest.prototype.send = function () {
        var arg = arguments;
        this.addEventListener("readystatechange", function () {
            if (this.readyState != 4) {
                return
            }
            if (!this.responseURL || !this.responseURL.endsWith("user/ajax_login.json")) {
                return
            }
            let response = JSON.parse(this.response);
            if (response.ajax_msg != "操作成功") {
                return
            }
            let params = new URLSearchParams(arg[0]);
            GM_setValue('id', params.get("id"));
            GM_setValue('passwd', params.get("passwd"));
        }, false);

        send.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.send);

function doLogin() {
    var loginButton, id, passwd;
    if (window.location.pathname == "/") {
        loginButton = document.getElementById("b_login");
        id = document.getElementById("id");
        passwd = document.getElementById("pwd");
    } else {
        loginButton = document.getElementById("u_login_submit");
        id = document.getElementById("u_login_id");
        passwd = document.getElementById("u_login_passwd");
    }

    if (loginButton) {
        id.value = GM_getValue('id');
        passwd.value = GM_getValue('passwd');
        if (id.value && passwd.value) {
            loginButton.click();
        }
    }
}

window.addEventListener("load", doLogin, false);
window.addEventListener("hashchange", doLogin, false);