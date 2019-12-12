/*
 * Created by gyfhml at 18-5-14
 *
 * 我的足迹
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
import { Button as AntdBtn} from 'antd-mobile';
import DefaultPage from '../../common/defaultPage';
import {
  Font, Color, Space, Layout,
} from '../../../constants';
import api from "../../../utils/api";
import Toast from '../../common/toast';

export default  class Track extends React.Component {
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
  async getdata(){
    try {
      const response = await api.get('/track',{
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
  componentDidMount(){
    this.getdata();
  }
  async deleteTrackItem(id){
    try {
      const response = await api.delete('/track/'+id);
      if(response.data.result==='ok'){
        //console.log(response.data.result)
        this.getdata();
        Toast.show('删除成功', Toast.LONG)
      }else{
        Alert.alert('删除失败')
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
  _keyExtractor = (item, index) => item.id.toString();
  _renderItem = ({item}) => (
    <View style={styles.trackItem} key={item.id}>
      <View>
        {item.item_img?<Image style={styles.trackItemImg} source={{uri:item.item_img}}/>:
          <Text style={styles.trackItemImg}></Text>}
      </View>
      <View style={styles.trackItemRight}>
        <Text style={styles.trackItemDesc}>{item.item_name}</Text>
        <View style={styles.contrl}>
          <Text style={styles.warn}>￥{item.item_price}</Text>
          <AntdBtn style={styles.deleteBtn}  onClick={this.deleteTrackItem.bind(this,item.id)}>
            <Text style={styles.warn}>删除</Text>
          </AntdBtn>
        </View>
      </View>
    </View>
  );
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
      const response = await api.get('/track',{
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
      }, () => {
        // console.log('data after', this.state.data)
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
          // 只渲染底部提示，不打扰用户
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
    if (this.state.data.length===0) {
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
  container:{

  },
  innerWrapper:{
    height: Layout.window.height -90,
    backgroundColor:'transparent'
  },
  trackItem:{
    flexDirection:'row',
    flexWrap:'nowrap',
    padding:Space.small,
    backgroundColor:Color.white,
    marginBottom:Space.tiny,
    borderBottomColor:Color.tabIconDefault,
    borderBottomWidth:1,
    borderStyle:'solid',
  },
  trackItemImg:{
    width:100,
    height:100,
    borderRadius:5
  },
  trackItemRight:{
    height:100,
    width:Layout.window.width-100,
    padding:Space.small,
    flexDirection:'column'
  },
  trackItemDesc:{
    height:60,
    overflow: 'hidden',
  },
  contrl:{
    flexDirection:'row',
    flexWrap:'nowrap',
    height:30,
    alignItems:'center',
    justifyContent:'space-between',
  },
  warn:{
    color:Color.errorBackground,
    fontSize:Font.small
  },
  deleteBtn:{
    borderWidth:0,
    height:20
  }
});
