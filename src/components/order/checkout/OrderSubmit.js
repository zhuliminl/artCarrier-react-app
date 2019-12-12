/*
 * Created by Saul at 2018/06/11
 *
 * 订单提交
 *
 */


import React from 'react'
import { connect } from 'react-redux'
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
  AlertIOS,
  Platform,
  Text,
} from 'react-native'
import { Color, Layout, Font } from '../../../constants'
import api from '../../../utils/api'
import Toast from '../../common/toast'
// import Alipay from '@0x5e/react-native-alipay';

class OrderSubmit extends React.Component {

  render() {
    const toFloat = str => parseFloat(str, 10)
    const {
      totalPrice,
      priceList,
      onOrderSubmit,
    } = this.props
    const totalPriceInAll = priceList.reduce((a, b) => a + b, 0)
    return(
      <View style={ styles.container }>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>
            总价格(含会员折扣)
          </Text>
          <Text style={styles.totalPriceNumberText}>
            ¥{totalPriceInAll}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.onOrderSubmit()
            // this.handleOrderSubmit()
          }}
          style={styles.submitContainer}
        >
          <Text style={styles.submitText}>
            提交订单!
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 60,
    height: Platform.OS === 'ios' ? 60 : 50,
    borderTopWidth: 0.5,
    borderColor: '#F5F6F7',
    backgroundColor: Color.white
  },
  totalPriceContainer: {
    alignItems: 'center',
    paddingRight: 20,
    flexDirection: 'row',
    flex: 1
  },
  totalPriceText: {
    paddingRight: 10,
    flex: 1,
    textAlign: 'right'
  },
  totalPriceNumberText: {
    fontSize: Font.medium,
    color: Color.primary
  },
  submitContainer: {
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: Color.secondary
  },
  submitText: {
    color: Color.white,
    fontSize: Font.small
  }
})


export default OrderSubmit
