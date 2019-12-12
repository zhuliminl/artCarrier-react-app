/*
 * Created by Saul at 2018/05/22
 *
 * 课程列表
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
  Alert,
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../../constants';
import api from '../../../../utils/api';
import DefaultPage from '../../../common/defaultPage';
import DynamicList from '../../../common/dynamicList'

import ListItem from './listItem';
import SearchBar from '../../../common/searchBar'
// import CategoryModal from './CategoryModal'
// import CategoryModal from './category'
import CategoryModal from '../../../common/category'

class CourseList extends React.Component {
  state = {
    routerPath: '/course',
    requestParams: null,

    // 对谁进行分类？ 可能是课程，可能是商品，还可能是海报
    categoryType: 'course'
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
    let key = 'course_title'
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

  render() {
    return (
      <DynamicList
        requestParams={ this.state.requestParams }
        routerPath={ this.state.routerPath }
        renderListHeader={ () => (
          <View
            style={{
              // backgroundColor: '#999',
              flexDirection: 'row'
            }}
          >
            {/* 分类模态窗 */}
            <CategoryModal
              categoryType={this.state.categoryType}
              onSearchByCategory={this.handleOnSearchByCategory}
            />
            {/* 搜索 */}
            <SearchBar
              placeholder="请输入搜索内容..."
              onSearch={ this.handleOnSearch }
            />
          </View>
        ) }
        renderItem={({ item, index }) => {
          return (
            <ListItem
              course={ item }
              index={ index }
            />
          )
        }}
      />
    )
  }
}

export default CourseList;
