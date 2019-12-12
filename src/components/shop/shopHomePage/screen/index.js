/*
 * Created by gyfhml at 2018/06/06
 *
 * 店铺主页，也即供应商主页
 *
 */

import React from 'react';
import ShopHomePage from '../ShopHomePage';
class ShopHomePageScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null,
    }
  }
  render() {
    return (
      <ShopHomePage navigation={this.props.navigation}/>
    )
  }
}

export default ShopHomePageScreen;
