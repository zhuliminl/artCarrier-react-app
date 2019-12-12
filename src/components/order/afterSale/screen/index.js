/*
 * Created by Saul at 2018/07/11
 *
 * 申请售后
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Color, Layout, Font } from '../../../../constants'
import Toast from '../../../common/toast'
import api from '../../../../utils/api'
import ChooseServiceType from '../ChooseServiceType'
import Item from '../Item'
import ProblemDesc from '../ProblemDesc'
import LogisticInfo from '../LogisticsInfo'
import ReasonModal from '../ReasonModal'
import MediaUpload from '../MediaUpload'

const item = {
  itemId: 'abcbbea5-d4f1-4eaa-ac2d-f6c3fd4d6700',
  title: '天才手表',
  price: 30,
	decs: '红色',
  amount: 1,
  img: 'http://img.chslab.com:8780/img/BJGVllVJQ.jpeg',
}

const serviceTypes = [
  '换货',
  '退货',
  '退款',
]

const reasons = [
  '质量问题',
  '商品与页面不符',
  '商品损坏',
  '缺少件',
  '发错货',
  '其他',
]


class AfterSaleScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '申请售后服务',
    }
  }

  state = {
    // 申请服务类型
    serviceType: '换货',   // return_goods 退货, exchangee 换货, return_money 退款
    // 所申请的订单信息
    // 只针对具体的某个订单的某个商品
    orderInfo: {
      orderId: '',
      itemId: '',
      skuId: '',
      count: '',
      apply_amount: '',
    },
    // 退换货的凭证信息
    evidence: {
      reason: '',    // 退换货理由。参考京东的申请原因 ———— 单选栏设计
      explain: '',   // 退换货说明
      // 图片信息是什么格式的？
      img_list: '',
    },
    // 物流信息
    logisticInfo: {
      logistic_code: '',
      shipping_name: '',
      receive_id: '',
      exchange_sku_id: '',
    },

    // 根据服务类型的不同，存储不同的文本到 凭证信息
    evidenceText: '',
  }

  // 选择服务类型
  handleServiceTypeChoose = (i) => {
    this.setState({
      serviceType: serviceTypes[i]
    },
      () => {
        console.log('=====>>>>>服务类型', this.state.serviceType);
      }
    )
  }

  // 申请原因
  handleChooseReason = (i) => {
    this.setState({
      evidence: {
        ...this.state.evidence,
        reason: reasons[i],
      }
    },
      () => {
        console.log('=====>>>>>申请原因', this.state.evidence);
      }
    )
  }
  // 添加问题描述输入
  handleProblemInput = (text) => {
    console.log('=====>>>>>输入文字', text);
    console.log('=====>>>>>上传图片', );
  }
  // 添加物流信息输入
  handleLogisticsInfoInput = (inputType, text) => {
    console.log('=====>>>>>处理物流信息输入', );
  }

  render() {
    return(
      <View
        style={{
          height: Platform.OS === 'ios' ?
                  (Layout.window.height - 55)
                : (Layout.window.height - 108),
        }}
      >
        <ScrollView
          style={{
            // backgroundColor: '#999',
          }}
        >
          {/* 选择服务类型 */}
          <ChooseServiceType
            serviceTypes={serviceTypes}
            // serviceType={this.state.serviceType}
            onServiceTypeChoose={this.handleServiceTypeChoose}
          />
          {/* 商品信息 */}
          <Item
            item={item}
          />
          {/* 申请原因 */}
          <ReasonModal
            serviceType={this.state.serviceType}
            reasons={reasons}
            reason={this.state.evidence.reason}
            onChooseReason={this.handleChooseReason}
          />
          {/* 问题描述 */}
          <ProblemDesc
            evidenceText={this.state.evidenceText}
            onProblemInput={this.handleProblemInput}
          />
          {/* 图片上传 */}
          <MediaUpload
          />
          {/* 物流信息输入 */}
          <LogisticInfo
            navigation={this.props.navigation}
            logistic_code={this.state.logistic_code}
            shipping_name={this.state.shipping_name}
            receive_id={this.state.receive_id}
            exchange_sku_id={this.exchange_sku_id}
            onLogisticsInfoInput={this.handleLogisticsInfoInput}
          />
          {/* 提交 */}
          <View
            style={{
              marginTop: 40,
              width: Layout.window.width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: 200,
                padding: 10,
                backgroundColor: Color.primary,
                borderRadius: 5,
              }}
              onPress={() => {
              }}
            >
              <Text
                style={{
                  color: Color.white,
                  textAlign: 'center',
                }}
              >
                提交
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default AfterSaleScreen;
