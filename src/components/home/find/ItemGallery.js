/*
 * Created by Saul at 2018/07/06
 *
 * 商品画廊
 *
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from "react-native";
import MasonryList from '@appandflow/masonry-list';
import PlacehoderImage from './placeholderImage';
import { Color, Space, Layout } from '../../../constants'
import api from '../../../utils/api'
import Toast from '../../common/toast'

const itemWidth = (Layout.window.width - 16) / 2 - 5

class ItemGallery extends React.Component {
  constructor(props) {
    super(props)
    const { categoryId } = this.props
    this.state = {
      page: 1,
      loading: false,
      categoryId: categoryId,
      items: []
    }
  }

  componentDidMount = () => {
    const { categoryId } = this.state
    const { isFromRecommendTab } = this.props
    if(isFromRecommendTab) {
      return this.fetchAllItems()
    }
    this.fetchItemsByCategory(categoryId)

  }

  fetchItemsByCategory = async (categoryId) => {
    try {
      const response = await api.get('/item', {
        params: {
          classes: categoryId
          // 默认第一页
        }
      })
      const rawItemsData = response.data.data
      this.setItemsData(rawItemsData)
    } catch (error) {
      return Toast.show('网络有点小问题哦')
    }
  }

  // 请求推荐标签下的数据
  fetchAllItems = async () => {
    try {
      const response = await api.get('/item')
      const itemsData = response.data.data


      this.setItemsData(itemsData)
    } catch (error) {
      return Toast.show('网络有点小问题哦')
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const preItems = this.state.items
    const nextItems = nextState.items
    // 前后数据有变动则允许重新渲染
    if(preItems.length !== nextItems.length) return true
    return false
  }

  // 储存列表数据
  setItemsData = (data) => {

    // 客户上传的图片尺寸太大，暂时取出的宽高没什么意义
    // for (let i in data.rows) {
      // Image.getSize(data.rows[i].main_images.split(',')[0], (width, height) => {
        // data.rows[i].width = width;
        // data.rows[i].height = height;
      // });
    // }

    this.setState({
      maxPage: data['maxPage'],
      count: data['count'],
      page: data['page'],
      pageSize: data['pageSize'],
      items: data['rows']
    })
  }

  // 底部拉取
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
      loading: true
    }, () => {
      this.fetchMorePage();
    })
  }

  // 请求更多的数据
  fetchMorePage = async () => {
    const { page } = this.state
    if(this.state.page > this.state.maxPage) {
      return console.log('到达最大页数')
    }
    try {
      let response;
      const { isFromRecommendTab, categoryId } = this.props
      if(isFromRecommendTab) {
        response = await api.get('/item', {
          params: {
            page: this.state.page
          }
        })
      } else {
        response = await api.get('/item', {
          params: {
            classes: categoryId,
            page: this.state.page
          }
        })
      }

      const newItemsData = response.data.data
    } catch(error) {
      this.setState({
        loading: false
      })
      return Toast.show('网络有点小错误呢')
    }
  }

  _keyExtractor = (item, index) => {
    return index.toString();
  }

  _onPressContent = (item) => {
    this.props.navigation.navigate('GoodDetail', {
      goodId: item.item_id,
      good: item,
      goodName: item.title
    });
  }

  // 获取项的高度
  _getHeightForItem = ({item}) => {
    if (item.width && item.height) {
      // console.log('=====>>>>>获取到 item 的尺寸', );
      return Math.max(itemWidth, itemWidth / item.width * item.height);
    } else {
      return itemWidth
    }
  }
  // 获得图片的比例系数
  getItemImgDimensionProportion = (item) => {
    // 部分图片无法获得比例系数
    // return item.width / item.height
    // 暂时返回客户常用的比例系数
    return 2192 / 3508
  }

  _renderItem = ({item}) => {
    const itemHeight = this._getHeightForItem({item})
    const imgProportion = this.getItemImgDimensionProportion(item)
    // console.log('=====>>>>>imgPro', imgProportion);
    if (item) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this._onPressContent(item)}
          style={styles.item}
        >
          <PlacehoderImage
            source={{
              uri: item.main_images ?
                item.main_images.split(',')[0]
              : "https://www.w3schools.com/Html/img_girl.jpg"
            }}
            placeholder={{uri: 'placeholder'}}
            style={{
              // 按照客户长传的尺寸处理，不要瀑布流了
              width: itemWidth,
              height: itemHeight * imgProportion,

              // width: 200,
              // height: 200,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
          <View style={styles.itemText}>
            <Text style={{
              maxWidth: Layout.window.width / 2,
              color: Color.homeTitlePrimary
            }}>
              {item.title}
            </Text>
            <Text style={styles.itemFooter}>
              {/* 
              <Text style={{color: Color.homeTitleSecondary}}>￥</Text>
              <Text style={{color: Color.primary}}>{item.current_price}</Text>
                */}
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return null;
    }
  }


  render() {
    console.log('=====>>>>>this.state.items', this.state.items);
    return(
      <SafeAreaView style={styles.container}>
        <MasonryList
          data={this.state.items}
          numColumns={2}
          renderItem={this._renderItem}
          getHeightForItem={this._getHeightForItem}
          // refreshing={this.state.refreshing}
          // onRefresh={this.onRefreshing}
          onEndReachedThreshold={0.1}
          // onEndReached={this._onEndReached}
          keyExtractor={this._keyExtractor}
          // ListHeaderComponent={this._ListHeaderComponent}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? (Layout.window.height - 200) : (Layout.window.height - 100),
    paddingHorizontal: 5,
    // height: 100,
    backgroundColor: Color.homeBgDark
  },
  item: {
    margin: 4,
  },
  itemFooter: {
    padding: Space.tiny,
  },
  itemText: {
    paddingLeft: 5,
    backgroundColor: Color.homeBgDeep,
    // backgroundColor: Color.homeBgLight,
    // backgroundColor: Color.white,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  bannerImage: {
    width: Layout.window.width,
    height: 160
  }
})

export default ItemGallery;
