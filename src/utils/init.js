/**
 * Created by b5156 on 2017/9/19.
 */


// import '../../static/weui/weui.css';
// import '../styles/global.css';
import requestInit from './request';

let loading;
requestInit({
    // baseURL: 'http://222.240.219.229:8889/controller', //测试
    // baseURL: 'http://220.171.11.52:8080/controller', //正式
    baseURL: 'http://202.100.182.221:8080/controller', //正式
    onMessage: msg => {
        weui.toast(msg, {
            duration: 500
        });
    },
    onLoadStart: () => {
        loading = weui.loading('加载中...');
    },
    onLoadEnd: () => {
        loading.hide();
    }
});

