/**
 * Created by b5156 on 2017/9/19.
 */
console.log('init');

import '../../static/weui/weui.css';
// import '../styles/global.css';
import requestInit from './request';

let loading;
requestInit({
    // baseURL: 'http://fixedcode.yewifi.com',
    // baseURL: 'http://222.240.219.229:8889/controller', //测试
    baseURL: 'http://220.171.11.52:8080/controller', //正式
    onMessage: msg => {
        // weui.alert(msg);
    },
    onLoadStart: () => {
        loading = weui.loading('加载中...');
    },
    onLoadEnd: () => {
        loading.hide();
    }
});

