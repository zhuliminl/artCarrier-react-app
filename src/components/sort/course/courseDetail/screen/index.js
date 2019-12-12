/*
 * Created by Saul at 2018/05/17
 *
 * 课程详情屏幕
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { Layout } from '../../../../../constants'
import api from '../../../../../utils/api'
import Header from './Header'
import CourseDetail from '../CourseDetail'
import CoursePurchase from '../CoursePurchase'
import Toast from '../../../../common/toast'
import Alipay from '@0x5e/react-native-alipay';

class CourseDetailScreen extends React.Component {
  state = {
    courseId: '',
    payResultFromPlatForm: '',
    isModalVisible: false,
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      header: params.header,
    }
  }

  componentWillMount = () => {
    // 在静态属性 navigationOptions 中配置 Header 时，如果想要在里面使用实例的方法，
    // 则需要在 ComponentWillMount 中设定参数传递
    this.setNavigationParams()

    // 从上个页面获取到 id，并储存到本组件
    this.setCourseId()
  }

  setNavigationParams = () => {
    const { navigation } = this.props

    const courseTitle = navigation.getParam('courseTitle', 'noop')

    // 顶部导航组件
    const header = (
        <Header
          title={ courseTitle }
          navigation={ navigation }
          onShared={ this.handleOnShared }
          onLiked={ this.handleOnLiked }
        />
    )

    navigation.setParams({
      header
    })
  }

  // 存放课程 ID 到 本组件状态
  setCourseId = () => {
    const { navigation } = this.props
    const courseId = navigation.getParam('courseId', 'noop')
    this.setState({
      courseId
    })
  }


  componentDidMount = () => {
    this.fetchCourseDetail()
  }

  // 获取课程详情数据
  fetchCourseDetail = async () => {
    const { courseId } = this.state
    try {
      const response = await api.get(`/course/${courseId}`)
      const data = response.data.data || {};
      // console.log('course detail data', data)
      this.setCourseData(data)
    } catch(error) {
      console.log('fetch course detail fail', error)
      if(error.data) {
        return Alert.alert('请求错误')
      }
      return Alert.alert('网络错误')
    }

  }

  // 存储课程数据到本组件
  setCourseData = (data) => {
    this.setState({
      courseData: data
    })
  }

  // 分享课程
  handleOnShared = () => {
    console.log('ready to handeleOnShared')
  }

  // 处理收藏请求
  handleOnLiked = () => {
    console.log('request for collection')
  }

  handleCoursePurchase = async ({ payType }) => {
    this.setState({ isModalVisible: false })
    const { courseId } = this.state
    // 组装支付需要的数据
    let orderInfo = {}
    // 支付宝支付
    if(payType === 'alipay') {
      orderInfo = {
        pay_type: 'alipay',
        course_id: courseId,
        point: '',
        coupon_id: ''
      }

      try {
        const response = await api.post('/course/order', { orderInfo })
        const payData = response.data.data
        this.payWithAlipay(payData)
      } catch (error) {
        console.log('=====>>>>>课程购买错误', JSON.stringify(error));
        return Toast.show("支付失败")
      }
    }

    // 余额支付
    if(payType === 'balance') {
      // 一期直接提示余额不足
      Alert.alert('余额不足')

    }
  }


  payWithAlipay = async (payData) => {
    const orderStr = payData['pay_params']
    try {
      let response = await Alipay.pay(orderStr)

      // 截取支付宝返回的信息。错误结果采取本地解决，不通知给服务器
      // 只把成功的结果通知给服务器
      const { memo, resultStatus, result: resultStr } = response

      if(resultStatus === '9000') {
        // 虽然支付宝能返回支付状态结果，
        // 但是要求 最终的 订单状态还是以通知过后台服务器并以后台的返回结果为准
        this.setState({ payResultFromPlatForm: JSON.parse(resultStr) },
          () => {
            // 支付成功后关闭 Modal
            console.log('=====>>>>>state', this.state);
          }
        )
      } else {

        // 暂时不考虑支付结果未知，如 status = 8000 的状态
        Toast.show(memo, Toast.LONG)
        Alert.alert('支付失败')
      }

      console.log('=====>>>>>支付宝返回的结果', JSON.parse(resultStr));
    } catch (error) {

      console.log('=====>>>>>AliPay error', error);
      Alert.alert('支付失败 ')
    }
  }

  handleToggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render() {
    return(
      <View style={{flex: 1}}>
        {/* 课程详情 */}
        <CourseDetail
          navigation={ this.props.navigation }
          course={this.state.courseData}
        />
        {/* 课程购买 */}
        <CoursePurchase
          onToggleModal={ this.handleToggleModal }
          isModalVisible={ this.state.isModalVisible }
          onCoursePurchase={ this.handleCoursePurchase }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
})

export default CourseDetailScreen;
