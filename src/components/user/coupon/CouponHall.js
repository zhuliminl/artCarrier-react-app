/*
 * Created by Saul at 2018/07/02
 *
 * 优惠券大厅
 *
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
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
import Toast from '../../common/toast'
import DefaultPage from '../../common/defaultPage';
import api from '../../../utils/api'

const bgCouponUnusedURL = require('../../../assets/image/bg_coupon_unused.png');

class CouponHall extends React.Component {
  state = {
    allCoupon: []
  }

  componentDidMount = () => {
    this.fetchAllCoupon()
  }

  fetchAllCoupon = async () => {
    // console.log('=====>>>>>正在请求优惠券大厅数据', );
    try {
      const response = await api.get('/coupon')
      const allCouponData = response.data.data

      this.setState({
        allCoupon: allCouponData
      })

    } catch (error) {
      Toast.show('请求全部优惠券错误')
    }
  }

  handleCouponReceive = (couponId, alreadyUsed, alreadyReceived, isOnlyOne) => {

    if(alreadyUsed) {
      return Alert.alert('该优惠券已经使用过了')
    }

    if(alreadyReceived && isOnlyOne) {
      return Alert.alert('该优惠券已经领取')
    }

    Alert.alert(
    '领取优惠券',
    '确定领取该优惠券？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确认领取', onPress: () => {
          this.confirmReceiveCoupon(couponId)
        }},
      ],
      { cancelable: false }
    )
  }

  // 确认领取优惠券
  confirmReceiveCoupon = async (couponId) => {
    try {
      const response = await api.post('/coupon/receive', { coupon_id: couponId })
      const resultData = response.data.data
      const message = resultData.message
      Alert.alert(message)
      // 刷新优惠券
      this.fetchAllCoupon()
    } catch (error) {
      console.log('=====>>>>>优惠券领取错误', error);
      Toast.show('网络有点小问题呢')
    }
  }

  render() {
    const { allCoupon } = this.state
    if(allCoupon.length === 0) {
      return (
        <DefaultPage />
      )
    }

    return(
      <ScrollView
        style={ styles.container }
      >
        {
          allCoupon.map((coupon, i) => {
            // console.log('=====>>>>>优惠券具体信息', coupon);
            let isForSpecificItem = coupon.item_title !== ""  // 针对特定商品的优惠券
            let specificItems = []
            let itemsImg = coupon.item_img.split(',')
            let itemsTitle = coupon.item_title.split(',')
            if(isForSpecificItem) {
              itemsTitle.forEach((item, i) => {
                specificItems.push({
                  img: itemsImg[i],
                  title: item
                })
              })
            }
            // 要对特定商品的个数做出限定，最多显示五个
            if(specificItems.length >= 5) {
              specificItems = specificItems.slice(0, 5)
            }
            return (
              <View
                key={i}
              >
                <TouchableOpacity
                  onPress={() => {
                    const couponId = coupon.id
                    const alreadyUsed = coupon.already_used
                    const alreadyReceived = coupon.already_received
                    const isOnlyOne = coupon.is_only_one
                    this.handleCouponReceive(couponId, alreadyUsed, alreadyReceived, isOnlyOne)
                  }}
                  style={ styles.cardContainer }
                >
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
                      <Text style={styles.expirationText}> 开始时间 {coupon['start_time'] } </Text>
                      <Text style={styles.expirationText}> 过期时间 {coupon['end_time']} </Text>
                      <Text
                        style={{
                          color: Color.primary,
                          textAlign: 'right',
                        }}>
                        点击领取
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {/* 针对特定商品 */}
                {
                  isForSpecificItem && (
                    <View
                      style={{
                        position: 'relative',
                        zIndex: -1,
                        top: -30,
                        paddingTop: 30,
                        paddingLeft: 10,
                        backgroundColor: '#EEE'
                      }}
                    >
                      <Text
                        style={{
                          color: Color.black,
                        }}
                      >
                        针对特定商品
                      </Text>
                      {
                        specificItems.map((item, i) => {
                          return (
                            <View
                              key={i}
                              style={{
                                paddingVertical: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 4,
                                  marginRight: 10,
                                }}
                              >
                                <Image
                                  source={{
                                    uri: item.img,
                                  }}
                                  style={{
                                    borderRadius: 4,
                                    height: 30,
                                    width: 30,
                                  }}
                                />
                              </View>
                              <View>
                                <Text
                                  numberOfLines={1}
                                  ellipsizeMode={'tail'}
                                  style={{
                                    width: 200,
                                  }}
                                >
                                  {item.title}
                                </Text>
                              </View>
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                }
              </View>
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
  },
  cardContainer: {
    margin: 10,
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

export default CouponHall;
