/*
 * Created by Saul at 2018/06/11
 *
 * 确认订单的单元项
 *
 */

import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  Platform,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import R from 'ramda'
import { Color, Layout, Font } from '../../../constants'
import CouponModal from './couponModal'
import PointModal from './pointModal'
import LogisticsTypeModal from './logisticsTypeModal'
import Freight from './Freight'
import OrderSummary from './OrderSummary'
import Explain from './Explain'

class OrderItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCouponModalVisible: false,
      isPointModalVisible: false,
      isLogisticsModalVisible: false,

      // 物流信息
      // 总运费
      freightAmount: 0,
      // 是否包邮
      isFullCost: false,
      // 订单小结费用
      orderPrice: '',

      // 优惠券，当前用户所有未使用的优惠券
      coupons: this.props.coupons,
      // 当前订单积分输入限额
      pointLimitInAll: 0,
    }
  }

  // 被动刷新本地优惠券的值
  componentWillReceiveProps = nextProps => {
    // 先储存未筛选的优惠券数据，然后开始筛选
    this.setState({
      coupons: nextProps.coupons
    },
      () => {
        this.filterCouponsStateForCurrentOrder()
      }
    )
  }

  handleOnToggleModal = (modalName) => {
    if(modalName === 'coupon') {
      this.setState({
        isCouponModalVisible: !this.state.isCouponModalVisible
      })
    }
    if(modalName === 'point') {
      this.setState({
        isPointModalVisible: !this.state.isPointModalVisible
      })
    }
    if(modalName === 'logistics') {
      this.setState({
        isLogisticsModalVisible: !this.state.isLogisticsModalVisible,
      })
    }
  }

  // 直接关闭模态窗更适合下级调用
  closeModal = (modalName) => {
    if(modalName === 'coupon') {
      this.setState({
        isCouponModalVisible: false
      })
    }
    if(modalName === 'point') {
      this.setState({
        isPointModalVisible: false
      })
    }
    if(modalName === 'logistics') {
      this.setState({
        isLogisticsModalVisible: false
      })
    }
  }


  filterCouponsStateForCurrentOrder = () => {
    const { order } = this.props
    const { itemList } = order

    // 即将被过滤的 原始优惠券数据
    const couponsRaw = [...this.state.coupons]

    // 根据当前供应商的订单商品列表，过滤出可用的优惠券
    // console.log('=====>>>>>当前供应商订单的商品列表', itemList);
    // console.log('=====>>>>>查看弹窗升起之前的未过滤的优惠券', this.state.coupons);


    /*
     * 情况1： 没有满减限制,但对商品有限制或者无限制
     */
    const couponsWithNoLimitOfPrice = couponsRaw.filter((coupon, i) => {
      const isLimitWithPrice = coupon['order_amount']
      if(!isLimitWithPrice) {                                 // 没有满减

        // 对商品无限制
        const noLimitWithItem = coupon['item_id'] === ""      // 后端是根据 item_id 来解释对商品的限制规则
        if(noLimitWithItem) {
          return true
        }

        // 对商品有限制，则求优惠券中商品 id 列表 和 当前商品列表 id 列表 是否有交集，来确定优惠券的可用性
        const idsInCoupon = coupon['item_id'].split(',')
        const idsInOrder = itemList.map(item => item.itemPrimaryId.toString())
        const idsInCommon = R.intersection(idsInCoupon, idsInOrder)                                 // 交集
        if(idsInCommon.length !== 0) {
          return true
        }
      }
      return false
    })
    /*
     * 情况 1 筛选结束
     */


    // 情况 2 的前期准备
    const toFloat = str => parseFloat(str, 10)
    const getTotalPriceInItems = item => toFloat(R.prop('price')(item)) * R.prop('amount')(item)    // 单个商品的合计价格

    const couponsRawLeft = R.without(couponsWithNoLimitOfPrice, couponsRaw)                         // 第一轮过滤后剩余的优惠券
    // console.log('=====>>>>情况 1 过滤后剩余的优惠券', couponsRawLeft);
    // console.log('=====>>>>>没有满减限制，且全场可用的优惠券',  couponsWithNoLimitOfPrice);


    /*
     * 情况2： 有满减限制（注意满减价格在 有商品限制时 只针对特定商品而不是针对订单）
     * 情况2-1: 有满减，但对商品无任何限制。这个时候对 所有商品 价格总和计算满减
     */
    const orderPrice = R.reduce((a, b) => a + b, 0)(R.map(getTotalPriceInItems)(itemList))         // 当前供应商订单的价格

    const couponsWithNoLimitOfItem = couponsRawLeft.filter(coupon => {
      const noLimitWithItem = coupon['item_id'] === ""
      if(noLimitWithItem) {
        const enough = toFloat(coupon['enough'])
        if(orderPrice >= enough) {
          return true
        }
      }
      return false
    })
    // console.log('=====>>>>>有满减，但无任何商品限制，最后得到的优惠券', couponsWithNoLimitOfItem );
    /*
     * 情况 2-1 结束
     */



    /*
     * 情况2-2: 有满减，同时又只针对特定的商品。这个时候对 特定商品 的总价格来计算满减。注意默认用户至多只能使用一张优惠券
     */
    const couponsLastRawLeft = R.without(couponsWithNoLimitOfItem, couponsRawLeft)

    /*
     * 情况 2-2 的前期数据准备
     */

    // 去除遗留数据
    // 对余下的优惠券原始数据，依然要按照 条件 2-2 严格筛选一次，因为可能会有 条件1 和 条件2-1 不通过，造成数据遗留
    const couponsLastLeft = couponsLastRawLeft.filter(coupon => {
      return coupon['order_amount'] && coupon['item_id'] !== ""
    })
    // console.log('=====>>>>>最后一个条件所需要筛选的原始的优惠券列表', couponsLastLeft);
    // 在原始优惠券列表中过滤出只针对特定商品的优惠券,接着仍需对是否符合单个商品总价的满减规则做出筛选
    const couponsForSpecificItem = couponsLastLeft.filter(coupon => {
      const idsInCoupon = coupon['item_id'].split(',')
      const idsInOrder = itemList.map(item => item.itemPrimaryId.toString())
      const idsInCommon = R.intersection(idsInCoupon, idsInOrder)                                 // 交集
      if(idsInCommon.length !== 0) {
        return true
      }
      return false
    })
    // console.log('=====>>>>>最后一个条件，针对特定商品所剩下的优惠券,但未做满减筛选', couponsForSpecificItem);
    /*
     * 数据准备结束
     */


    /*
     * 情况 2-2 的前期函数准备
     * 前期准备工作 -- 按照商品主键重组订单的商品列表，其中我们只关注 主键 和 总价
     *
     * 计算单个商品的价格
     * 给商品添加价格总和计算
     * 得到带有商品价格总和的新列表
     */

    const getAmountPrice = item => R.prop('price')(item) * R.prop('amount')(item)
    const setAmountPrice = item => ({...item, amountPrice: getAmountPrice(item)})
    const itemListWithAmountPrice = R.map(setAmountPrice)(itemList)
    const objectToArray = obj => Object.keys(obj).map(key => obj[key])        // 对象转数组

    // 将商品按照 主键 itemPrimaryId 分组，以便用来计算来自同一个商品但是规格不同的满减计算
    const itemsGroupById = R.groupBy(item => item['itemPrimaryId'])(itemListWithAmountPrice)
    // console.log('=====>>>>>查看按照主键 id 分组的商品列表', itemsGroupById);

    // 组成新的订单结构，以商品主键 为 key
    const itemsArangedObj = R.map((group, i) => {
      const priceList = R.map(R.prop('amountPrice'))(group)
      const totalPrice = R.reduce((a, b) => a+b, 0)(priceList)

      return {
        primaryId: group[0].itemPrimaryId,                                    // 只要是分了组的，肯定不可能为空
        totalPrice,                                                           // 计算当前分组价格的总和
      }
    })(itemsGroupById)

		const itemsArangedById = objectToArray(itemsArangedObj)
    // console.log('以商品主键为 key 重新组织的订单商品列表，附带总价', itemsArangedById)
    /*
     * 前期准备工作结束
     */


    // 开始做满减筛选
    const couponsSupportPrice = couponsForSpecificItem.filter(coupon => {
      const idsInCoupon = coupon['item_id'].split(',')
      const idsInOrder = itemList.map(item => item.itemPrimaryId.toString())
      const idsInCommon = R.intersection(idsInCoupon, idsInOrder)                                 // 交集
      // console.log('=====>>>>>查看交集ids', idsInCommon);

      // 是否满足满减规则
      const pass = itemsArangedById.some(item => {
        const primaryId = item.primaryId.toString()
        const itemInCommon = R.contains(primaryId)(idsInCommon)
        if(itemInCommon) {
          // console.log('=====>>>>>这里肯定通过', )    // 其实这里肯定能通过，因为已经求得交集

          const enough = toFloat(coupon['enough'])
          const itemTotalPrice = item.totalPrice
          if(itemTotalPrice >= enough) {
            return true
          }
        }
        return false
      })

      return pass
    })
    /*
     * 情况 2-2 筛选结束
     */

    // 将以上不同条件下筛选出的优惠券数据合并，以供优惠券弹窗显示，让用户选择使用
    const coupons = [...couponsWithNoLimitOfPrice, ...couponsWithNoLimitOfItem, ...couponsSupportPrice]
    this.setState({
      coupons
    })
  }

  componentDidMount = () => {
    this.calcFreight()
    this.calcPointLimitInAll()
  }

  // 计算运费
  calcFreight = () => {
    const { order } = this.props
    const { itemList } = order

    // 将商品按照物流分组
    let itemsRangedByLogistics = {}
    itemList.forEach((item, i) => {
      const key = item.logistics.id
      if(!itemsRangedByLogistics[key]) {
        let temp = []
        temp.push(item)
        itemsRangedByLogistics[key] = temp
      } else {
        itemsRangedByLogistics[key].push(item)
      }
    })

    // 计算运费
    // 是否所有的商品所选的物流模板相同？是, 则按照一个模板结算运费
    // 是否所有的商品所选的物流模板相同？否，逐一分开计算后合并到一个总运费价
    // 遇到包邮则设运费为 0
    let freightAmountList = []
    const itemsRangedByLogisticList = Object.values(itemsRangedByLogistics)
    itemsRangedByLogisticList.forEach((items, i) => {
      // 具体的物流规则，从首项去取，因为当前物流分组中每项的物流规则都是相同的
      const { logistics } = items[0]

      // 全额包邮规则
      const isFullCost = logistics['is_full_cost']
      const fullCost = parseFloat(logistics['full_cost'], 10)

      // 首件规则
      const firstCost = parseFloat(logistics['first_cost'], 10)
      const firstCostNumber = logistics['first_number']

      // 续件规则
      const continuCost = parseFloat(logistics['continue_cost'], 10)
      const continueCostNumber = logistics['continue_number']

      // 当前 物流分组 下的 所有商品 总数量 和 总价格
      const amount = R.reduce((pre, next) => pre + next, 0)(R.map(R.prop('amount'))(items))

      const totalPrices = R.map(item => parseFloat(item.price, 10) * item.amount)(items)
      const totalPrice = R.reduce((pre, next) => pre + next, 0)(totalPrices)


      // 包邮。包邮采用大于等于规则
      const freeCost = isFullCost && totalPrice >= fullCost

      if(freeCost) {
        freightAmountList.push(0)              // 包邮
      } else {

        if(amount <= firstCostNumber) {
          freightAmountList.push(firstCost)    // 在首件范围内
        } else {
          const amountLeft = amount - firstCostNumber                     // 续件商品数
          const continueLeft = Math.ceil(amountLeft / continueCostNumber) // 续件个数，不是商品个数！
          freightAmountList.push( firstCost + continuCost * continueLeft )
        }
      }
    })
    const freightAmount = R.reduce((pre, next) => pre + next, 0)(freightAmountList)
    this.setState({
      freightAmount
    },
      () => {
        const { freightAmount } = this.state
        const { index, checkoutFreight } = this.props

          // checkoutFreight(index, freightAmount)
        // 记入运费。同步更新
        setTimeout(() => {
          checkoutFreight(index, freightAmount)
        }, 100 * index)
      }
    )
  }

  // 计算当前订单积分输入额度的限制
  calcPointLimitInAll = () => {
    const { order } = this.props
    const { itemList } = order
    const toFloat = str => parseFloat(str, 10)
    // 当前订单的 积分限制和商品总价格 列表
    const maxPointLimitListWithItem = R.map(
      item => {
        let maxPointPercent = toFloat(item.templateBase['max_points'])
        if(maxPointPercent === 0) {
          // 接入基础积分兑换百分比限制
          maxPointPercent = this.props.basePointExchangeLimit
        }

        const price = toFloat(item.price)
        const totalPrice = price * item.amount
        return {
          maxPointPercent,
          totalPrice
        }

      }
    )(itemList)

    // 当前订单最多能输入的积分数量
    const maxPointInputList = R.map(
      item => {
        const { pointExchangeRate } = this.props
        // return item.totalPrice * item.maxPointPercent * pointExchangeRate / 100
        return item.totalPrice * (item.maxPointPercent / 100) / (pointExchangeRate / 100)
      }
    )(maxPointLimitListWithItem)

    const maxPointInputInAll = maxPointInputList.reduce((a, b) => a + b, 0)
    this.setState({
      maxPointInputInAll
    })

  }


  // 积分兑换拦截
  handlePointExchange = ({ orderIndex, pointInput  }) => {
    const { order } = this.props
    const { maxPointInputInAll } = this.state
    if(pointInput > maxPointInputInAll) {
      return Alert.alert('已超过当前可输入最大积分')
    }

    const { onPointExchange, pointExchangeRate } = this.props
    // 计算当前输入积分所减免的金额
    const toFloat = str => parseFloat(str, 10)
    const reduceByPoint = toFloat(pointInput) * pointExchangeRate / 100
    onPointExchange({ orderIndex, pointInput, reduceByPoint })
  }


  render() {
    const { order } = this.props
    const { messages = {} } = order
    return(
      <View style={styles.container}>
        {/* 供应商信息 */}
        <View style={styles.orderHeaderContainer}>
          <Image
            source={{uri: order.supplierLogo}}
            style={{
              height: 30,
              width: 30,
            }}
          />
          <Text style={styles.orderHeaderText}>
            {order.supplier}
          </Text>
        </View>
        {/* 单个订单的商品列表 */}
        <View >
          {
            order.itemList.map((goodItem, i) => {
              return (
                <View
                  key={i}
                  style={styles.itemContainer}
                >
                  {/* 商品图片 */}
                  <View style={styles.itemImageContainer}>
                    <Image
                      source={{ uri: goodItem.img }}
                      style={styles.itemImage}
                    />
                  </View>
                  {/* 商品信息 */}
                  <View style={styles.itemInfoContainer}>
                    <Text style={styles.itemTitleText}>
                      {goodItem.title}
                    </Text>
                    <Text style={styles.descText}>
                      {goodItem.desc}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.priceText}>
                        ¥{goodItem.price}
                      </Text>
                      <Text style={styles.amountText}>
                        x{goodItem.amount}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        {/* 附加信息和操作 */}
        <TouchableOpacity
          style={styles.listCell}
          onPress={() => {
            this.handleOnToggleModal('coupon')
          }}
        >
          <Text style={styles.listCellLeftText}>
            使用优惠券
          </Text>
          <Image
            style={styles.listCellArrow}
            source={require('../../../assets/icon/arrow.png')}
          />
          {/* 使用优惠券弹窗 */}
          <CouponModal
            closeModal={this.closeModal}
            // index 作为索引凭据，在整个 item 组件中承担当前订单标识符作用
            orderIndex={this.props.index}
            coupons={this.state.coupons}
            isModalVisible={ this.state.isCouponModalVisible }
            onToggleModal={ () => { this.handleOnToggleModal('coupon') } }
            onCouponSelect={this.props.checkoutCoupon}
          />
        </TouchableOpacity>
        {
          this.props.isPointExchangeEnable &&
          <TouchableOpacity
            style={styles.listCell}
            onPress={() => {
              this.handleOnToggleModal('point')
            }}
          >
            <Text style={styles.listCellLeftText}>
              使用积分
            </Text>
            <Image
              style={styles.listCellArrow}
              source={require('../../../assets/icon/arrow.png')}
            />
            {/* 使用积分弹窗 */}
            <PointModal
              closeModal={this.closeModal}
              // 注意两个同时使用是否存在冲突
              isModalVisible={ this.state.isPointModalVisible }
              onToggleModal={ () => { this.handleOnToggleModal('point') } }
              orderIndex={this.props.index}
              onPointExchange={this.handlePointExchange}
              maxPointInputInAll={ this.state.maxPointInputInAll }
            />
          </TouchableOpacity>
        }
        {/* 配送方式 */}
        <TouchableOpacity
          style={styles.listCell}
          onPress={() => {
            this.handleOnToggleModal('logistics')
          }}
        >
          <Text style={styles.listCellLeftText}>
            配送方式
          </Text>
          <Image
            style={styles.listCellArrow}
            source={require('../../../assets/icon/arrow.png')}
          />
          {/* 选择物流弹窗 */}
          <LogisticsTypeModal
            isModalVisible={ this.state.isLogisticsModalVisible }
            onToggleModal={ () => { this.handleOnToggleModal('logistics') } }
          />
        </TouchableOpacity>
        {/* 运费 */}
        <Freight
          freightAmount={this.state.freightAmount}
        />
        {/* 因使用优惠券和积分，而产生的解释数据 */}
        <Explain
          fromPoint={ messages.fromPoint }
          fromCoupon={ messages.fromCoupon }
        />
        {/* 小结 */}
        <OrderSummary
          priceAmount={this.props.priceAmount}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderRadius: 4,
    paddingTop: 10,
  },
  orderHeaderContainer: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  orderHeaderText: {
    marginLeft: 10,
    fontSize: Font.small,
    color: Color.black
  },
  itemContainer: {
    borderBottomWidth: 5,
    borderColor: Color.white,
    // paddingHorizontal: 10,
    backgroundColor: '#f5F6F7',
    flexDirection: 'row'
  },
  itemImageContainer: {
    padding: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  itemInfoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: 'red'
  },
  itemTitleText: {
    paddingVertical: 5,
    color: Color.black,
    fontSize: 14
  },
  descText: {
    paddingBottom: 5,
    color: Color.grey,
    fontSize: Font.tiny
  },
  priceText: {
    flex: 1,
    color: Color.secondary,
    fontSize: Font.small
  },
  amountText: {
    color: Color.black,
    fontSize: Font.small
  },
  listCell: {
    flexDirection: 'row',
    borderTopColor: '#EEE',
    borderTopWidth: 0.5,
    backgroundColor: Color.white,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  listCellLeftText: {
    flex: 1,
    marginLeft: 10,
  },
  listCellArrow: {
    marginRight: 10,
    width: 18,
    height: 18,
  }

})

const mapStateToProps = state => {
  const { globalState } = state
  const { userInfo } = globalState
  const pointSet = userInfo['pointSet'] || {}
  // 是否允许使用积分兑换
  const isPointExchangeEnable = pointSet['deduct_cash']
  // 抵现率
  const pointExchangeRate = pointSet['deduct_cash_rate']
  // 基础抵现百分比限制
  const basePointExchangeLimit = pointSet['point_cash_limit_percent']

  // console.log('=====>>>>>积分规则',
    // isPointExchangeEnable,
    // pointExchangeRate,
    // basePointExchangeLimit
  // );

  return {
    isPointExchangeEnable,
    pointExchangeRate,
    basePointExchangeLimit
  }
}

export default connect(mapStateToProps)(OrderItem)
