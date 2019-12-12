/*
 * Created by Saul at 2018/06/12
 *
 * 优惠券领取弹窗
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
import Modal from "react-native-modal";
import CouponCard from './couponCard'

class CouponModal extends React.Component {
  static defaultProps = {
    isModalVisible: false,
    onToggleModal: () => {}
  }

  state = {
    couponsSelected: []
  }

  componentWillReceiveProps = nextProps => {
    // 后期再补上

  }

  // 关闭其他优惠券的选中状态
  closeOtherSelected = (couponIndex) => {

  }

  render() {
    const { coupons, onCouponSelect, orderIndex } = this.props
    // 其实在用户动态选取优惠券的时候，还要标记当前优惠券已被使用，并在另外的订单中不可使用
    // 此 BUG 后期解决
    // console.log('=====>>>>最终符合当前商品的优惠券', coupons);
    return(
      <Modal
        style={ styles.modal }
        isVisible={this.props.isModalVisible}
        onBackdropPress={() => {
          this.props.onToggleModal();
        }}
        onBackButtonPress={() => {
          this.props.onToggleModal();
        }}
      >
        <View style={styles.container}>
          <View style={styles.couponTitleContainer}>
            <Text style={styles.couponTitleText}>
              当前可用优惠券
            </Text>
          </View>
          <ScrollView style={styles.cardsContainer}>
            {
              coupons.map((coupon, i) => {
                return (
                  <CouponCard
                    isSelected={this.state.couponsSelected[i]}
                    closeOtherSelected={this.closeOtherSelected}
                    couponIndex={i}
                    closeModal={this.props.closeModal}
                    orderIndex={orderIndex}
                    onCouponSelect={onCouponSelect}
                    coupon={coupon}
                    key={i}
                  />
                )
              })
            }
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

// className 的语义有变，不必在意
const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    paddingTop: 30,
    top: 100,
    margin: 0,
  },
  container: {
    paddingTop: 20,
    // paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  cardsContainer: {
    paddingBottom: 20,
    marginBottom: 40,
    backgroundColor: Color.white
  },
  couponCardContainer: {
    // backgroundColor: 'red'
  },
  couponTitleContainer: {
    marginBottom: 10
  },
  couponTitleText: {
    paddingLeft: 10,
    fontSize: 15,
    color: Color.black
  }
})

export default CouponModal;
