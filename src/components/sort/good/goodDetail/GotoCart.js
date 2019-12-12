/*
 * Created by Saul at 2018/07/12
 *
 * 立即跳转到购物车
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import {
  Font,
  Color,
  Space,
  Layout,
} from '../../../../constants';

class GodoCart extends React.Component {

  render() {
    return(
      <TouchableOpacity
        style={{
          marginLeft: 30,
        }}
        onPress={() => {
          this.props.navigation.navigate('购物车')
        }}
      >
        <Image
          style={{
            height: 25,
            width: 25,
          }}
          source={require('../../../../assets/icon/cart_white.png')}
        />
      </TouchableOpacity>
    )
  }
}

export default GodoCart;
