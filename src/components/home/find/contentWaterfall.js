import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from "react-native";
import MasonryList from '@appandflow/masonry-list';
import PlacehoderImage from './placeholderImage';
import {Color, Layout, Space} from '../../../constants';
import api from "../../../utils/api";
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import DefaultCarouselView from './defaultcCarousel'
import Toast from "../../common/toast";

const itemWidth = (Layout.window.width - 16) / 2 - 5

export default class ContentWaterfall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      page: 0,
      maxPage: 0,
      height: 200,//tab选项卡的高度,
      classes: '',
      classesId: ''//商品分类id

    }
    this.tabBarHandle = this.tabBarHandle.bind(this);
  }

  tabBarHandle = (obj) => {
    // console.log('obj.ref.key', obj.ref.key);
    if (obj.i !== 0) {
      const classesId = obj.ref.key.slice(4);
      this.setState({
        classesId: classesId,
        height: 90
      })
      this.getShopData(classesId)
    } else {
      this.setState({
        height: 230
      })
    }
  }
  _ListHeaderComponent = () => {
    return (
      <ScrollableTabView
        tabBarUnderlineStyle={{
          // backgroundColor: Color.primary
          backgroundColor: Color.homeUnderline
        }}
        style={{
          // marginTop: 20,
          height: this.state.height,
          backgroundColor: Color.homeBgLight,
        }}
        tabBarTextStyle={{
          color: Color.white
        }}
        initialPage={0}
        renderTabBar={() => <DefaultTabBar style={{ borderWidth: 0, height: 60 }}/>}
        // onChangeTab={this.tabBarHandle}
      >
        {/* 带有 tabLabel 标签的数组 node */}
        <View tabLabel={'推荐'}>
          <View style={{width: Layout.window.width, height: 200}}>
            <DefaultCarouselView
              navigation={ this.props.navigation }
            />
          </View>

        </View>
        {this.state.classes ? this.state.classes.map((item, index) => {
          // console.log('=====>>>>>tab', this.state);
          return (
            <View tabLabel={item.name} key={item.id}>
              <View style={{width: Layout.window.width, height: 200}}>
                {/*<DefaultCarouselView/>  */}
              </View>
            </View>
          )
        }) : null}
      </ScrollableTabView>
    )
  }
  componentDidMount = () => {
    this.getClass();
    this.onRefreshing();
  }
  //获取商品分类
  getClass = async () => {
    try {
      const response = await api.get('/classes/', {
        params: {
          type: 'item',
          id: 0,
          supplier_id: 0
        }
      });
      if (response.data.result === 'ok') {
        let classes = response.data.data;
        this.setState({
          classes
        })

      }
      // console.log('this.state.classes', this.state.classes)
    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        // 处理业务请求错误
        return Toast.show('请求错误')
        // return Alert.alert('请求错误')
      }
      return Toast.show('网络有点小问题哦, 等会再试试')
      // Alert.alert('网络错误')
    }
  }
  getShopData = async (classesId) => {
    try {
      this.setState({
        refreshing: true,
      })
      const response = await api.get('/item/', {
        params: {
          page: 1,
          classes: classesId ? classesId : null
        }
      });

      if (response.data.result === 'ok') {
        let data = response.data.data;
        for (let i in data.rows) {
          Image.getSize(data.rows[i].main_images.split(',')[0], (width, height) => {
            data.rows[i].width = width;
            data.rows[i].height = height;
          });
        }
        this.setState({
          refreshing: false,
          data: data.rows,
          page: 1,
          maxPage: data.maxPage
        })

      }

    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        // 处理业务请求错误
        return Toast.show('请求错误')
        // return Alert.alert('请求错误')
      }
      return Toast.show('网络有点小问题哦, 等会再试试')
    }
  }
  onRefreshing = async () => {
    this.getShopData();
  }

  _onEndReached = () => {
    if (this.state.page >= this.state.maxPage) {
      return;
    }
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.getMoreData(this.state.page);
    })


  }
  //下拉刷新
  getMoreData = async (page) => {
    // console.log('***************page', page)
    try {
      this.setState({
        refreshing: true,
      })
      const response = await api.get('/item/', {
        params: {
          page: page,
          classes: this.state.classesId ? this.state.classesId : null
        }
      });

      if (response.data.result === 'ok') {
        let data = response.data.data;
        for (let i in data.rows) {
          Image.getSize(data.rows[i].main_images.split(',')[0], (width, height) => {
            data.rows[i].width = width;
            data.rows[i].height = height;
          });
        }
        let oldData = this.state.data;
        let newData = oldData.concat(data.rows);
        // console.log('oldData', oldData);
        // console.log('data.rows', data.rows);
        this.setState({
          refreshing: false,
          data: newData,
          page: page,
          maxPage: data.maxPage
        })

      }

    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        return Toast.show('请求错误')
      }
      return Toast.show('网络有点小问题哦, 等会再试试')
    }
  }
  //渲染底部无数据状态
  renderFooter = () => {
    if (this.state.page > this.state.maxPage) {
      return (
        <View style={{justifyContent: 'center', height: 30}}>
          <Text style={{textAlign: 'center', lineHeight: 30}}>
            没有更多的数据
          </Text>
        </View>
      )
    } else {
      return (<View></View>)
    }
  }
  _keyExtractor = (item, index) => {
    return index.toString();
  }

  _getHeightForItem = ({item}) => {
    if (item.width && item.height) {
      return Math.max(itemWidth, itemWidth / item.width * item.height);
    } else {
      return itemWidth
    }

  }

  _renderItem = ({item}) => {
    const itemHeight = this._getHeightForItem({item})
    if (item) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this._onPressContent(item)}
          style={styles.item}
        >
          <PlacehoderImage
            source={{uri: item.main_images ? item.main_images.split(',')[0] : "121"}}
            placeholder={{uri: 'placeholder'}}
            style={{
              width: itemWidth,
              height: itemHeight,
              borderRadius: 4,
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
              <Text style={{color: Color.homeTitleSecondary}}>￥</Text>
              <Text style={{color: Color.primary}}>{item.current_price}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return null;
    }


  }

  _onPressContent = (item) => {
    this.props.navigation.navigate('GoodDetail', {
      goodId: item.item_id,
      good: item,
      goodName: item.title
    });
  }

  render() {
    const { data } = this.state
    console.log('=====>>>>>data', data);
    return (
      <SafeAreaView style={styles.container}>
        <MasonryList
          data={this.state.data}
          numColumns={2}
          renderItem={this._renderItem}
          getHeightForItem={this._getHeightForItem}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefreshing}
          onEndReachedThreshold={0.1}
          onEndReached={this._onEndReached}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._ListHeaderComponent}
        />
        {this.state.page >= this.state.maxPage ? this.renderFooter() : null}
      </SafeAreaView>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // backgroundColor: Color.homeBgDeep,
    backgroundColor: Color.homeBgLight,
    // backgroundColor: Color.white,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  bannerImage: {
    width: Layout.window.width,
    height: 160
  }
})

