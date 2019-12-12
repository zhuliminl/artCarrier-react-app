/*
 * Created by jemo on 2018-3-23.
 * 导航
 */

import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, GlobalStyle } from '../constants'

import HomeScreen from '../components/home/screen';
import SortScreen from '../components/sort/screen';
import CartScreen from '../components/cart/screen';
import UserScreen from '../components/user/screen';
import MediaScreen from '../components/media/screen';

import PlayerPanelInDock from '../components/media/PlayerPanelInDock'

import NavigationService from '../constants'


export default TabNavigator(
  {
    首页: { screen: HomeScreen },
    分类: { screen: SortScreen },
    媒体: {
      screen: MediaScreen,
    },
    购物车: { screen: CartScreen },
    我的: { screen: UserScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      // 在 App 主页面禁止返回手势操作
      gesturesEnabled: false,
      tabBarIcon: ({ focused, tintColor }) => {
        // console.log('TabNavigator`s navagation', navigation)
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === '首页') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === '分类') {
         iconName = 'format-list-bulleted';
        } else if (routeName === '媒体') {
          // 对于媒体中心，需要展示特殊的播放仪表盘入口
          return (<PlayerPanelInDock />)
        } else if (routeName === '附近') {
          iconName = 'map-marker-radius';
        } else if (routeName === '支付') {
          iconName = 'credit-card';
        } else if (routeName === '购物车') {
          iconName = `cart${focused ? '' : '-outline'}`;
        } else if (routeName === '我的') {
          iconName = `account${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <View>
            <Icon name={iconName} size={30} color={tintColor} />
            <Text
              style={{
                color: tintColor,
                textAlign: 'center',
                fontSize: 12,
              }}
            >
              { routeName }
            </Text>
          </View>
        )
        // return <Icon name={iconName} size={30} color={tintColor} />;
      },
    }),

    tabBarOptions: {
      // activeTintColor: 'tomato',
      showLabel: false,
      activeTintColor: Color.primary,
      inactiveTintColor: Color.grey,
      labelStyle: {
        fontSize: 12,
        marginTop: -4,
        marginBottom: 4,
      },
      style: {
        backgroundColor: Color.bg,
        height: 55,
      },
    },

    tabBarComponent: ({jumpToIndex, ...props, navigation}) => {
                        // 拦截底部导航的背景色，以达到动态改变背景色的目的
                        const backgroundColor = props.position.interpolate({
                          inputRange: [0, 1, 2, 3, 4],
                          outputRange: [
                            // 本来这里是用来实现底部导航动态，但是后期客户又要求统一用同一个底色
                            // 所以最后给出的颜色列表都是同一个色值
                            Color.homeBgDark,
                            Color.homeBgDark,
                            Color.homeBgDark,
                            Color.homeBgDark,
                            Color.homeBgDark,
                          ]
                        })
                        return (
                         <TabBarBottom
                             {...props}
                             style={{ backgroundColor: backgroundColor }}
                             jumpToIndex={index => {

                               // 由于独立于底部标签形式的路由会出现重复渲染，所以以下方案被弃用
                               // 代价则是目前的媒体播放页没有弹出升起的效果

                                 // 单独为媒体中心做导航处理，从而达到屏幕升起的效果。
                                 // 而且返回功能正常可用
                                 // if (index === 2) {
                                     // navigation.navigate('Media')
                                 // }
                                 // else {
                                     jumpToIndex(index)
                                 // }
                             }}
                         />
                       )
                      },
    swipeEnabled: false,
    tabBarPosition: 'bottom',
  }
);

const styles = StyleSheet.create({
  testText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

