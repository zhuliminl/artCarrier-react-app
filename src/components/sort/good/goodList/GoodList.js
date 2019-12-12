/*
 * Created by Saul at 2018/05/22
 *
 * 商品列表
 *
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../../constants';
import api from '../../../../utils/api';
import DefaultPage from '../../../common/defaultPage';
import Toast from '../../../common/toast'

import ListItem from './listItem';
import DynamicList from '../../../common/dynamicList'
import SearchBar from '../../../common/searchBar'
import ToggleCompositionWidget from './toggleCompositionWidget';
import CategoryModal from '../../../common/category'

class GoodList extends React.Component {
  state = {
    compositionStyle: 'row',
    routerPath: '/item',
    requestParams: null,

    categoryType: 'item'
  }

   // 切换排列风格
  handleToggleCompositionClick = () => {
    if(this.state.compositionStyle === 'row') {
      return this.setState({
        compositionStyle: 'column'
      })
    }
    this.setState({
      compositionStyle: 'row'
    })
  }

  // 发起带参数的请求。本函数可以挂载到 ListHeader 上作为回调使用。从而实现分类和搜索的功能
  handleFetchMorePageWithParams = (key, value) => {
    // 在本函数内动态改变请求参数，从而获取对应的分页内容
    this.setState({
      requestParams: {
        [key] : value,
      }
    })
  }

  // 将来可能会有多组参数
  handleOnSearch = (searchText) => {
    // console.log('触发搜索')
    // 设定相应路由的参数键值对
    let key = 'item_name'
    let value = searchText
    this.handleFetchMorePageWithParams(key, value)
  }

  // categoryId: Number
  handleOnSearchByCategory = (categoryId) => {
    let key = 'classes'
    let value = categoryId
    this.handleFetchMorePageWithParams(key, value)
    // console.log('=====>>>>>按分类搜索', categoryId);
  }

  // 旧版本的列表头，需要融合到新版本
  renderHeader = () => {
    // console.log('render header', this.state)
    return (
      <View style={ styles.headerContainer }>
        {/* 分类模态窗 */}
        <CategoryModal
          categoryType={this.state.categoryType}
          onSearchByCategory={this.handleOnSearchByCategory}
        />
        <SearchBar
          onSearch={ this.handleOnSearch }
          placeholder="请输入搜索内容" />

        {/*
        <ToggleCompositionWidget
          compositionStyle={ this.state.compositionStyle }
          onToggleComposition={ this.handleToggleCompositionClick }
        />
        */}

      </View>
    )
  }

  render() {
    return(
      <DynamicList
        compositionStyle={ this.state.compositionStyle }
        requestParams={ this.state.requestParams }
        routerPath={ this.state.routerPath }
        renderListHeader={this.renderHeader}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              good={ item }
              index={ index }
            />
          )
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: Layout.window.width,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default GoodList;
