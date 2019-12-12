/*
 * Created by Saul at 2018/06/01
 *
 * 购物车屏幕
 *
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Layout, Color } from '../../../constants'
import Header from './Header'
import CartList from '../CartList'
import CartCount from '../CartCount'
import CartManagement from '../cartManagement'

// import ScrollableTabBar from './ScrollableTabBar'

class CartScreen extends React.Component {
  state = {
    isShowCartManagement: false
  }

  handleOnToggleManagementShow = () => {
    this.setState({
      isShowCartManagement: !this.state.isShowCartManagement
    })
  }

  render() {
    return(
      <View style={ styles.container }>
        <Header
          isShowCartManagement={this.state.isShowCartManagement}
          onToggleManagementShow={this.handleOnToggleManagementShow}
        />
        {/* 测试可滑动标签页 */}
        {/*
        <ScrollableTabBar />
      */}
        <CartManagement
          isShowCartManagement={this.state.isShowCartManagement}
        />
        <CartList />
        <CartCount navigation={ this.props.navigation }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // backgroundColor: '#333',
    height: Platform.OS === 'ios' ? (Layout.window.height - 55) : (Layout.window.height - 72),
  }
})


export default CartScreen;
