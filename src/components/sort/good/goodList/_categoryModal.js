/*
 * Created by Saul at 2018/05/24
 *
 * 商品分类浮层模态窗
 *
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  Font, Color, Space, Layout
} from '../../../../constants';
import Modal from "react-native-modal";

// 三级菜单
class ThirdMenu extends React.Component {

  static defaultProps = {
    thirdLevelData: [],
    onSearchByCategory: () => {}
  }

  render() {
    const thirdLevelData = this.props.thirdLevelData;

    if(thirdLevelData.length === 0) {
      return null
    }

    return(
      <ScrollView style={ styles.thirdLevel } >
        {
          thirdLevelData.map((item, i) => {
            return (
              <TouchableOpacity
                style={ styles.thirdLevelItem }
                key={i}
                onPress={() => {
                  // console.log('取到分类 ID 数据，推入回调请求')
                  this.props.onSearchByCategory(item.id.toString())
                }}
              >
                <Text style={ styles.thirdLevelItemText } >{ item['name'] }</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    )
  }
}

// 二级菜单
class SecondMenu extends React.Component {

  state = {
    thirdLevelData: [],
    activeIndex: ''
  }

  static defaultProps = {
    secondLevelData: [],
    onShowThirdMenu: () => {},
    onSearchByCategory: () => {}
  }

  render() {
    const secondLevelData = this.props.secondLevelData;
    if(secondLevelData.length === 0) {
      return null
    }
    return(
      <View style={ styles.secondLevelContainer } >
        <ScrollView style={ styles.secondLevel } >
          {
            secondLevelData.map((item, i) => {
              return (
                <TouchableOpacity
                  style={ styles.secondLevelItem }
                  key={i}
                  onPress={() => {
                    this.props.onShowThirdMenu();
                    this.setState({
                      activeIndex: i,
                      thirdLevelData: item.children
                    })

                    // 如果是当前分类最后一级，则发出分类搜索请求
                    if(item.children.length === 0) {
                      this.props.onSearchByCategory(item.id.toString())
                    }

                  }}
                >
                  <Text
                    style={{
                      color: this.state.activeIndex === i ? Color.primary : Color.medium
                    }}
                  >{ item['name'] }</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        {
          this.props.showThirdMenu ?
            <ThirdMenu
              onSearchByCategory={ this.props.onSearchByCategory }
              thirdLevelData={ this.state.thirdLevelData }
            /> : null
        }

      </View>
    )
  }
}


// 菜单模态窗口
class CategoryModal extends React.Component {
  state = {
    showSecondMenu: false,
    showThirdMenu: false,
    secondLevelData: [],
    activeIndex: ''
  }

  static defaultProps = {
    onToggleModal: () => {},
    onSearchByCategory: () => {},
    categoryList: [],
  }

  // 当点击一级菜单的时候，默认关闭三级菜单的内容
  hideThirdMenu = () => {
    this.setState({
      showThirdMenu: false
    });
  }

  // 让二级菜单控制三级菜单的显示
  handleOnShowThirdMenu = () => {
    this.setState({
      showThirdMenu: true
    })
  }

  renderCategory = () => {
    const categoryList = this.props.categoryList;
    return (
      <View style={ styles.firstLevelContainer } >
        <ScrollView>
          {
            categoryList.map((item, i) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    padding: 12,
                    width: 100,
                    borderLeftWidth: this.state.activeIndex === i ? 3 : 0,
                    borderColor: 'red',
                    backgroundColor: this.state.activeIndex === i ? '#F5F6F7' : '#EEE'
                  }}
                  onPress={() => {
                    this.hideThirdMenu();
                    this.setState({
                      showSecondMenu: true,
                      secondLevelData: item.children,
                      activeIndex: i
                    })
                    // 如果当前分类是最后一级，则发出按分类搜索的请求
                    if(item.children.length === 0) {
                      this.props.onSearchByCategory(item.id.toString())
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: this.state.activeIndex === i ? Color.primary : Color.black
                    }}
                  >
                    { item['name'] }
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        {
          this.state.showSecondMenu ?
            <SecondMenu
              onSearchByCategory={ this.props.onSearchByCategory }
              showThirdMenu={ this.state.showThirdMenu }
              onShowThirdMenu={ this.handleOnShowThirdMenu }
              secondLevelData={ this.state.secondLevelData }
            /> : null
        }
      </View>
    )
  }

  render() {
    const categoryList = this.props.categoryList;

    if(categoryList.length === 0) {
      return null
    }

    return(
      <Modal
        style={ styles.modal }
        isVisible={this.props.isModalVisible}
        onBackdropPress={() => {
          this.props.onToggleModal();
        }}
      >
        <View style={ styles.menuContainer }>
        {/* 渲染分类等级, 一级、二级、三级 */}
        { this.renderCategory() }
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    paddingTop: 30,
    top: 100,
    margin: 0,
  },
  menuContainer: {
    paddingTop: 20,
    paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
    // 试图让分类一级级横向排列
    flexDirection: 'row'
  },
  firstLevelContainer: {
    height: 400,
    paddingTop: 20,
    borderRadius: 5,
    backgroundColor: '#EEE',
    flexDirection: 'row'
  },
  secondLevelContainer: {
    flexDirection: 'row'
  },
  secondLevel: {
    borderRadius: 5
  },
  secondLevelItem: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F5F6F7'
  },
  thirdLevel: {
    marginLeft: 10
  },
  thirdLevelItem: {
    padding: 10,
    backgroundColor: '#EEE'
  },
  thirdLevelItemText: {
    color: Color.medium
  }
})

export default CategoryModal;
