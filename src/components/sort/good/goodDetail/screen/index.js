/*
 * Created by Saul at 2018/05/10
 *
 * 商品详情
 *
 */

import React from 'react';
import {View, Text, Alert} from 'react-native';
import  GoodDetail from '../GoodDetail';
import Header from './Header'
import api from "../../../../../utils/api";
import Toast from '../../../../common/toast'
class GoodDetailScreen extends React.Component {
  state = {
    goodId: '',
    good:''
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      header: params.header,
    }
  }

  componentWillMount = () => {
    // 在静态属性 navigationOptions 中配置 Header 时，如果想要在里面使用实例的方法，
    // 则需要在 ComponentWillMount 中设定参数传递
    this.setNavigationParams()

    // 从上个页面获取到 id，并储存到本组件
    this.setGoodId()
  }

  setNavigationParams = () => {
    const { navigation } = this.props
    const goodName = navigation.getParam('goodName', 'noop')
    // 顶部导航组件
    const header = (
      <Header
        title={ goodName }
        navigation={ navigation }
        toggleLike={ this.toggleLike }
      />
    )

    navigation.setParams({
      header
    })
  }
  // 存放商品 ID 到 本组件状态
  setGoodId = () => {
    const { navigation } = this.props
    const goodId = navigation.getParam('goodId', 'noop')
    const good= navigation.getParam('good', 'noop')
    console.log('************goodId',goodId)
    console.log('*************good',good)
    this.setState({
      goodId,
      good
    })
  }
  //取消收藏
  cancelCollection = async(id)=>{
    try {
      const response = await api.delete('/collection/'+id);
      if(response.data.result==='ok'){
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
  //添加收藏
  collection = async()=>{
    //console.log(this.state.good);
    let {item_id,main_images,name,current_price }=this.state.good;
    try {
      const response = await api.post('/collection/',{
        item_id,
        item_img:main_images,
        item_name:name,
        item_price:current_price
      });
      if(response.data.result==='ok'){
        Toast.show('收藏成功', Toast.LONG)
      }else{
        Alert.alert('收藏失败')
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
  // 处理收藏请求
   toggleLike = (isLiked)=>{
    if(!isLiked){
      this.cancelCollection(this.state.goodId);
    }else{
      this.collection();
    }

  }
  render() {
    return(
      <GoodDetail
        goodId={this.state.goodId}
        navigation={this.props.navigation}
      />
    )
  }
}

export default GoodDetailScreen;
