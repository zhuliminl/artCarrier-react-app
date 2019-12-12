/*
 * Created by Saul at 2018/05/30
 *
 * 购买系列课
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Color, Font, Space, Layout } from '../../../../constants'
import Modal from "react-native-modal";


class CoursePurchase extends React.Component {
  static defaultProps = {
    onCoursePurchase: () => {}
  }


  handleCoursePurchase = ({ payType }) => {
    // console.log('=====>>>>>payte', payType);
    const { onCoursePurchase } = this.props
    onCoursePurchase({ payType })
  }

  render() {
    return(
      <TouchableOpacity
        onPress={() => {
          this.props.onToggleModal()
        }}
        style={ styles.container }
      >
        <Text style={ styles.purchaseText }>
          购买系列课
        </Text>
        <Modal
          style={styles.modalContainer}
          isVisible={ this.props.isModalVisible }
          onBackdropPress={() => {
            this.props.onToggleModal()
          }}
        >
          <View
            style={styles.modalInnerContainer}
          >
            <Text style={styles.choisePayTypeText}>
              选择支付方式
            </Text>
            {/* 支付方式 */}
            <TouchableOpacity
              style={styles.modalCellContainer}
              onPress={() => {
                this.handleCoursePurchase({
                  payType: 'alipay'
                })
              }}
            >
              <Text style={styles.modalCellText}>支付宝支付</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCellContainer}
              onPress={() => {
                this.handleCoursePurchase({
                  payType: 'balance'
                })
              }}
            >
              <Text style={styles.modalCellText}>余额支付</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    // backgroundColor: Color.primary,
    backgroundColor: Color.homeBgDark,
    justifyContent: 'center',
    alignItems: 'center'
  },
  purchaseText: {
    textAlign: 'center',
    color: Color.white,
    fontSize: Font.small
  },
  choisePayTypeText: {
    marginBottom: 30,
  },
  modalContainer: {
    position: 'relative',
    paddingTop: 50,
    top: 200,
    margin: 0,
  },
  modalInnerContainer: {
    paddingTop: 20,
    paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  modalCellContainer: {
    borderTopWidth: 0.5,
    borderColor: '#EEE',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalCellText: {
    color: Color.medium,
    fontSize: Font.small
  }
})

export default CoursePurchase;
