/*
 * Created by Saul at 2018/05/18
 *
 * 全局动作类型
 *
 */

export const SETTOKEN          = 'set_token';
export const GETTOKEN          = 'get_token';
export const UPDATETOKEN       = 'update_token';
// 记录 APP 是不是首次启动
export const RECORDFIRSTLAUNCH = 'record_first_launch';

// 每次登录，或者每次刷新用户中心界面，都重新获取一次用户的信息
export const STOREUSERINFO = 'store_user_info';

// 更新用户的优惠券信息
export const UPDATE_USER_COUPON = 'update_user_coupon'

// 设定收货地址
export const SET_SHIPPING_ADDRESS = 'set_shipping_address'

// 输入积分的时候更新积分 bug。待后期修复
export const UPDATE_POINT = 'update_point'
