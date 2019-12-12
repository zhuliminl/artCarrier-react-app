/*
 * Created by Saul at 2018/05/05
 *
 * 订单的入口
 *
 */

import React from 'react';
import {
  View, Text, Image, StyleSheet
} from 'react-native';
import {
  Font, Color, Space
} from '../../../constants';
import { Grid } from 'antd-mobile';
import TouchableItem from '../../../utils/TouchableItem';
import NavigationService from '../../../navigation/NavigationService';


const orderTabConfig = [
  {
    name: '全部订单',
    icon: 'order',
    iconUrl: require('../../../assets/icon/user/order.png')
  },
  {
    name: '待付款',
    icon: 'order',
    iconUrl: require('../../../assets/icon/user/pay.png')

  },
  {
    name: '待发货',
    icon: 'order',
    iconUrl: require('../../../assets/icon/user/send.png')
  },
  {
    name: '待收货',
    icon: 'order',
    iconUrl: require('../../../assets/icon/user/receive.png')
  },
  {
    name: '已完成',
    icon: 'order',
    iconUrl: require('../../../assets/icon/user/appraise.png')
  },
  // {
    // name: '待评价',
    // icon: 'order',
    // iconUrl: require('../../../assets/icon/user/appraise.png')
  // },
];

class OrderEntry extends React.Component {

  render() {
    return(
      <View style={ styles.orderContainer } >
        <Text style={ styles.title } >
          我的订单
        </Text>
        <Grid
          renderItem={(dataItem) => (
            <TouchableItem
              onPress={ () => {
                console.log('order item is pressed with opacity');
                NavigationService.navigate('Order');

              } }
            >
              <View style={ styles.orderItem } >
                <Text style={ styles.orderItemText } >
                  { dataItem.name }
                </Text>
                <Image
                  style={ styles.icon }
                  source={ dataItem.iconUrl }
                />
              </View>
            </TouchableItem>
          )}
          data={ orderTabConfig }
          columnNum={5}
          hasLine={false}
          itemStyle={{
            // 必须重新声明高度，否则会使用默认的比较超出的高度
            height: 80
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  orderContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: Font.tiny,
    marginLeft: Space.small,
    marginBottom: Space.small,
    color: Color.white,
  },
  orderItem: {
    backgroundColor: Color.homeBgDeep,
    padding: Space.tiny,
    paddingTop: Space.medium,
    paddingBottom: Space.medium,
    alignItems: 'center'
  },
  orderItemText: {
    fontSize: Font.tiny,
    color: Color.white,
    marginBottom: Space.small
  },
  icon: {
    height: 20,
    width: 20
  }
})

export default OrderEntry;
