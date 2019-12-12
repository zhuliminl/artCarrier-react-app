/*
 * Created by Saul at 2018/05/10
 *
 * 优惠券页面
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import { View, Text, Alert } from 'react-native';
import { Color } from '../../../../constants';
import CouponUnused from '../CouponUnused';
import CouponUsed from '../CouponUsed';
import CouponExpired from '../CouponExpired';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Toast from '../../../common/toast'
import api from '../../../../utils/api'
import { updateUserCoupon } from '../../../../reducers/globalReducer/actions'
import CouponHall from '../CouponHall'


class CouponScreen extends React.Component {

  componentDidMount = () => {
    this.fetchUserCoupons('use')
    this.fetchUserCoupons('used')
    this.fetchUserCoupons('overdue')
  }

  fetchUserCoupons = async (status) => {
    try {
      const response = await api.get(`/user/coupon/list/${status}`)
      const couponData = response.data.data
      const { dispatch } = this.props

      dispatch(
        updateUserCoupon(status, couponData)
      )

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

  render() {
    const { coupon } = this.props
    const couponHall = []

    return(
      <ScrollableTabView
        tabBarInactiveTextColor={ Color.medium }
        tabBarActiveTextColor={ Color.primary }
        tabBarUnderlineStyle={{
          backgroundColor: Color.primary,
          borderRadius: 4,
          height: 2
        }}
      >
        <CouponHall
          coupon={couponHall}
          tabLabel="优惠券大厅"
        />
        <CouponUnused
          couponUnused={coupon.use}
          tabLabel="未使用"
					fetchUserCoupons={this.fetchUserCoupons}
        />
        <CouponUsed
          couponUsed={coupon.used}
          tabLabel="已使用"
        />
        <CouponExpired
          couponExpired={coupon.overdue}
          tabLabel="已过期"
        />
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = state => {
  const { globalState } = state
  const { coupon = {} } = globalState
  return {
    coupon
  }
}

export default connect(mapStateToProps)(CouponScreen)
