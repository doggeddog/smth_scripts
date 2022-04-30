// ==UserScript==
// @name         水木保持登录
// @namespace    https://github.com/doggeddog
// @homepage     https://github.com/doggeddog/smth_scripts
// @version      1.0
// @description  水木社区经常掉线, 这个脚本通过自动刷新保持登陆状态.
// @author       doggeddog
// @match        *://www.newsmth.net/*
// @match        *://www.mysmth.net/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

function refresh() {
    var refreshTime = GM_getValue('refreshTime');
    var now = Date.now();
    console.log("refresh", refreshTime, now);
    // 5分钟刷新状态一次
    if(now > refreshTime + 300000){
        SESSION.update(true);
        GM_setValue('refreshTime', now);
        console.log("session updated");
    }
}

GM_setValue('refreshTime', Date.now());
setInterval(refresh, 60000);