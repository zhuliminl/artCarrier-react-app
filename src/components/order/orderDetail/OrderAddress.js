/*
 * Created by Saul at 2018/06/13
 *
 * 订单地址信息
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
import { Color, Layout, Font } from '../../../constants'

class OrderAddress extends React.Component {

  render() {
    return(
      <View style={styles.container}>
        {/* 地址图标 */}
        <View style={styles.addressIconContainer}>
          <Image
            source={require('../../../assets/icon/address.png')}
            style={styles.addressIcon}
          />
        </View>
        {/* 地址文本信息 */}
        <View style={styles.addressInfoContainer}>
          <View style={styles.userInfoContianer}>
            <Text style={styles.consigneeText}>
              收货人: {this.props.receiver}
            </Text>
            <Text style={styles.phoneNumberText}>
              {this.props.receiverPhone}
            </Text>
          </View>
          <View>
            <Text style={styles.addressText}>
              {this.props.shippingAddressText}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    marginBottom: 10,
    paddingVertical: 10,
    flexDirection: 'row'
  },
  addressIconContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  addressIcon: {
    height: 24,
    width: 24
  },
  addressInfoContainer: {
    // backgroundColor: '#999',
    flex: 1,
    marginRight: 20,
  },
  userInfoContianer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  consigneeText: {
    flex: 1,
    color: Color.black,
    fontSize: Font.small
  },
  addressText: {
    color: Color.black,
    fontSize: Font.tiny
  },
  phoneNumberText: {
    color: Color.medium,
    fontSize: Font.tiny
  },
})


export default OrderAddress;
