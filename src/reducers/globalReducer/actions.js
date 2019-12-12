/*
 * Created by Saul at 2018/05/18
 *
 * 全局动作
 * eg: app 级别的一系列动作
 *
 */

import {
  SETTOKEN,
  UPDATETOKEN,
  RECORDFIRSTLAUNCH,
  STOREUSERINFO,
  UPDATE_USER_COUPON,
  SET_SHIPPING_ADDRESS
} from './actionType';

export const setToken = (token, expiration) => {
  return {
    type: SETTOKEN,
    token,
    expiration
  }
}

// do nothing
export const getToken = () => {
  return {
    type: GETTOKEN,
  }
}

export const updateToken = (token, expiration) => {
  return {
    type: UPDATETOKEN,
    token,
    expiration
  }
}

// 记录 APP 首次启动
export const recordFirstLaunch = () => {
  return {
    type: RECORDFIRSTLAUNCH
  }
}

// 储存用户信息
export const storeUserInfo = (userInfo) => {
  return {
    type: STOREUSERINFO,
    userInfo
  }
}

export const updateUserCoupon = (status, couponData) => {
  return {
    type: UPDATE_USER_COUPON,
    status,
    couponData
  }
}

export const setShippingAddress = (shipingAddress) => {
  return {
    type: SET_SHIPPING_ADDRESS,
    shipingAddress
  }
}
