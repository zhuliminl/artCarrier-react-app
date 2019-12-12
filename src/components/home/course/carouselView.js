/*
 * Created by gyfhml at 18-6-14
 *
 * 轮播图
 *
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image, Alert
} from 'react-native';
import Toast from '../../common/toast'
import { Layout, Color } from '../../../constants';
import EZSwiper from 'react-native-ezswiper';
import api from "../../../utils/api";

export default class CarouselView extends Component<{}> {
  constructor(props) {
    super(props)
    this.state={
      bannerSource:'',
    }
  }

  renderTitle(title){
    return <Text style={{backgroundColor:'white'}}>{title}</Text>
  }

  renderRow(obj, index) {
    return (
      <View style={[styles.cell]}>
        <Image
          style={{position:'absolute',top:0,right:0,bottom:0,left:0,width: undefined, height: undefined,flex:1}}
          resizeMode={'contain'}
          source={{uri:obj?obj.img.split(',')[0]:'http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg'}}/>
      </View>
    )
  }

  renderImageRow(obj, index) {
    return (
      <View style={[styles.cell,{overflow:'hidden'}]}>
        <Image
          style={{position:'absolute',top:0,right:0,bottom:0,left:0,width: undefined, height: undefined}}
          resizeMode={'contain'}
          source={{uri:obj?obj.img.split(',')[0]:'http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg'}}/>
        <Text style={{backgroundColor:'transparent',color:'white'}}>{'Victoria\'s Secre ' + index}</Text>

      </View>
    )
  }

  onPressRow = (obj, index) => {
    const courseId = obj.id
    const courseTitle = obj.title
    const { navigation } = this.props
    navigation.navigate('CourseDetail', { courseId, courseTitle })
  }

  onWillChange(obj, index) {
    console.log('onWillChange=>obj:'+ obj + ' ,index:' + index);
    // alert('onWillChange=>obj:'+ obj + ' ,index:' + index);
  }

  onDidChange(obj, index) {
    console.log('onDidChange=>obj:'+ obj + ' ,index:' + index);
    // alert('onDidChange=>obj:'+ obj + ' ,index:' + index);
  }
  componentDidMount = () => {
    this.getBannerSource();
  }
  //获取商品分类
  getBannerSource = async () => {
    try {
      const response = await api.get('/course/random', {
        params: {
          count: 5,
        }
      });
      if (response.data.result === 'ok') {
        let bannerSource = response.data.data;
        console.log('bannerSource',bannerSource)
        this.setState({
          bannerSource
        })

      }

    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        return Toast.show('请求错误')
      }
      return Toast.show('网络有点小错误，稍后再试试')
    }
  }
  render() {
    return (
      <View style={[styles.container]} contentInsetAdjustmentBehavior="automatic">
        <EZSwiper
          style={[styles.swiper,{width: Layout.window.width - 85,height: 150,marginHorizontal:40 }]}
                  dataSource={this.state.bannerSource}
                  width={ Layout.window.width - 85}
                  height={150 }
                  renderRow={this.renderRow}
                  onPress={this.onPressRow}
                  ratio={0.867}
                  loop={true}
                  index={1}
                  autoplayTimeout={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: Color.homeBgDeep,
    backgroundColor: Color.homeBgDark,
    // backgroundColor: 'white',
  },
  swiper: {
    backgroundColor: Color.homeBgDark,
    // backgroundColor: 'white',
  },
  cell: {
    backgroundColor: Color.homeBgDark,
    // backgroundColor: 'white',
    // backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
