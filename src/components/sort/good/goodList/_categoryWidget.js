/*
 * Created by Saul at 2018/05/24
 *
 * 商品分类控件
 *
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import {
  Font, Color, Space
} from '../../../../constants';
import api from '../../../../utils/api';
import CategoryModal from './categoryModal';

class CategoryWidget extends React.Component {
  state = {
    isModalVisible: false,
    categoryList: []
  }

  static defaultProps = {
    onSearchByCategory: () => {}
  }

  // 反转模态窗
  handleOnToggleModal = () => {
    // console.log('展开分类模态窗')
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }


  /*
   * 重组后端的 category 扁平数据 到 前端结构化嵌套数据
   *
   * @param Array Flat
   * @return Array Structured
   */
  rearrangeCategory = (data) => {
    // 分别取出不同等级的数据
    const firstLevel = data.filter(item => item['pid1'] === '0' && item['pid2'] === '0')
    const secondLevel = data.filter(item => item['pid1'] !== '0' && item['pid2'] === '0')
    const thirdLevel = data.filter(item => item['pid1'] !== '0' && item['pid2'] !== '0')

    let category = []
    category = category.concat(firstLevel)

    // 根据 id 和 pid 的比对，逐个添加到特定的分类项目
    category.forEach((itemFirst, i) => {

      itemFirst.children = [];
      secondLevel.forEach((itemSecond, j) => {
        if(itemSecond['pid1'] === itemFirst['id'].toString()) {
          itemFirst.children.push(itemSecond);

          itemSecond.children = [];
          thirdLevel.forEach((itemThird, k) => {
            if(itemThird['pid1'] === itemSecond['id'].toString()) {
              itemSecond.children.push(itemThird);
            }
          });
        }
      });
    });
    return category;
  }

  componentDidMount = async () => {
    try {
      const response = await api.get('/category');
      const categoryData = response.data.data || {};

      // 重组分类数据到前端渲染需要的格式
      let categoryList = this.rearrangeCategory(categoryData)
      this.setState({
        categoryList
      });

    } catch(error) {
      return
      console.log('=====>>>>>category data', error);
      if(error.data) {
        return Alert.alert('请求错误, 未拿到分类数据');
      }
      return Alert.alert('网络错误, 未拿到分类数据');
    }
  }

  render() {
    const onSearchByCategory = this.props.onSearchByCategory
    return(
      <TouchableOpacity
        style={{
          paddingRight: 10
        }}
        onPress={() => {
          this.handleOnToggleModal()
        }}
      >
        <Text>
          分类
        </Text>
        <CategoryModal
          onSearchByCategory={ onSearchByCategory }
          isModalVisible={ this.state.isModalVisible }
          categoryList={ this.state.categoryList }
          onToggleModal={ this.handleOnToggleModal }/>
      </TouchableOpacity>
    )
  }
}

export default CategoryWidget;
