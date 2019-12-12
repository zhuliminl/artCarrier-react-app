/*
 * Created by Saul at 2018/05/10
 *
 * 未使用的优惠券
 *
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  RefreshControl
} from 'react-native';
import {
  Color,
  Space,
  Font,
  GlobalStyle,
  Layout
} from '../../../constants';
import DefaultPage from '../../common/defaultPage';
import { couponData } from './__test__';

const bgCouponUnusedURL = require('../../../assets/image/bg_coupon_unused.png');


class Card extends React.Component {

  render() {
    // console.log('=====>>>>>coupon unused', this.props);
    // 这里的 API 数据结构设计有点......
    const couponData = this.props.coupon || {};
    const coupon = couponData.usercoupon
    return(
      <View style={ styles.cardContainer } >
        {/* 优惠券卡片左边 */}
        <ImageBackground
          style={ styles.cardLeft }
          source={ bgCouponUnusedURL }
        >
          <Text style={ styles.valueText } >
            { coupon.reduce }
          </Text>
          <Text style={ styles.minMoneyText } >
            满{ coupon.enough }可用
          </Text>
        </ImageBackground>
        {/* 右边 */}
        <View style={ styles.cardRight } >
          <View style={ styles.cardRightTop } >
            <Text style={ styles.courseText } >
              {coupon.name}
            </Text>
          </View>
          {/* 优惠券的年限是个不可能的最大值代表永久有效 */}
          <View style={ styles.cardRightBottom } >
              {/*
              { parseInt(requirement.expiration, 10) < 2040 ? requirement.expiration : '永久有效' }
                  */}
            <Text style={styles.expirationText}> 开始时间 {coupon['start_time'] } </Text>
            <Text style={styles.expirationText}> 过期时间 {coupon['end_time']} </Text>
            {/*
            <TouchableOpacity style={ styles.buttonGo } >
              <Text style={ styles.buttonGoText } >
                去使用
              </Text>
            </TouchableOpacity>

                */}
          </View>
        </View>
      </View>
    )
  }
}


class CardUnused extends React.Component {
  state = {
    isLoading: false
  }
  render() {
    // const couponUnused = couponData.unused;
    const { couponUnused } = this.props

    if(!Array.isArray(couponUnused) || couponUnused.length === 0) {
      return (
        <DefaultPage message={'没有未使用的优惠券'} />
      )
    }

    return(
      <ScrollView
        style={ styles.container }
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => {
							// 刷新优惠券数据
							const { fetchUserCoupons } = this.props
							fetchUserCoupons('use')
            }}
          />
        }
      >
        {
          couponUnused.map((item, i) => {
            return (
              <Card
                key={i}
                coupon={item}
              />
            )
          })
        }
     </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		backgroundColor: Color.bg,
    // paddingLeft: 20,
  },
  cardContainer: {
    margin: 10,
    // marginBottom: 20,
    backgroundColor: Color.white,
    flexDirection: 'row',
    borderRadius: 5,
    ...GlobalStyle.tintShadow
  },
  cardLeft: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  minMoneyText: {
    color: Color.white,
    fontSize: 16,

  },
  valueText: {
    color: Color.white,
    fontSize: 30,
    // fontFamily: 'DINCond-Black'
  },
  cardRight: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
  },
  cardRightTop: {
    flex: 1
  },
  cardRightBottom: {
    justifyContent: 'center'
  },
  courseText: {
    color: Color.black,
    lineHeight: 30,
    fontSize: Font.medium
  },
  expirationText: {
    color: Color.medium,
    flex: 1,
    fontSize: Font.tiny
  },
  buttonGo: {
    backgroundColor: Color.primary,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20
  },
  buttonGoText: {
    color: Color.white,
  }

})

export default CardUnused;
