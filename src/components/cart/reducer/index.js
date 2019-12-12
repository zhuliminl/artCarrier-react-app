/*
 * Created by Saul at 2018/06/04
 *
 * 购物车状态的规约函数
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
} from './actionType'
import data from '../__test__'

const initState = {
  isCheckedInAll: false,
  itemAmount: 0,
  totalPrice: 0,
  // cart: []
  cart: data
}


export default (state = initState, action) => {
  // 必须是深克隆
  let newState = JSON.parse(JSON.stringify(state))

  let { cart, isCheckedInAll } = newState
  let { supplier, item, value } = action

  switch(action.type) {
    case ADD_TO_CART:
      // 在当前购物车的列表中找出是否已经有该供应商，如果有，则添加到该供应商的商品列表下
      // 如果没有，则根据自己的供应商名字追加到购物车底部
      let isAlreadyInCartSections = false
      isAlreadyInCartSections = cart.some(cartSection => cartSection.supplier === item.supplier)
      if(isAlreadyInCartSections) {
        cart.forEach((cartSection, i) => {
          // 每次新添加到购物车，必须取消供应商的全选状态
          cartSection.isChecked = false

          if(cartSection.supplier === item.supplier) {
            cartSection.data.push(item)
          }
        })
      } else {
        cart.push({
          supplier: item.supplier,
          data: [item]
        })
      }
      // 每次新添加购物车，必须取消最顶级的全选状态
      newState.isCheckedInAll = false

      return {
        ...newState,
      }
    case DELETE_FROM_CART:

      if(isCheckedInAll) {
        // 清空购物车
        return {
          isCheckedInAll: false,
          itemAmount: 0,
          totalPrice: 0,
          cart: []
        }
      }
      // 找到所有 checked 的商品项目，并删除
      cart.forEach((cartSection, i) => {
        // 如果供应商被全选，则一并删除供应商
        if(cartSection.isChecked) {
          cart.splice(i, 1)
        }
        if(cartSection.length !== 0) {
          cartSection.data.forEach((goodItem, j) => {
            if(goodItem.isChecked) {
              cartSection.data.splice(j, 1)
            }
          })
        }
      })
      return {
        ...newState,
      }
    case UPDATE_ITEM_AMOUNT:
      // 找到需要被更新的商品，然后更新它的数量
      cart.forEach(cartSection => {
        if(cartSection.supplier === item.supplier) {
          cartSection.data.forEach(goodItem => {
            if(goodItem.itemId === item.itemId && goodItem.skuId === item.skuId) {
              goodItem.amount += value
              // 如果商品数量被修改到 0，则恢复默认值
              if(goodItem.amount === 0) {
                goodItem.amount = 1
              }
            }
          })
        }
      })
      return {
        ...newState,
      }
    case TOGGLE_ALL_CHECKED_IN_TOTAL:
      newState.isCheckedInAll = !isCheckedInAll
      cart.forEach((cartSection, i) => {
        cartSection.isChecked = !isCheckedInAll
        cartSection.data.forEach((goodItem, j) => {
          goodItem.isChecked = !isCheckedInAll
        })
      })

      // 取消全选时，重设商品总数
      if(newState.isCheckedInAll === false) {
        newState.itemAmount = 0
      }

      return {
        ...newState,
      }
    case TOGGLE_ALL_CHECKED_IN_SHOP:
      // 反转该供应商所有的选中状态
      cart.forEach((cartSection, i) => {
        if(cartSection.supplier === supplier) {

          let isChecked = cartSection.isChecked
          cartSection.isChecked = !isChecked
          // 任意 Section 取消全选，则顶级全选状态也随之取消
          if(!cartSection.isChecked) {
            newState.isCheckedInAll = false
          }

          cartSection.data.forEach((goodItem, j) => {
            goodItem.isChecked = !isChecked
          })

        }
      })

      // 如果所有 Sections 都全选，则顶级全选状态自动被选中
      newState.isCheckedInAll = cart.every(cartSection => cartSection.isChecked === true)
      return {
        ...newState,
      }
    case TOGGLE_CHECKED_IN_ITEM:
      cart.forEach((cartSection, i) => {
        if(cartSection.supplier === item.supplier) {
          cartSection.data.forEach((goodItem, j) => {
            // 找出被点击的单元，并反转单选框的状态
            if(goodItem['itemId'] === item['itemId'] && goodItem['skuId'] === item['skuId']) {
              goodItem.isChecked = !goodItem.isChecked
              if(goodItem.isChecked === false) {
                // 当前 Section 下任意一个单元被取消选中，都会取消 所有 上级开关的全选状态
                cartSection.isChecked = false
                newState.isCheckedInAll = false
              }

              // 当前 Section 中如果每一项都被选中，则自动将上级开关设为全选
              cartSection.isChecked = cartSection.data.every(goodItem => goodItem.isChecked === true)
            }
          })

          // 如果 Sections 都被全选中，则自动设顶级开关为全选
          newState.isCheckedInAll = cart.every(cartSection => cartSection.isChecked === true)
        }
      })
      return {
        ...newState,
      }
    case CALC_TOTAL_PRICE:
      // 计算总价格的同时，也更新下商品个数
      let itemAmount = 0

      let totalPriceInShops = []
      // 先计算每个供应商的总价
      cart.forEach((cartSection, i) => {
        // 计算出单项商品的价格和，即单价乘以数量
        let totalPriceInItems = []
        cartSection.data.forEach((goodItem, j) => {
          if(goodItem.isChecked) {
            totalPriceInItems.push(goodItem.price * goodItem.amount)
            // 更新商品个数
            ++itemAmount
            newState.itemAmount = itemAmount
            // console.log('结算商品的数量', itemAmount)
          }
        })
        // 计算当前供应商购物列表的总价
        let totalPriceInShop = 0
        if(totalPriceInItems.length !== 0) {
          totalPriceInShop = totalPriceInItems.reduce((pre, cur) => pre + cur)
        }

        totalPriceInShops.push(totalPriceInShop)
      })

      // 最后计算总价格
      if(totalPriceInShops.length !== 0) {
        newState.totalPrice = totalPriceInShops.reduce((pre, cur) => pre + cur)
      }
      return {
        ...newState,
      }
    default:
      return newState;
  }
}
