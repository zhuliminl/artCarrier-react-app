/*
 * Created by gyfhml at 18-5-14
 *
 * 我的收藏
 *
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image, Alert,
  FlatList,
  ActivityIndicator
} from 'react-native';

import DefaultPage from '../../common/defaultPage';
import {
  Font, Color, Space, Layout,GlobalStyle
} from '../../../constants';
import ModalTester  from './likeModal';
import api from "../../../utils/api";
import Toast from '../../common/toast'
export default  class Collection extends React.Component {
  constructor(){
    super();
    this.state={
      data:[],
      maxPage:'',
      loading: false,
      page:1,
      error: {
        type: '',
        message: ''
      },
      requestParams: {
      },
      refreshing: false,
    }

  }
  cancelCollection = async(id)=>{
    try {
      const response = await api.delete('/collection/'+id);
      if(response.data.result==='ok'){
         this.getdata();
        Toast.show('取消成功', Toast.LONG)
      }else{
        Alert.alert('取消失败')
      }
    } catch(error) {
      console.log('error trigger', error)
      if(error.data) {
        // 处理业务请求错误
        return Alert.alert('请求错误')
      }
      Alert.alert('网络错误')
    }
  }
  async getdata(){
    try {
      const response = await api.get('/collection',{
        params: {
          page:1,
          ...this.state.requestParams
        }
      });
      this.setState({
        data:response.data.data.rows,
        maxPage:response.data.data.maxPage
      })
    } catch(error) {
      if(error.data) {
        const data = error.data.data;
        const message = data.message
        return this.setState({
          error: {
            type: 'request error',
            message
          }
        },() => {
          // 只渲染底部提示，不打扰用户
          Alert.alert(this.state.error.message);
        })
      }
      Alert.alert('网络错误')
    }
  }
  componentDidMount() {
    this.getdata();
  }
  _keyExtractor = (item) => item.id.toString();
  _renderItem = ({item}) => (
    <View style={styles.collectionItem} key={item.id}>
      <View>
        <Image style={styles.collectionImg} source={{uri:item.item_img}}/>
      </View>
      <View style={styles.collectionRight}>
        <View>
          <View style={styles.collectionItemDesc}>
            <View style={styles.descWrapper}>
              <Text style={styles.warn}>系列课</Text>
            </View>
            <Text numberOfLines={3}
                  ellipsizeMode='tail'
                  style={styles.desc}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.item_name}
            </Text>
          </View>
          <Text style={styles.price}>￥{item.item_price}</Text>
        </View>
        <View style={styles.control}>
          <ModalTester cancelCollection={this.cancelCollection} itemId={item.id}/>
        </View>
      </View>
    </View>
  )
  renderFooter = () => {
    if(this.state.error.type === 'request error' || this.state.page > this.state.maxPage) {
      return (
        <View>
          <Text style={{ textAlign: 'center',lineHeight:30 }}>
            没有更多的数据
          </Text>
        </View>
      )
    }
    if(this.state.loading) {
      return (
        <View>
          <ActivityIndicator
            animating
            size="large"
            color={ Color.primary }
          />
        </View>
      )
    }
    return null
  }

  // 请求新的列表数据
  getMoreData = async () => {
    const { page, requestParams } = this.state;
    // 比较当前页和总页数，停止错误请求的发出
    if(this.state.page > this.state.maxPage) {
      return console.log('到达最大页数')
    }
    try {
      const response = await api.get('/collection',{
        params: {
          user_id: 1,
          page,
          ...this.state.requestParams
        }
      });
      const data = response.data.data || {};
      const newList = data.rows || [];
      // 添加新的列表数据到列表底部
      this.setState({
        data: this.state.data.concat(newList),
        loading: false,
        refreshing: false
      })

    } catch(error) {
      console.log('trigger error', error)
      this.setState({
        loading: false
      })

      // 请求边界错误
      if(error.data) {
        const data = error.data.data;
        const message = data.message

        return this.setState({
          error: {
            type: 'request error',
            message
          }
        },() => {
          Alert.alert(this.state.error.message);
        })
      }

      // 网络错误
      this.setState({
        error: {
          type: 'network error',
          message: '网络请求错误'
        }
      })
    }
  }
  // 底部拉取
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
      loading: true
    }, () => {
      this.getMoreData();
    });
  }
  onRefresh = () => {
    console.log('trigger onRefresh')
  }
  render() {
    if (this.state.data.length<=0) {
      return (
        <View>
          <DefaultPage message={'暂无消息'}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.innerWrapper}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ListFooterComponent={ this.renderFooter }
              onEndReached={({ distanceFromEnd }) => {
                this.handleLoadMore();
              }}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              onEndReachedThreshold={0.01}
            />
          </View>
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  collectionItem:{
    flexDirection:'row',
    flexWrap:'nowrap',
    padding:Space.small,
    backgroundColor:Color.white,
    marginBottom:Space.tiny,
    borderBottomColor:Color.tabIconDefault,
    borderBottomWidth:1,
    borderStyle:'solid'
  },
  collectionImg:{
    width:110,
    height:80,
    borderRadius:5
  },
  collectionRight:{
    width:Layout.window.width-110,
    padding:Space.small,
    paddingBottom:0,
    flexDirection:'row',
    flexWrap:'nowrap'
  },
  collectionItemDesc:{
    width:Layout.window.width-180,
    height:50,
    backgroundColor:Color.white,
    alignContent:'space-between',
    position:'relative',
    overflow:'hidden' ,
  },
  descWrapper:{
    position:'absolute',
    left:0,
    right:0,
    width:46,
    height:18,
    borderWidth:1,
    borderColor:Color.errorBackground,
    borderStyle:'solid',
    borderRadius:4,
    overflow:'hidden'
  },
  warn:{
    color:Color.errorBackground,
    fontSize:Font.tiny,
    textAlign:'center',
    backgroundColor:Color.bg,
    flexDirection:'row',
    height:14
  },
  control:{
    flexGrow:1,
    ...GlobalStyle.center,
  },
  price:{
    color:Color.errorBackground,
    fontSize:Font.small,
    marginTop:5,
  }

});
