/*
 * Created by Saul at 2018/06/11
 *
 * 订单模块的结算屏幕
 *
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import R from 'ramda'
import { Color, Layout, Font } from '../../../../constants'
import OrderAddress from '../OrderAddress'
import OrderList from '../OrderList'
import OrderSubmit from '../OrderSubmit'
import ChoosePayType from '../ChoosePayType'
import Toast from '../../../common/toast'
import api from '../../../../utils/api'
import Alipay from '@0x5e/react-native-alipay';

class CheckoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '确认订单',
      headerLeft: (
        <TouchableOpacity
          style={{ paddingLeft: 20 }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text style={{ color: Color.white }}>
            返回
          </Text>
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        color: Color.white,
      },
      headerStyle: {
        backgroundColor: Color.primary
      }
    }
  }

  state = {
    // 默认用支付宝方式付款
    payType: 'alipay',
    orders: [],
    // 以订单价格列表的数据形式更容易计算总和
    priceList: [],
    payResultFromPlatForm: {},

    // 从后端整理后的优惠券数据
    coupons: [],

    // 用户持续选择优惠券和输入积分，会造成订单总价格持续递减，所以需要每次计算时，加回上次的变动值
    lastReduceOfPoint: 0,
    lastReduceOfCoupon: 0,

  }

  componentDidMount = () => {
    this.setOrderInfoFromCart()
    this.fetchCouponUnused()
  }

  // 从购物车页面取出订单数据
  setOrderInfoFromCart = () => {
    const { navigation } = this.props
    const checkOutInfo  = navigation.state.params || []
    const { orders } = checkOutInfo


    // 给 orders 附加上初始的空的打折信息对象，以便更新，并最终提交给后端
    const discount = { coupon: '', point: '' }
    const ordersWithDiscount = orders.map(order => ({ ...order, discount }))
    console.log('=====>>>>>从购物车传来的订单数据', ordersWithDiscount);

    // 储存好从原始的订单和价格数据，接着需要分批次地计算最终的价格
    this.setState({
      orders: ordersWithDiscount,
    },
      () => {
        // 计算价格列表
        this.initTotalPrice()
        // 初始化订单用使用优惠券和积分所可能产生的消息
        this.initMessageOfOrders()
      }
    )
  }

  // 初始化消息
  initMessageOfOrders = () => {
    const { orders } = this.state
    const initMessage = {
      fromPoint: '',
      fromCoupon: '',
    }
    const ordersWithMessage = orders.map(order => ({ ...order, messages: initMessage }))
    this.setState({
      orders: ordersWithMessage,
    })

  }

  // 获取用户未使用的优惠券，以便确认订单中使用
  fetchCouponUnused = async () => {
    try {
      const response = await api.get(`/user/coupon/list/use`)
      const couponData = response.data.data
      this.filterCouponData(couponData)

    } catch(error) {
      if(error.data) {
        const data = error.data.data;
        const message = data.message
        Toast.show(message, Toast.LONG)
        return
      }
      return Alert.alert('网络错误')
    }
  }

  // 过滤后端返回的 "可用" 的 优惠券数据，如果优惠券过期时间小于当前时间，明显是过期的 ———— 筛选掉
  filterCouponData = (couponData) => {
      const couponsRaw = R.map(R.prop('usercoupon'))(couponData)
      const nowDateTime = new Date().getTime()

      const getExpirationTime = object => Date.parse(R.prop('end_time')(object))  // 获取并转化过期时间
      const isExpired = object => getExpirationTime(object) > nowDateTime

      const coupons = R.filter(isExpired)(couponsRaw)
      this.setState({
        coupons
      })
  }

  // 计算初始总价格
  initTotalPrice = () => {
    const { orders } = this.state

    const { VIPdiscountRate } = this.props
    // 得到初始价格之后接着记入运费。运费再回调中计算，由子组件调用
    const toFloat = str => parseFloat(str, 10)
    const getSumOfList = R.reduce((a, b) => a + b, 0)
    const getOrderPriceList = R.map(item => item['amount'] * toFloat(item['price']))
    const getItemsInOder = R.prop('itemList')
    const getVIPdiscountIncluded = R.map(price => price * VIPdiscountRate / 10)  // 记入会员折扣

    const getTotalPriceList = R.map(R.compose(
                getSumOfList,
                getVIPdiscountIncluded,
                getOrderPriceList,
                getItemsInOder
    ))

    const totalPriceList = getTotalPriceList(orders)
    this.setState({
      priceList: totalPriceList,
    })
  }

  // 记入运费
  checkoutFreight = (index, freightAmount) => {
    // 记入运费只需要更新价格列表就能同步总体价格
    const { priceList } = this.state

    const priceWithFreightAmount = priceList[index] + freightAmount
    const lensOfPrice = R.lensPath(['priceList', index])
    const stateSetWithPrice = R.set(lensOfPrice, priceWithFreightAmount, this.state)

    this.setState((prevState) => {
      return {
        ...prevState,
        ...stateSetWithPrice,
      }
    })
  }


  // 记入优惠券
  handleCouponSelect = ({ isChecked, couponId, orderIndex, reduceByCoupon }) => {
    const lensOfCoupon = R.lensPath(['orders', orderIndex, 'discount', 'coupon'])

    let stateSetWithCoupon;
    if(!isChecked) {
      // 未选中则设定为空
      stateSetWithCoupon = R.set(lensOfCoupon, '', this.state)
    } else {
      stateSetWithCoupon = R.set(lensOfCoupon, couponId, this.state)
    }

    // 优惠券统计消息
    const message =  `使用了优惠券，减免${reduceByCoupon}￥`

    const lensOfMessage = R.lensPath(['orders', orderIndex, 'messages', 'fromCoupon'])
    const stateSetWithMessages = R.set(lensOfMessage, message, stateSetWithCoupon)

    this.setState({
      ...stateSetWithMessages,
      lastReduceOfCoupon: reduceByCoupon,
    })

    const { priceList } = this.state
    priceList[orderIndex] = priceList[orderIndex] - reduceByCoupon + this.state.lastReduceOfCoupon

    this.setState({
      priceList
    })


  }

  // 记入积分兑换
  handlePointExchange = ({ orderIndex, pointInput, reduceByPoint }) => {

    const lensOfPoint = R.lensPath(['orders', orderIndex, 'discount', 'point'])
    const stateSetWithPoint = R.set(lensOfPoint, pointInput, this.state)

    // 积分统计消息
    const message =  `使用${pointInput}个积分，减免${reduceByPoint}￥`

    const lensOfMessage = R.lensPath(['orders', orderIndex, 'messages', 'fromPoint'])
    const stateSetWithMessages = R.set(lensOfMessage, message, stateSetWithPoint)

    this.setState({
      ...stateSetWithMessages,
      lastReduceOfPoint: reduceByPoint,
    })

    // 这里代码重复了，后期可以合并优化
    const { priceList } = this.state
    priceList[orderIndex] = priceList[orderIndex] - reduceByPoint + this.state.lastReduceOfPoint

    this.setState({
      priceList
    })
  }


  handleOnChangePayType = (payType) => {
    this.setState({ payType })
    console.log('=====>>>>>修改支付方式', );

  }

  // 一个供应商对应一个订单，一个订单可以有多个商品
  handleOnOrderSubmit = async () => {
    const { orders } = this.state

    // 取出订单提交需要的数据
    const orderListToSubmit = R.map(
      order => {
        const itemList = order.itemList.map(item => ({
          // item_id: item.itemPrimaryId.toString(),
          // 提交订单时用的不是 主键
          item_id: item.itemId,
          sku_id: item.skuId,
          amount: item.amount.toString(),
        }))

        return {
          supplier_name: order.supplier,
          // discount: order.discount,
          discount: {
            // 后端要求的优惠券 键 为 coupon_id
            coupon_id: order.discount.coupon.toString(),
            point: order.discount.point,
          },
          // 供应商的 id 从当前商品列表中首项去取逻辑上是没问题的，
          // 因为每个订单的生成，必含至少一个商品数据。而商品数据中供应商 id 是在添加购物车时附带进去的
          supplier_id: order.itemList[0].supplierId.toString(),
          item_array: itemList,
        }
      }
    )(orders)


    // 组装订单信息（包含多个订单在一起）
    let orderInfo = {}
    orderInfo['pay_type'] = this.state.payType
    orderInfo['shipping_address_id'] = this.props.shipingAddressId.toString()
    orderInfo['supplierItems'] = orderListToSubmit
    console.log('=====>>>>>提交给后端的订单数据', JSON.stringify(orderInfo));

    try {
      const response = await api.post('/item/order', { orderInfo })

      const payData  = response.data.data
      console.log('=====>>>>>支付的payData', payData);
      // 提交得到后台返回数据之后，发起支付动作
      this.launchPayAction(payData)

    }catch(error) {
     return  console.log('订单提交错误', JSON.parse(error))
    }
  }

  // 发起支付动作
  launchPayAction = (payData) => {
    const payType = payData['pay_type']
    const orderStr = payData['pay_params']
    const payId = payData['pay_id']

    switch(payType) {
      case 'alipay':
        this.payWithAlipay(orderStr, payId)
        break
      case 'wechat':
        this.payWithWetChatPay()
        break
      case 'balance':
        this.payWithBalance()
        break
    }

  }

  // 支付宝支付
  payWithAlipay = async (orderStr, payId) => {
    try {
      let response = await Alipay.pay(orderStr)
      // 截取支付宝返回的信息。错误结果采取本地解决，不通知给服务器
      // 只把成功的结果通知给服务器
      const { memo, resultStatus, result: resultStr } = response
      // if(resultStatus === '9000') {
      if(true) {
        // 虽然支付宝能返回支付状态结果，
        // 但是要求 最终的 订单状态还是以通知过后台服务器并以后台的返回结果为准
        this.setState({ payResultFromPlatForm: JSON.parse(resultStr) },
          () => {
            console.log('=====>>>>>支付成功数据', this.state.payResultFromPlatForm);
            this.notifyToServer(response)
          }
        )
      } else {
        // 暂时不考虑支付结果未知，如 status = 8000 的状态
        Toast.show(memo, Toast.LONG)
        Alert.alert('支付结果未知')
      }
    } catch (error) {
      // 支付失败直接也直接跳入订单详情页面

      const { navigation } = this.props
      navigation.navigate('OrderDetail', { payId })
      // Alert.alert('支付失败 ',)
    }
  }

  // 微信支付
  payWithWetChatPay = () => {
  }

  // 余额支付
  payWithBalance = () => {
    // 暂时未知需求
    Alert.alert('余额不足')
  }

  // 回传支付结果通知给后台
  notifyToServer = async (data) => {
    try {
      const response = await api.post('/payreturn', { ...data })
      const payResultFromServer = response.data.data

      // 预期 payResultFromServer = { pay_status : "success/failure", pay_id: '1234' }
      console.log('=====>>>>>从后端传回的支付结果', payResultFromServer);

      // 解析最终结果，反馈给用户
      // 无论支付成功失败与否都将重定向到订单详情页
      // 需要 传递 pay_id 作为请求依据
      const { navigation } = this.props
      navigation.navigate('OrderDetail', { payId: payResultFromServer['pay_id'] })
    } catch(error) {
      console.log('=====>>>>>发送支付结果给服务器错误', JSON.stringify(error));
      if(error.data) {
        const data = error.data
        const message = data.message
        return Alert.alert(message)
      }
      return Alert.alert('网络错误')
    }

  }


  render() {
    const { orders } = this.state
    return(
      <View style={ styles.container } >
        <ScrollView>
          {/* 订单地址
              */}
          <OrderAddress
            navigation={ this.props.navigation }
          />
          {/* 订单列表 */}
          <OrderList
            priceList={this.state.priceList}
            orders={orders}
            coupons={ this.state.coupons }
            checkoutFreight={this.checkoutFreight}
            checkoutCoupon={this.handleCouponSelect}
            onPointExchange={this.handlePointExchange}
            navigation={ this.props.navigation }
          />
        </ScrollView>
        {/* 选择付款方式
            */}
        <ChoosePayType
          payType={this.state.payType}
          onChangePayType={this.handleOnChangePayType}
        />
        {/* 订单提交
            */}
        <OrderSubmit
          priceList={ this.state.priceList }
          onOrderSubmit={this.handleOnOrderSubmit}
          navigation={ this.props.navigation }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: Platform.OS === 'ios' ? (Layout.window.height - 60) : (Layout.window.height - 80),
  }
})

const mapStateToProps = state => {
  const { globalState } = state
  const { shipingAddress = {} } = globalState
  const { userInfo } = globalState
  const { userLevel = {} } = userInfo
  return {
    shipingAddressId : shipingAddress.id,
    // VIPdiscountRate : userLevel['discount'] || "10"
    VIPdiscountRate : "9",
  }
}

export default connect(mapStateToProps)(CheckoutScreen)
