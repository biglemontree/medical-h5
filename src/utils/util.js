/**
 * @author Jasmine create on 2017/8/4
 * @file 基本工具类
 */
import axios from 'axios'
export default class Util {
    /**
     * 获取路径参数
     * @param url
     * @returns {{}}
     */
    static getUrlParam(url) {
        if (typeof url === 'undefined') {
            //url = "http://wx.gplqdb.com/old_driver?app_login_uid=10046&app_login_token=%257BC399A6E4-44A6-0932-09BA-D58F4D633B7A%257D";
            url = location.href;
        }
        if (url.indexOf("?") === -1) {
            return {};
        }
        var paraString = url.substring(url.lastIndexOf("?") + 1, url.length).split("&"),
            paraObj = {};
        var i, j;
        for (i = 0; j = paraString[i]; i++) {
            var key = j.substring(0, j.indexOf("=")).toLowerCase();
            var value = j.substring(j.indexOf("=") + 1, j.length);
            value = value ? value.split("#")[0] : "";
            paraObj[key] = decodeURIComponent(value);
        }
        return paraObj;
    }

    /**
     * 格式化时间戳
     * @param time
     * @returns {string}
     */
    static formatDate(time){
        var date = new Date(parseInt(time) * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate():date.getDate()) + ' ';
        var h = (date.getHours()< 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes()< 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    }

    /**
     * 获取请求
     * @param url
     * @returns {string}
     */
    static fetch(opt){
        let newOpt = Object.assign({
            method: 'get',
            url: `${api}/${path}`,
            data: Object.assign({}, opt.data)
        }) 

        return new Promise((resolve, reject) => {
            axios(newOpt).then(res => {
                resolve(res.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}