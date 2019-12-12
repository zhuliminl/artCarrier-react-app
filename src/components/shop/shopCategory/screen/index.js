/*
 * Created by gyfhml at 2018/06/06
 *
 * 店铺主页，也即供应商主页
 *
 */

import React from 'react'
import {
  View,
  Text, Alert
} from 'react-native';
import ShopCategory from '../ShopCategory.js';

export default class ShopCategoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '店铺分类',
    }
  }
  render() {
    return (
      <ShopCategory data={ this.props.navigation.getParam('data', '')}
                    navigation={this.props.navigation}
      />
    )
  }
}
