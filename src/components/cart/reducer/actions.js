/*
 * Created by Saul at 2018/06/04
 *
 * 改变购物车状态的动作
 *
 */

import {
  ADD_TO_CART,
  DELETE_FROM_CART,

  UPDATE_ITEM_AMOUNT,

  TOGGLE_ALL_CHECKED_IN_TOTAL,
  TOGGLE_ALL_CHECKED_IN_SHOP,
  TOGGLE_CHECKED_IN_ITEM,

  CALC_TOTAL_PRICE,
} from './actionType';

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    item
  }
}

// 每次删除商品后，也要重新结算总价
export const deleteFromCart = () => {
  return dispatch => {
    dispatch({
      type: DELETE_FROM_CART,
    })
    dispatch({
      type: CALC_TOTAL_PRICE,
    })
  }
}

// 无论是更新商品数量还是更新商品选中状态，无一例外地也要更新商品总价格
export const updateItemAmount = (value, item) => {
  return dispatch => {
    dispatch({
      type: UPDATE_ITEM_AMOUNT,
      value,
      item
    })
    dispatch(calcTotalPrice())
  }
}


export const toggleAllCheckedInTotal = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_ALL_CHECKED_IN_TOTAL,
    })
    dispatch(calcTotalPrice())
  }
}

export const toggleAllCheckedInShop = (supplier) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_ALL_CHECKED_IN_SHOP,
      supplier
    })
    dispatch(calcTotalPrice())
  }
}

export const toggleCheckInItem = (item) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_CHECKED_IN_ITEM,
      item
    })
    dispatch(calcTotalPrice())
  }
}


export const calcTotalPrice = () => {
  return {
    type: CALC_TOTAL_PRICE,
  }
}
