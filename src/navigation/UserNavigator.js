/*
 * Created by jemo at 2018/05/28
 *
 * 个人中心的导航
 *
 */

import MessageScreen from '../components/user/message/screen';
import OrderScreen from '../components/user/order/screen';
import CouponScreen from '../components/user/coupon/screen';
import PointScreen from '../components/user/point/screen';
import TrackScreen from '../components/user/track/screen';
import CollectionScreen from '../components/user/collection/screen';
import MyCourseScreen from '../components/user/course/screen'
import BrokerageScreen from '../components/user/brokerage/screen'
import WithdrawScreen from '../components/user/brokerage/withdraw/srceen'
import ApplyForDistributorScreen from '../components/user/applyfor/distributor/screen';
import ApplyForAgentScreen from '../components/user/applyfor/agent/screen';
import AboutUsScreen from '../components/user/aboutUs/screen';
import ChangePassworScreen from '../components/user/changePassword/screen';

import AddressListScreen from '../components/user/shipAddress/addressList/screen'
import AddressAddScreen from '../components/user/shipAddress/addressAdd/screen'
import AddressModifyScreen from '../components/user/shipAddress/addressModify/screen'

export default {
    // 消息中心
    Message: {
      screen: MessageScreen,
      navigationOptions: ({ navigation }) => ({
        title: '消息中心',
      }),
    },
    // 订单
    Order: {
      screen: OrderScreen,
      navigationOptions: ({ navigation }) => ({
        title: '我的订单',
      }),
    },
    // 优惠券
    Coupon: {
      screen: CouponScreen,
      navigationOptions: ({ navigation }) => ({
        title: '我的优惠券',
      }),
    },
    // 积分
    Point: {
      screen: PointScreen,
      navigationOptions: ({ navigation }) => ({
        title: '我的积分',
      }),
    },
    // 足迹
    Track: {
      screen: TrackScreen,
      navigationOptions: ({ navigation }) => ({
        title: '我的足迹',
      }),
    },
    // 收藏
    Collection: {
      screen: CollectionScreen,
      navigationOptions: ({ navigation }) => ({
        title: '我的收藏',
      }),
    },
    // 我的课程
    MyCourse: {
      screen: MyCourseScreen,
      navigationOptions: ({ navigation }) => ({
        title: '我的课程',
      }),
    },
    // 申请分销商
    ApplyForDistributor: {
      screen: ApplyForDistributorScreen,
    },
    // 申请代理商
    ApplyForAgent: {
      screen: ApplyForAgentScreen,
    },
    // 关于我们
    AboutUs: {
      screen: AboutUsScreen
    },
    // 修改密码
    ChangePassword: {
      screen: ChangePassworScreen,
      navigationOptions: ({ navigation }) => ({
        title: '修改密码',
      }),
    },

    // 收货地址
    AddressList: {
      screen: AddressListScreen,
      navigationOptions: ({ navigation }) => ({
        title: '我的收获地址',
      }),
    },
    AddressAdd: {
      screen: AddressAddScreen,
      navigationOptions: ({ navigation }) => ({
        title: '添加收获地址',
      }),
    },
    AddressModify: {
      screen: AddressModifyScreen,
    },
    // 佣金和佣金提现
    Brokerage: {
      screen: BrokerageScreen,
    },
    Withdraw: {
      screen: WithdrawScreen,
    }

}
