/*
 * Created by Saul at 2018/05/03
 *
 * http 请求封装
 * 如携带本地 token
 *
 * 如何保持每次请求的 token 都来自于状态树上的实时状态？
 * 通过 redux 的监听机制来绑定即可
 *
 */

import axios from 'axios';
import { store } from '../createStore';        // 将会从 store 中拿取 token
import { GlobalConifg } from '../constants';

// api 配置
const apiConfigOptions = {
  // baseURL: 'http://192.168.31.247:3000/api/',
  baseURL: GlobalConifg.apiBaseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
}

// 监听 token 的实时状态
store.subscribe(listener)

function listener() {
  let token = select(store.getState())
  axios.defaults.headers.common['x-access-token'] = token;
  // console.log('token', token)
}

// 选取状态里的 token
function select(state) {
  let globalState = state.globalState;
  let token = globalState.auth.token;
  return token;
}

const api = axios.create(apiConfigOptions);

// 请求拦截
api.interceptors.request.use(function (config) {
    // console.log('apit config', config)
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 请求结果拦截
api.interceptors.response.use(function (response) {
  if(response && response.data && response.data.result === 'ok') {
    // console.log('response is ok', response)
    return Promise.resolve(response);
  } else if(response && response.data && response.data.result === 'err') {
    // 同样以错误返回
    return Promise.reject(response);
  }
}, function (error) {
  return Promise.reject(error);
});

export default api;
