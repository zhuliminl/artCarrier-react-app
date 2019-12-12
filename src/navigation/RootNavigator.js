/*
 * Created by jemo on 2018-3-27.
 *
 * 根目录导航。
 */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Color, Font } from '../constants';
import { StackNavigator } from 'react-navigation';
// 让底部组件也能导航到顶部组件
import NavigationService from './NavigationService';

import TabNavigator from './TabNavigator';
import SplashScreen from '../components/launch/splash/screen'
import WelcomeScreen from '../components/launch/welcome/screen'
import LoginScreen from '../components/auth/login/screen';
import RegisterScreen from '../components/auth/register/screen';

import GoodDetailScreen from '../components/sort/good/goodDetail/screen';
import ShopHomePageScreen from '../components/shop/shopHomePage/screen';
import ShopCategoryScreen from '../components/shop/shopCategory/screen';
import ShopInfoScreen from '../components/shop/shopInfo/screen';
import CourseDetailScreen from '../components/sort/course/courseDetail/screen';

// 海报和培训
import PosterDetailScreen from '../components/sort/poster/posterDetail/screen';
import TrainDetailScreen from '../components/sort/train/trainDetail/screen';

import CheckoutScreen from '../components/order/checkout/screen'
import OrderDetailScreen from '../components/order/orderDetail/screen'
import AfterSaleScreen from '../components/order/afterSale/screen'

import UserNavigator from './UserNavigator';
import OrderCommentScreen from '../components/order/comment/screen'

const RootNavigator = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Tab: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },

    // 商品详情
    GoodDetail: {
      screen: GoodDetailScreen,
    },
    // 店铺主页
    ShopHomePage: {
      screen: ShopHomePageScreen,
    },
    // 店铺分类
    ShopCategory: {
      screen: ShopCategoryScreen
    },
    // 店铺简介
    ShopInfo: {
      screen: ShopInfoScreen
    },
    // 课程详情
    CourseDetail: {
      screen: CourseDetailScreen,
    },
    // 海报详情
    PosterDetail: {
      screen: PosterDetailScreen,
    },
    // 培训详情
    TrainDetail: {
      screen: TrainDetailScreen,
    },


    // 登录注册
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    // 订单结算
    Checkout: {
      screen: CheckoutScreen
    },
    OrderDetail: {
      screen: OrderDetailScreen
    },
    // 订单评价
    OrderComment: {
      screen: OrderCommentScreen
    },
    AfterSale: {
      screen: AfterSaleScreen
    },
    // 个人中心
    ...UserNavigator,
  },

  // 共享的导航样式
  {
    // initialRouteName: 'Tab',
    initialRouteName: 'Splash',
    //initialRouteName: 'Login',
    navigationOptions: {
      headerTitleStyle: {
        color: Color.medium,
        alignSelf:'center',
        fontSize: Font.small,
        fontWeight: 'normal',
      },
      headerStyle: {
        //backgroundColor: 'gray',
      },
    },
  },
);

class TopLevelNavigator extends React.Component {
  render() {
    return(
      <RootNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    )
  }
};

export default TopLevelNavigator;
