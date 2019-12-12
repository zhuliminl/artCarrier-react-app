/*
 * Created by Saul at 2018/05/22
 *
 * 培训列表
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
import DynamicList from '../../../common/dynamicList'
import ListItem from './listItem';
import SearchBar from '../../../common/searchBar'
import CategoryModal from '../../../common/category'

class CourseList extends React.Component {
  state = {
    routerPath: '/training',
    requestParams: null,

    categoryType: 'training'
  }

  handleFetchMorePageWithParams = (key, value) => {
    this.setState({
      requestParams: {
        [key] : value,
      }
    })
  }

  handleOnSearch = (searchText) => {
    let key = 'training_title'
    let value = searchText
    this.handleFetchMorePageWithParams(key, value)
  }

  handleOnSearchByCategory = (categoryId) => {
    let key = 'classes'
    let value = categoryId
    this.handleFetchMorePageWithParams(key, value)
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
