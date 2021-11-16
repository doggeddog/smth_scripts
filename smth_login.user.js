// ==UserScript==
// @name         水木自动登录
// @namespace    https://github.com/doggeddog
// @homepage     https://github.com/doggeddog/smth_scripts
// @version      0.6.2
// @description  水木社区不能保存登录状态, 这个脚本可以用来自动登录.
// @author       doggeddog
// @match        *://*.newsmth.net/*
// @match        *://*.mysmth.net/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

function encrypt(input){
    return btoa(input).replace(/=/g,'').split('').reverse().join('');
}

function decrypt(input){
    return atob(input.split('').reverse().join(''));
}

(function (send) {
    GM_deleteValue('passwd');
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
            if(params.get("id") && params.get("passwd")) {
                GM_setValue('id', params.get("id"));
                GM_setValue('pass', encrypt(params.get("passwd")));
            }
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
        var idSave = GM_getValue('id');
        var passSave = GM_getValue('pass');

        if (idSave && passSave) {
            id.value = idSave;
            passwd.value = decrypt(passSave);
            loginButton.click();
        }
    }
}

window.addEventListener("load", doLogin, false);
window.addEventListener("hashchange", doLogin, false);