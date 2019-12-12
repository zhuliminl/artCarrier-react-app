/*
 * Created by Saul at 2018/05/23
 *
 * App 级别的全局配置数据
 *
 */

export default {
  // API 基础路由
  // apiBaseURL: 'http://192.168.31.247:3000/api/',
  // apiBaseURL: 'http://192.168.31.10:3000/api/',
  // apiBaseURL: 'http://192.168.31.10:3000/api/',
  apiBaseURL: 'http://139.224.17.189:3000/api/',
  // 字段验证的正则
  phoneNumberREG: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  passwordREG: /^(\w){6,16}$/,

}
