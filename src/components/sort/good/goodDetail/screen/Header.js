/*
 * Created by gyfhml at 2018/05/29
 *
 * 商品详情导航
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Color, Font, Space, Layout
} from '../../../../../constants'
import GotoCart from '../GotoCart'


class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onLiked: PropTypes.func,
    onShared: PropTypes.func,
    navigation: PropTypes.object,
  }

  static defaultProps = {
    title: '商品详情',
    navigation: () => {},
    onLiked: () => {},
    onShared: () => {},
  }

  state = {
    isLiked: false
  }

  // 反转收藏状态，并发出请求
  toggleIsLiked = () => {
    this.setState({
      isLiked: ! this.state.isLiked
    },
      () => {
        // 需要根据 state 的当前状态决定发送哪一个请求
        this.props.toggleLike(this.state.isLiked)
      }
    )
  }



  render() {
    const { title, navigation, onShared } = this.props
    const { isLiked } = this.state
    return(
      <View style={ styles.headerContainer } >
        <View style={ styles.headerInnerContainer }>
          {/* 返回按钮 */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Image
              style={ styles.backImage }
              source={ require('../../../../../assets/icon/back.png') }
            />
          </TouchableOpacity>
          {/* 标题 */}
          <View style={ styles.headerTitleContainer }>
            <Text
              style={ styles.headerTitleText }
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              { title }
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.toggleIsLiked()
            }}
          >
            <Image
              style={ styles.likedImage }
              source={
                isLiked
                  ? require('../../../../../assets/icon/sort/liked.png')
                  : require('../../../../../assets/icon/sort/like.png')
              }
            />
          </TouchableOpacity>
          {/* 去购物车 */}
          <GotoCart
            navigation={ this.props.navigation }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  },
  headerInnerContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'

  },
  backImage: {
    width: 30,
    height: 30
  },
  likedImage: {
    marginLeft: 10,
    width: 30,
    height: 30
  },
  headerTitleContainer: {
    width: Layout.window.width - 200
  },
  headerTitleText: {
    fontSize: 18,
    color: Color.white,
  }
})

export default Header;
