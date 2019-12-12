/*
 * Created by Saul at 2018/05/18
 *
 * 全局状态的规约函数
 *
 */

import {
  GETTOKEN,
  SETTOKEN,
  UPDATETOKEN,
  RECORDFIRSTLAUNCH,
  STOREUSERINFO,
  UPDATE_USER_COUPON,
  SET_SHIPPING_ADDRESS
} from './actionType';

const initState = {
  isFirstLaunch: true,
  auth: {
    token: '',
    expiration: ''
  },
  userInfo: {},
  // 用户的其他附加信息：如优惠券和收货地址等。存储与全局，以便其他模块调取
  coupon: {
    use: [],
    used: [],
    overdue: []
  },
  shipingAddress: {}
}

export default (state = initState, action) => {
  switch(action.type) {
    case GETTOKEN:
      return {
        ...state,
      }
    case SETTOKEN:
      return {
        ...state,
        auth: {
          token: action.token,
          expiration: action.expiration
        }
      }
    case UPDATETOKEN:
      return {
        ...state,
        auth: {
          token: action.token,
          expiration: action.expiration
        }
      }
    case RECORDFIRSTLAUNCH:
      return {
        ...state,
        isFirstLaunch: false
      }
    case STOREUSERINFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case UPDATE_USER_COUPON:
      const status = action.status
      const couponData = action.couponData

      // 嵌套展开，从底层开始向上级归并
      const coupon = {
        ...state.coupon,
        [status]: couponData
      }
      return {
        ...state,
        coupon
      }
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shipingAddress: action.shipingAddress
      }
    default:
      return state;
  }
}
