/*
 * Created by Saul at 2018/05/10
 *
 * 已经过期的优惠券
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
  ScrollView
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

const bgCouponExpiredURL = require('../../../assets/image/bg_coupon_expired.png');


class Card extends React.Component {

  render() {
    const coupon = this.props.coupon || {};
    const requirement = coupon.requirement || {};
    return(
      <View style={ styles.cardContainer } >
        {/* 优惠券卡片左边 */}
        <ImageBackground
          style={ styles.cardLeft }
          source={ bgCouponExpiredURL }
        >
          <Text style={ styles.valueText } >
            { coupon.value }
          </Text>
          <Text style={ styles.minMoneyText } >
            满{ requirement.minMoney }可用
          </Text>
        </ImageBackground>
        {/* 右边 */}
        <View style={ styles.cardRight } >
          <View style={ styles.cardRightTop } >
            <Text style={ styles.courseText } >
              { requirement.course }
            </Text>
          </View>
          {/* 优惠券的年限是个不可能的最大值代表永久有效 */}
          <View style={ styles.cardRightBottom } >
            <Text style={ styles.expirationText } >
              { parseInt(requirement.expiration, 10) < 2040 ? requirement.expiration : '永久有效' }
            </Text>
            <TouchableOpacity>
              <Text style={ styles.buttonExpiredText } >
                已过期
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


class CouponExpired extends React.Component {
  render() {
    // const couponExpired = couponData.expired;
    const { couponExpired = [] } = this.props

    if(!Array.isArray(couponExpired) || couponExpired.length === 0) {
      return (
        <DefaultPage message={'你没有过期的优惠券哦'} />
      )
    }

    return(
      <ScrollView style={ styles.container } >
        {
          couponExpired.map((item, i) => {
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
    // 特定的场景需求，本组件有部分值之间依赖性较强。可不必引用全局定义
    padding: 10,
    paddingLeft: 20,
  },
  cardContainer: {
    marginBottom: 20,
    backgroundColor: Color.white,
    flexDirection: 'row',
    borderRadius: 5,
    // ...GlobalStyle.tintShadow
  },
  cardLeft: {
    marginLeft: -10,
    width: 276 / 2,
    height: 274 / 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  minMoneyText: {
    color: Color.white,
    fontSize: 16,

  },
  valueText: {
    color: Color.white,
    fontSize: 50,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  courseText: {
    color: Color.grey,
    lineHeight: 30,
    fontSize: Font.medium
  },
  expirationText: {
    color: Color.grey,
    flex: 1,
    fontSize: Font.tiny
  },
  buttonExpiredText: {
    color: Color.grey,
  }

})

export default CouponExpired;
