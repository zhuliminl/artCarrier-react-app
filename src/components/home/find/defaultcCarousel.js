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
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Layout, Color } from '../../../constants';
import { Carousel } from 'antd-mobile';
import api from "../../../utils/api";
import Toast from '../../common/toast'

export default class DefaultCarouselView extends Component<{}> {
  state = {
    posterSource:['http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg','http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg','http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg'],
    imgHeight: 176,
  }
  //获取海报信息
  getposterSource = async () => {
    try {
      const response = await api.get('/poster/latestInsert', {
        params: {
          count:3,
        }
      });
      if (response.data.result === 'ok') {
        let posterSource = response.data.data;
        this.setState({
          posterSource
        })

      }

    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        return Toast.show('请求错误')
      }
      return Toast.show('网络有点小错误，待会再试试')
    }
  }
  componentDidMount() {
    this.getposterSource()
  }
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          autoplay={true}
          infinite
        >
          {this.state.posterSource?this.state.posterSource.map((item,index) => (
            <TouchableOpacity
              onPress={() => {
                const id = item.id
                const { navigation } = this.props
                navigation.navigate('PosterDetail', {
                  courseId: id
                })
              }}
              key={item.id+index}
              style={{width: Layout.window.width, height: this.state.imgHeight }}
            >
              <Image
                source={{uri:item.img? item.img:'http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg'}}
                style={{ width: Layout.window.width,height:this.state.imgHeight}}
              />
            </TouchableOpacity>
          )):null}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.homeBgDeep,
    flex: 1,
  },
  swiper: {
    backgroundColor: 'white',
  },
  cell: {
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
