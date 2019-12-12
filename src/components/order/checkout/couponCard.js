/*
 * Created by Saul at 2018/06/12
 *
 * 优惠券卡片
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
  AlertIOS,
  Platform,
  Text,
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'
import CheckBox from '../../common/checkBox'

class CouponCard extends React.Component {
  // 暂时使用局部方案，其实是个 BUG
  state = {
    isSelected: false
  }

  // 记录优惠券被选中
  handdleCouponSelect = (couponIndex) => {
    this.setState({
      isSelected: !this.state.isSelected
    },
      () => {
        const {
          orderIndex,
          onCouponSelect,
          coupon,
          closeOtherSelected } = this.props

        onCouponSelect({
          isChecked: this.state.isSelected,
          couponId: coupon.id,
          orderIndex,
          reduceByCoupon: parseFloat(coupon.reduce, 10),
        })

        closeOtherSelected(couponIndex)
      }
    )
  }

  render() {
    const { coupon, orderIndex, onCouponSelect, couponIndex} = this.props
    return(
      <TouchableOpacity
        style={styles.couponCardContainer}
        onPress={() => {
          this.handdleCouponSelect(couponIndex)
        }}
      >
        {/* 卡片左边 */}
        <View style={styles.cardLeftContainer}>
          <View style={styles.cardLeftPriceContainer}>
            <Text style={styles.cardRMBSymbol}>¥</Text>
            <Text style={styles.cardValueText}>{coupon.reduce}</Text>
          </View>
          <View>
            <Text style={styles.cardRequirementText}>满 {coupon.enough} 减</Text>
          </View>
        </View>
        {/* 卡片右边 */}
        <View style={styles.cardRightContainer}>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text style={styles.cardSupplierText}>{coupon.name}</Text>
            <Text style={styles.cardExpirationText}>过期时间{coupon.end_time}</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              // isChecked={this.props.isSelected}
              isChecked={this.state.isSelected}
              onClick={() => {
                // this.handdleCouponSelect(couponIndex)
              }}
            />
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  couponCardContainer: {
    // backgroundColor: '#999',
    paddingHorizontal: 6,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  cardLeftContainer: {
    borderRadius: 4,
    paddingVertical: 20,
    backgroundColor: Color.primary,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardLeftPriceContainer: {
    flexDirection: 'row'
  },
  cardRMBSymbol: {
    paddingTop: 5,
    color: Color.white,
    fontSize: 12
  },
  cardValueText: {
    color: Color.white,
    fontSize: 28,
  },
  cardRequirementText: {
    color: Color.white,
    fontSize: Font.small,
  },
  cardRightContainer: {
    borderRadius: 4,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#DDD',
  },
  cardRightTextContainer: {
    // marginRight: 10
    // paddingRight: 10
  },
  checkBoxContainer: {
    paddingLeft: 20,
    // backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardSupplierText: {
    color: Color.black,
    fontSize: 14,
    flex: 1,
  },
  cardExpirationText: {
    color: Color.grey,
    fontSize: Font.tiny
  }
})

export default CouponCard;
