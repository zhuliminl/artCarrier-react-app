/*
 * Created by Saul at 2018/05/10
 *
 * 订单页面
 *
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Color } from '../../../../constants'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import UnPaidOrder from '../unPaidOrder'
import UnDeliveryOrder from '../unDeliveryOrder'
import UnReceivedOrder from '../unReceivedOrder'
// import UnCommentOrder from '../unCommentOrder'
import AchieveOrder from '../achieveOrder'

class OrderScreen extends React.Component {

  render() {
    return(
      <ScrollableTabView
        tabBarInactiveTextColor={ Color.medium }
        tabBarActiveTextColor={ Color.primary }
        tabBarUnderlineStyle={{
          backgroundColor: Color.primary,
          borderRadius: 4,
          height: 2
        }}
      >
        {/* 全部订单 */}

        {/*
        <View tabLabel="全部订单">
          <Text>
            订单
          </Text>
        </View>
        */}

        {/* 待付款 */}
        <View tabLabel="待付款">
          <UnPaidOrder
            navigation={ this.props.navigation }
          />
        </View>
        {/* 待发货 */}
        <View tabLabel="待发货">
          <UnDeliveryOrder
            navigation={ this.props.navigation }
          />
        </View>
        {/* 待收货 */}
        <View tabLabel="待收货">
          <UnReceivedOrder
            navigation={ this.props.navigation }
          />
        </View>
        {/* 已完成 */}
        <View tabLabel="已完成">
          <AchieveOrder
            navigation={ this.props.navigation }
          />
        </View>

        {/* 待评价
            待评价已经直接做到已完成模块去了
        <View tabLabel="待评价">
          <UnCommentOrder
            navigation={ this.props.navigation }
          />
        </View>
            */}
      </ScrollableTabView>
    )
  }
}

export default OrderScreen;
