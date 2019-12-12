/*
 * Created by Saul at 2018/05/14
 *
 * 我的佣金屏幕
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image
} from 'react-native';
import Modal from "react-native-modal";
import { Color, Layout } from '../../../../constants'
import BalanceDetailsModal from '../BalanceDetailsModal'
import BrokerageDetailsModal from '../BrokerageDetailsModal'


class BrokerageScreen extends React.Component {
  state = {
    isShowBalanceModal: false,
    isShowCommissionModal: false,
  }

  static navigationOptions = ({ navigation }) => ({
    title: '我的佣金',
  });

  handleToggleModal = (modalType) => {

    if(modalType === 'balance') {
      this.setState({
        isShowBalanceModal: !this.state.isShowBalanceModal,
      })
    }

    if(modalType === 'commission') {
      this.setState({
        isShowCommissionModal: !this.state.isShowCommissionModal,
      })
    }
  }


  render() {
    const navigation = this.props.navigation;
    return(
      <View>
        {/* 佣金余额展示 */}
        <View
          style={{
            height: 200,
            width: Layout.window.width,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                paddingTop: 25,
                color: Color.medium,
              }}
            >
              佣金余额
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: Color.primary,
              }}
            >
              { this.props.commission }￥
            </Text>
          </View>
        </View>
        {/*  佣金总收入 */}
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#DDD',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: Color.black,
            }}
          >
            佣金总收入
          </Text>
          <Text
            style={{
              color: Color.primary,
            }}
          >
            { this.props.totalCommission }￥
          </Text>
        </View>
        {/* 余额明细 */}
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#DDD',
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            this.handleToggleModal('balance')
          }}
        >
          <Text
            style={{
              flex: 1,
              color: Color.black,
            }}
          >
            余额明细
          </Text>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require('../../../../assets/icon/arrow.png')}
          />
          <Modal
            style={{
              position: 'relative',
              paddingTop: 30,
              top: 100,
              margin: 0,
            }}
            isVisible={ this.state.isShowBalanceModal }
            onBackdropPress={() => {
              this.handleToggleModal('balance')
            }}
            onBackButtonPress={() => {
              this.setState({
                isShowBalanceModal: false,
              })
            }}
          >
            <BalanceDetailsModal />
          </Modal>
        </TouchableOpacity>
        {/* 佣金明细 */}
        <TouchableOpacity
          style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#DDD',
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            this.handleToggleModal('commission')
          }}
        >
          <Text
            style={{
              flex: 1,
              color: Color.black,
            }}
          >
            佣金明细
          </Text>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require('../../../../assets/icon/arrow.png')}
          />
          <Modal
            style={{
              position: 'relative',
              paddingTop: 30,
              top: 100,
              margin: 0,
            }}
            isVisible={ this.state.isShowCommissionModal }
            onBackdropPress={() => {
              this.handleToggleModal('commission')
            }}
            onBackButtonPress={() => {
              this.setState({
                isShowCommissionModal: false,
              })
            }}
          >
            <BalanceDetailsModal />
          </Modal>
        </TouchableOpacity>
        {/* 佣金提现 */}
        <TouchableOpacity
          style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#DDD',
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('Withdraw')
          }}
        >
          <Text
            style={{
              flex: 1,
              color: Color.black,
            }}
          >
            佣金提现
          </Text>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require('../../../../assets/icon/arrow.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { globalState } = state
  const { userInfo } = globalState
  return {
    // 佣金余额
    commission: userInfo.commission || '',
    // 佣金总收入
    totalCommission: userInfo.total_commission || '',
  }
}

export default connect(mapStateToProps)(BrokerageScreen);
