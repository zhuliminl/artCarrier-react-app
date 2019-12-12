/*
 * Created by Saul at 2018/06/01
 *
 * 购物车结算
 *
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import CheckBox from '../common/checkBox'
import { Color } from '../../constants'
import Toast from '../common/toast'
import {
  addToCart,
  toggleAllCheckedInTotal,
  deleteFromCart
} from './reducer/actions'

class CartCount extends React.Component {
  hanldleToggleAllCheckedInTotal = () => {
    const { dispatch } = this.props
    dispatch(
      toggleAllCheckedInTotal()
    )
  }

  render() {
    const {
      totalPrice,
      itemAmount,
      isCheckedInAll,
    } = this.props
    return(
      <View style={ styles.countContaner }>
        {/* 全选和合计 */}
        <View style={ styles.countLeftContainer }>
          <CheckBox
            isChecked={isCheckedInAll}
            onClick={() => {
              this.hanldleToggleAllCheckedInTotal()
              Toast.show('全选或者取消全选')
            }}
          />
          <View style={ styles.selectAllContainer }>
            <Text
              style={{
                color: Color.white,
              }}
            >
              全选
            </Text>
          </View>
          <View style={ styles.totalContainer }>
            <Text style={ styles.totalLabelText }>
              合计:
            </Text>
            <Text style={ styles.totalPriceText }>
              ￥{totalPrice}
            </Text>
          </View>
        </View>
        {/* 结算 */}
        <TouchableOpacity
          style={ styles.countRightContainer }
          onPress={() => {
            const { navigation, orders, totalPrice, dispatch } = this.props
            const checkOutInfo = {
              orders,
              totalPrice
            }
            // 将被选中的商品数据传送给 确认订单页面
            navigation.navigate('Checkout', checkOutInfo)
            // 结算的同时也从购物车删除相应的商品
            // 开发临时注释
            // dispatch(
              // deleteFromCart()
            // )
          }}
        >
          <Text style={ styles.settleText }>
            结算({ itemAmount })
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  countContaner: {
    flexDirection: 'row',
    height: 50,
    borderTopWidth: 0.5,
    borderColor: Color.homeBgLight,
    // backgroundColor: Color.white
    // Tag: newVersionColor
    backgroundColor: Color.homeBgLight,
  },
  countLeftContainer: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkBoxImage: {
    width: 25,
    height: 25
  },
  selectAllContainer: {
    marginLeft: 5,
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  totalLabelText: {
    marginRight: 10,
    color: Color.white,
  },
  totalPriceText: {
    color: Color.secondary
  },
  countRightContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: Color.secondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settleText: {
    color: Color.white
  },
})

const mapStateToProps = (state) => {
  const { cartState } = state
  const { cart } = cartState

  // 从购物车中提取订单信息（初始数据会提取出空的商品列表，需要再筛选一次）
  let rawOrders = []
  cart.forEach(cartSection => {
    let order = {}
    order.itemList = []
    order.supplier = cartSection.supplier
    cartSection.data.forEach(goodItem => {
      if(goodItem.isChecked) {
        order.itemList.push(goodItem)
      }
    })
    rawOrders.push(order)
  })

  // 清空不含商品的商品订单
  let orders = []
  orders = rawOrders.filter(order => order.itemList.length !== 0)
  // console.log('=====>>>>>orders', orders);
  return {
    orders,
    totalPrice: cartState.totalPrice,
    isCheckedInAll: cartState.isCheckedInAll,
    itemAmount: cartState.itemAmount
  }
}

export default connect(mapStateToProps)(CartCount);
