/*
 * Created by qm06 at 18-6-13
 *
 * 消息中心
 *
 */

import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity} from 'react-native';
import DefaultPage from '../../common/defaultPage';
import SearchBar from '../../common/searchBar';
import Toast from '../../common/toast'

import {
  Font, Color, Space, Layout, GlobalStyle
} from '../../../constants';
import CarouselView from "./carouselView";
import api from "../../../utils/api";

export default class Course extends React.Component {
  constructor(){
    super();
    this.state={
      freeCourse:'',
      LatestEntryCourse:'',
      bannerSource:''
    }
  }
  handleOnSearch=()=>{
    console.log('search');
  }
  componentDidMount = () => {
    this.getFreeCourse();
    this.getLatestEntry();
    this.getBannerSource();
  }
  //获取banner
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
        // 处理业务请求错误
        return Toast.show('请求错误')
      }
      return Toast.show('网络有点小问题哦')
      // Alert.alert('网络错误')
    }
  }
  getFreeCourse = async () => {
    try {
      const response = await api.get('/course/minPrice', {
        params: {
          count: 5,
        }
      });
      if (response.data.result === 'ok') {
        let freeCourse = response.data.data;
        // console.log('getFreeCourse',freeCourse)
        this.setState({
          freeCourse
        })

      }

    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        // 处理业务请求错误
        return Toast.show('请求错误')
        // return Alert.alert('请求错误')
      }
      return Toast.show('网络有点小问题哦')
      // Alert.alert('网络错误')
    }
  }
  getLatestEntry=async()=>{
    try {
      const response = await api.get('/course/latestInsert', {
        params: {
          count: 5,
        }
      });
      if (response.data.result === 'ok') {
        let LatestEntryCourse = response.data.data;
        console.log('LatestEntryCourse',LatestEntryCourse)
        this.setState({
          LatestEntryCourse
        })

      }

    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        // 处理业务请求错误
        return Toast.show('请求错误')
        // return Alert.alert('请求错误')
      }
      return Toast.show('网络有点小问题哦')
      // Alert.alert('网络错误')
    }
  }

  handleCardPress = (params) =>{
    const { navigation } = this.props
    navigation.navigate('CourseDetail', params)
  }

  render() {

    let data = [1, 2, 3];
    if (!data || data.length === 0) {
      return (
        <View>
          <DefaultPage message={'暂无消息'}/>
        </View>
      )
    } else {
      return (
        <ScrollView
          style={styles.container}
        >
          <View style={styles.searchWrapper}>
            {/*
            <SearchBar
              placeholder="请输入搜索内容..."
              onSearch={this.handleOnSearch}
            />
            */}
          </View>
          <CarouselView
            bannerSource={this.state.bannerSource}
            navigation={ this.props.navigation }
          />
          <View style={styles.hotCommodities}>
            <Text style={styles.title}>热门精品</Text>
            <View
              style={styles.hotCommoditiesContent}>
              {/* 热门推荐 */}
              {
                this.state.bannerSource ?
                this.state.bannerSource.slice(0,3).map((item, i) => {
                  const imgURL = item.img.split(',')[0]
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        const courseId = item.id
                        const courseTitle = item.title
                        this.handleCardPress({ courseId, courseTitle })
                      }}
                    >
                      <Image
                        style={{
                          width: Layout.window.width,
                          height: 200,
                        }}
                        source={{
                          uri: imgURL
                        }}/>
                    </TouchableOpacity>
                  )
                })
                : null
              }
            </View>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.title}>最新入住</Text>
            <ScrollView horizontal={true}
            >
              {this.state.LatestEntryCourse?this.state.LatestEntryCourse.map((item,index)=>{
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const courseId = item.id
                      const courseTitle = item.title
                      this.handleCardPress({ courseId, courseTitle })
                    }}
                  >
                    <Image style={styles.Item}
                           source={{uri:item.img?item.img:'http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg'}}
                           key={index.toString()}
                    />
                  </TouchableOpacity>
                )
              }):null}
            </ScrollView>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.title}>免费课程</Text>
            <ScrollView
              horizontal={true}
              onScroll={() => {
                console.log('onScroll!')
              }}
            >
              {this.state.freeCourse?this.state.freeCourse.map((item,index)=>{
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const courseId = item.id
                      const courseTitle = item.title
                      this.handleCardPress({ courseId, courseTitle })
                    }}
                  >
                    <Image style={styles.Item}
                           source={{uri:item.img?item.img:'http://img.chslab.com:8780/img/Hk2L8XX8M.jpeg'}}
                           key={index.toString()}
                    />
                  </TouchableOpacity>
                )
              }):null}
            </ScrollView>
          </View>
        </ScrollView>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:Space.tiny,
    paddingRight:Space.tiny,
    // backgroundColor: Color.white,
    backgroundColor: Color.homeBgDark,
  },
  searchWrapper: {
    height:50,
  },
  title:{

    opacity: 0.8,
    fontSize:20,
    // color:"#000",
    color: Color.white,
    lineHeight:40
  },
  RankingItem:{
    flexDirection:'row',
    marginBottom:5,
  },
  Rankings:{
    marginRight:10,
  },
  RankingImage:{
    width:Layout.window.width/3,
    height:100,
  },
  RankingRight:{
    marginLeft:10
  },
  hotCommodities:{
  },
  hotCommoditiesContent:{
    // height:420,
  },
  itemWrapper:{
    marginBottom:10,
  },
  itemContent:{
    height:80,
    width:Layout.window.width,
    flexDirection:'row',
  },
  Item:{
    width:Layout.window.width/3-10,
    marginRight:10,
    height:80,
    borderRadius: 5,
  },
});
