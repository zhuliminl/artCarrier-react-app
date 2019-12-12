/*
 * Created by gyfhml at 2018/06/06
 *
 * 店铺详情页，也即供应商主页
 *
 */

import React from 'react'
import {
  View,
  Text,
} from 'react-native';
import  ShopInfo from '../ShopInfo';
export default class ShopInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '店铺印象',
    };
  };
  state={
    data:''
  }
  componentWillMount() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', '');
    this.setState({
      data,
    })
  }
  render() {

    return (
      <ShopInfo data={this.state.data}/>
    )
  }
}


