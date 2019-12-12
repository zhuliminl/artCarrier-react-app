/*
 * Created by Saul at 2018/06/11
 *
 * 积分输入弹窗
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
  Alert,
  Platform,
  Text,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { Color, Layout, Font } from '../../../constants'
import Modal from "react-native-modal";

class PointModal extends React.Component {
  state = {
    point: '',
  }

  confirmPointExchange = () => {
    const { point } = this.state
    const { pointLeft } = this.props
    if(point === "") {
      return Alert.alert('积分输入不能为空')
    }
    if(point > pointLeft) {
      return Alert.alert('积分不足')
    }
    const { orderIndex, onPointExchange, closeModal } = this.props
    onPointExchange({
      orderIndex,
      pointInput: point
    })

    closeModal('point')
  }

  render() {
    const { maxPointInputInAll = 0 } = this.props
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
          {/* 标题 */}
          <View style={styles.pointTitleContainer}>
            <Text style={styles.pointTitleText}>
              输入积分
            </Text>
          </View>
          {/* 积分剩余和积分兑换输入 */}
          <View style={styles.cellContainer}>
            <Text style={styles.cellRightText}>
              当前剩余积分
            </Text>
            <Text style={styles.pointLeftText}>
              {this.props.pointLeft}
            </Text>
          </View>

          <View style={styles.cellContainer}>
            <Text style={styles.cellRightText}>
              请输入兑换积分数量
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                // 后期记得检测输入类型
                this.setState({ point: text })
              }}
              underlineColorAndroid='transparent'
              placeholderTextColor='#999'
              placeholder={'输入'}
            >
            </TextInput>
          </View>
          {/* 积分兑换规则提示 */}
          <View style={styles.cellContainer}>
            <Text style={styles.warningText}>
              提示：当前订单最多可使用 {maxPointInputInAll.toFixed()} 积分
            </Text>
          </View>
          {/* 确认兑换 */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              this.confirmPointExchange()
            }}
          >
            <Text style={styles.confirmButtonText}>确认兑换</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    paddingTop: 60,
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
  pointTitleContainer: {
    marginBottom: 20
  },
  pointTitleText: {
    paddingLeft: 10,
    fontSize: Font.medium,
    color: Color.black
  },
  cellContainer: {
    // backgroundColor: '#999',
    borderTopWidth: 0.5,
    borderColor: '#EEE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cellRightText: {
    color: Color.medium,
    fontSize: Font.small,
  },
  pointLeftText: {
    marginRight: 10,
    color: Color.primary,
    fontSize: Font.small,
  },
  textInput: {
    textAlign: 'right',
    flex: 1,
    marginRight: 10,
    // backgroundColor: 'green',
    // color: Color.medium,
    color: 'green',
    fontSize: Font.small
  },
  warningText: {
    color: Color.grey,
    fontSize: Font.tiny,
  },
  confirmButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: Color.primary,
    paddingVertical: 10,
    width: '80%',
    borderRadius: 20,
  },
  confirmButtonText: {
    color: Color.white,
    fontSize: Font.small,
    textAlign: 'center'

  }


})

const mapStateToProps = state => {
  const { globalState } = state
  const { userInfo } = globalState
  const pointLeft = userInfo['points'] || 0
  const pointSet = userInfo['pointSet'] || {}
  return {
    pointLeft,
    pointSet
  }
}


export default connect(mapStateToProps)(PointModal)
