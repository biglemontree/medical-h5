/**
 * Created by aaron on 2017/8/23.
 * 结合项目实际需求，封装了基于axios的请求方法。
 * 1.识别添加token。
 * 2.token失效更新token后重试。
 * 3.自动配置处理后端状态码。
 *
 * 基本用法：
 * 1.初始化：(整个项目只需初始化一次)
 * requestInit({}),需要传入baseURL，tokenKey，alert方式，onLoadStart，onLoadEnd等全局配置。
 *
 * 2.调用
 * request({
 *      //地址
 *      url:'',
 *      //数据,get和post都使用data携带数据。
 *      data:{},
 *      //method类别
 *      method:'get'//post',
 *      //是否需要携带token
 *      token:true,//或者false
 *      //特殊状态码处理，如果你有特殊的状态码需要处理，请传入codes中。当匹配成功时，将调用此handle()。
        exception: {
            codes: [],
            handle: () => {
            },
        },
        //...更多选项请查看:https://github.com/mzabriskie/axios#request-config
 * })
 *
 *
 */
import axios from 'axios';
import store from 'store';
import qs from 'qs';

//是否加载中
let isLoading = false;

/**
 * 初始化request
 * @param opt
 */
export default function requestInit(opt) {

    const defaultRequestConfig = Object.assign({
        //基本url
        baseURL: '',//config.server_url,
        //token键名
        tokenKey: 'tokenKey',//config.access_token_storage_key,
        //token失效的code码
        invalidCodes: ['401', '-1', '-3'],
        //更新token的方法
        updateToken: updateToken,
        //成功状态码
        successCodes: ['200'],
        //加载开始
        onLoadStart: () => {
            console.log('load start');
        },
        //加载结束
        onLoadEnd: () => {
            console.log('load end');
        },
        //会话方式
        onMessage: msg => alert(msg),
    }, opt);


    window.request = (opt) => {

        opt = Object.assign({
            //是否携带需要token
            token: false,
            url: '',
            method:'get',
            data: {},
            params: {},
            baseURL: defaultRequestConfig.baseURL,
            //解析data成formData
            transformRequest: [data => qs.stringify(data)],
            //特殊状态码处理
            exception: {
                codes: [],
                handle: () => {
                },
            },
            //...更多选项请查看:https://github.com/mzabriskie/axios#request-config
        }, opt);

        if (opt.method.toUpperCase() === 'GET') {
            opt.params = Object.assign(opt.params, opt.data);
            opt.data = {};
        }

        if (opt.method.toUpperCase() === 'POST' && opt.body) {
            opt.data = Object.assign(opt.data, opt.body);
            delete opt.body;
        }

        if (!isLoading) defaultRequestConfig.onLoadStart();
        isLoading = true;

        return new Promise(resolve => {
            /**
             * 自动添加token后请求
             * @param token token
             * @param retry 是否需要重试
             */
            function handle(token = '', retry = false) {

                if (opt.token) opt.params[defaultRequestConfig.tokenKey] = token;

                axios(opt).then(res => {
                    if(res.data.rspCode == 'error'||res.data.rspCode == 'erro'){
                        defaultRequestConfig.onMessage(res.data.rspDesc);
                    }
                    if(res.data.flag == 1){
                        resolve(res.data);
                    }else if (res.data.flag == 0) {
                        opt.exception.handle();
                    } else if (res.data.flag == -1) { //token失效
                        console.log('android', window.android )
                        defaultRequestConfig.onMessage(res.data.message);
                        if(window.android)  window.android.tokenError() //关闭 跳至登录
                        return
                    }
                    defaultRequestConfig.onMessage(res.data.message);
                    // if (opt.exception.codes && opt.exception.codes.indexOf(res.data.code) >= 0) {
                    //     //如果匹配到自定义的状态码，将执行自定义的handle。
                    //     opt.exception.handle();
                    // } else if (defaultRequestConfig.successCodes.indexOf(String(res.data.code)) >= 0) {
                    //     resolve(res.data.data);
                    // } else if (opt.token && defaultRequestConfig.invalidCodes.indexOf(String(res.data.code)) >= 0 && retry) {
                    //     //再次获取token
                    //     defaultRequestConfig.updateToken().then(handle);
                    // } else {
                    //     //其他无法处理的状态码
                    //     defaultRequestConfig.onMessage(res.data.msg);
                    // }
                }).catch(error => {
                    defaultRequestConfig.onMessage('网络错误');
                    throw new Error(error);
                }).finally(() => {
                    //结束
                    isLoading = false;
                    setTimeout(() => {
                        if (!isLoading) defaultRequestConfig.onLoadEnd();
                    }, 300)
                })
            }

            handle(store.get(defaultRequestConfig.tokenKey), true);
        })
    }
}

/**
 * 更新token
 * @returns {Promise}
 */
function updateToken() {
    return new Promise(resolve => {
        location.href = 'login.html?' + qs.stringify({src: location.href});
        //or
        //resolve('new token');
    })
}
/**
 * Promise拓展
 * @param callback
 * @returns {Promise.<TResult>}
 */
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    );
};
