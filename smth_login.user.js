// ==UserScript==
// @name         水木保持登录
// @namespace    https://github.com/doggeddog
// @homepage     https://github.com/doggeddog/smth_scripts
// @version      1.4
// @description  水木社区经常掉线, 这个脚本通过自动刷新保持登陆状态.
// @author       doggeddog
// @match        *://*.newsmth.net/*
// @match        *://*.mysmth.net/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function refresh() {
    var refreshTime = GM_getValue('refreshTime');
    var now = Date.now();
    // 5分钟刷新状态一次
    if (now > refreshTime + 300000) {
        GM_setValue('refreshTime', now);
        GM_xmlhttpRequest({
            method: "GET",
            url: location.href,
            onload: function (r) {
                console.log("refresh");
            }
        });
    }
}
GM_setValue('refreshTime', Date.now());
setInterval(refresh, 30000);