/*
 * Created by Saul at 2018/06/01
 *
 * 购物车头部
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Color, Layout, Font, Space } from '../../../constants'
import { calcTotalPrice } from '../reducer/actions'


class Header extends React.Component {
  static defaultProps = {
    isShowCartManagement: false,
    onToggleManagementShow: () => {}
  }

  render() {
    const {
      itemAmount,
      onToggleManagementShow,
      isShowCartManagement
    } = this.props
    return(
      <View style={ styles.headerContainer }>
        <View
          style={ styles.headerTitleContainer }>
          <Text style={ styles.headerTitleText }>
            购物车({ itemAmount })
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onToggleManagementShow()
          }}
          style={ styles.headerRightContainer }
        >
          <Text style={ styles.headerRightText }>
            {
              isShowCartManagement ? '完成': '管理'
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const headerRightWidth = 80

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    // backgroundColor: Color.primary,
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDark,
    height: Platform.OS === 'ios' ? 70 : 50,
    flexDirection: 'row'
  },
  headerTitleContainer: {
    paddingBottom: 0,
    marginLeft: headerRightWidth,
    justifyContent: 'center',
    flex: 1
  },
  headerRightContainer: {
    // backgroundColor: '#999',
    width: headerRightWidth,
    justifyContent: 'center',
  },
  headerTitleText: {
    textAlign: 'center',
    fontSize: Font.medium,
    color: Color.white
  },
  headerRightText: {
    textAlign: 'center',
    fontSize: Font.small,
    color: Color.white
  }
})

const mapStateToProps = state => {
  const { cartState } = state
  return {
    itemAmount: cartState.itemAmount,
  }
}

export default connect(mapStateToProps)(Header)
