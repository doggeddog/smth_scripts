// ==UserScript==
// @name         水木保持登录
// @namespace    https://github.com/doggeddog
// @homepage     https://github.com/doggeddog/smth_scripts
// @version      2.0
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

function left() {
    var x = document.querySelector("#body > div.t-pre > div.page > ul > li:nth-child(2) > ol > li:first-child > a");
    x.click();
}

function right() {
    var x = document.querySelector("#body > div.t-pre > div.page > ul > li:nth-child(2) > ol > li:last-child > a");
    x.click();
}

function keyMapping() {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowLeft":
                left();
                break;
            case "ArrowRight":
                right();
                break;
        }
    });
}

GM_setValue('refreshTime', Date.now());
setInterval(refresh, 30000);
keyMapping();

