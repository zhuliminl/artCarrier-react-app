/*
 * Created by Saul at 2018/06/25
 *
 * 分类页面
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
  Alert,
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../constants';
import api from '../../../utils/api';
import Modal from "react-native-modal";
import Loading from '../loading'
import SecondLevel from './SecondLevel'

// import { AndroidBackHandler } from '../../../utils/BackHandler.android'

class CategoryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      isLoadingFirstLevel: false,
      isLoadingSecondLevel: false,
      firstLevel: [],
      secondLevel: [],
      failInFetchSecondLevel: false,
      showBlankInBottom: true         // 让一级菜单的倒数两项也能产生滑动效果。需要填入空白高度
    }
  }

  componentDidMount = () => {
    if(!this.state.isVisible) {
      this.fetchFirstLevelMenu()
    }
  }


  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  fetchFirstLevelMenu = async () => {
    this.setState({isLoadingFirstLevel: true})
    try {
      const response = await api.get('/classes', {
        params: {
          type: this.props.categoryType,
          id: '0',
          supplier_id: '0'  // 平台是特殊的供应商，所以平台的分类请求需要带上 &supplier_id=0
        }
      })
      const firstLevelData = response.data.data
      this.setFirstLevelData(firstLevelData)
      // console.log('=====>>>>>data', data);
    } catch(error) {
      console.log('=====>>>>第一次请求分类数据出错', error);
    }
  }

  // data : Array
  setFirstLevelData = (data) => {
    this.setState({
      firstLevel: data,
      isLoadingFirstLevel: false
    },
      // 收到一级菜单数据后，紧接着发起对二级菜单数据的请求
      () => {
        this.fetchSecondLevel()
      }
    )
  }

  fetchSecondLevel = async () => {
    // console.log('=====>>>>>正在请求二菜单数据', );
    const { firstLevel } = this.state
    this.setState({ isLoadingSecondLevel: true })
    try {
      const secondLevelData = await Promise.all(
        firstLevel.map(async (item, i) => {
          const response = await api.get('/classes', {
            params: {
              type: this.props.categoryType,
              id: item.id.toString(),
              supplier_id: '0'
            }
          })
          const data = response.data.data
          const secondLevelDataItem = {
            data,
            title: item.name,
            // 位置暂时为空
            positionY: ''
          }
          return secondLevelDataItem
        })
      )
      this.setSecondLevelData(secondLevelData)
      // console.log('=====>>>>>data', secondLevelData);
    } catch(error) {
      this.setState({ failInFetchSecondLevel: true })
      console.log('=====>>>>>二级菜单数据获取失败', );
    }

  }

  // 储存二级菜单数据
  // data: Array
  setSecondLevelData = (data) => {
    this.setState({
      secondLevel: data,
      isLoadingSecondLevel: false
    })
  }

  // index : 组件在数组中的索引
  // 点击哪一项，就滑动到哪一项
  handleFirstLevelClick = (index) => {
    if(this.state.isLoadingSecondLevel) return null         // 如果正在加载二级菜单则不可点击

    this.setState({ showBlankInBottom: true })              // 填回底部空白
    const { secondLevel, firstLevel } = this.state
    const y = secondLevel[index].positionY - 6              // 露出部分顶部背景颜色
    this.scrollView.scrollTo({ x: 0, y, animated: true })

    const { onSearchByCategory } = this.props
    // 一级菜单的分类筛选请求
    const categoryId = firstLevel[index].id
    onSearchByCategory(categoryId)
  }

  // 储存二级菜单的位置信息
  // positionY: Number, index: Number 组件数组索引
  handleSecondLevelPositionSet = (positionY, index) => {
    const { secondLevel } = this.state
    secondLevel[index].positionY = positionY
    this.setState({ secondLevel })
    // console.log('=====>>>>>取到位置', secondLevel);
  }

  updateSecondLevel = () => {
    const {
      secondLevel,
      isLoadingSecondLevel,
      failInFetchSecondLevel,
      showBlankInBottom
    } = this.state
    // 加载二级菜单数据失败
    if(failInFetchSecondLevel) {
      return (
        <TouchableOpacity
          onPress={this.fetchSecondLevel}
        >
          <Text> 数据获取失败，请点击重试 </Text>
        </TouchableOpacity>
      )
    }
    // 正在加载
    if(isLoadingSecondLevel) return <Loading />
    if(secondLevel.length !== 0) {
      return(
        <ScrollView
          ref={c => { this.scrollView = c }}
          style={styles.secondLevelContainer}
          onScrollBeginDrag={() => {
            this.setState({ showBlankInBottom: false })
          }}
        >
          {
            secondLevel.map((item, i) => {
              return(
                <SecondLevel
                  key={i}
                  index={i}
                  title={item.title}
                  data={item.data}
                  onPositionSet={this.handleSecondLevelPositionSet}
                  onSearchByCategory={this.props.onSearchByCategory}
                />
              )
            })
          }
          {/* 当点击一级菜单的倒数两项时，撑开滚动视图的高度 */}
          <View
            style={{
              height: showBlankInBottom ? 400 : 0
            }}
          >
          </View>
        </ScrollView>
      )
    }
  }


  render() {
    const { firstLevel, isLoadingFirstLevel } = this.state
    return(
      <TouchableOpacity
        onPress={this.toggleModal}
        style={{
          paddingHorizontal: 10,
          // backgroundColor: 'red',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: Color.white
          }}
        >
          分类
        </Text>
        {/* 模态弹窗 */}
        <Modal
          style={styles.modalContainer}
          isVisible={ this.state.isVisible }
          onBackdropPress={() => {
            this.toggleModal()
          }}
          onBackButtonPress={() => {
            this.setState({
              isVisible: false
            })
          }}
        >
          <View
            style={styles.menuContainer}
          >
            {/* 一级菜单 */}
            {
              isLoadingFirstLevel ?
                <Loading />
                : <View style={styles.firstLevelContainer}>
                  {
                    firstLevel.map((item, i) => {
                      const id = item.id
                      return (
                        <TouchableOpacity
                          style={{
                            borderLeftWidth: 4,
                            borderLeftColor: this.state.firstActiveIndex === i
                                                ? Color.primary : Color.white,
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#EEE',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                          }}
                          key={i}
                          onPress={() => {
                            this.handleFirstLevelClick(i)
                            this.setState({ firstActiveIndex: i })
                          }}
                        >
                          <Text
                            style={{
                              color: this.state.firstActiveIndex === i ? '#333' : '#666',
                              fontWeight: this.state.firstActiveIndex === i ? 'bold' : 'normal'
                            }}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
            }
            {/* 更新二级菜单 */}
            {this.updateSecondLevel()}
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'relative',
    paddingTop: 30,
    top: 100,
    margin: 0,
  },
  menuContainer: {
    paddingTop: 20,
    // paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
    // 试图让分类一级级横向排列
    flexDirection: 'row'
  },
  firstLevelContainer: {
    // backgroundColor: '#999',
    borderRightWidth: 5,
    borderRightColor: '#EEE'
  },
  secondLevelContainer: {
    marginRight: 20,
    flex: 1,
    backgroundColor: '#EEE',
    marginBottom: 30,
    paddingRight: 5,

  }

})

export default CategoryModal;
