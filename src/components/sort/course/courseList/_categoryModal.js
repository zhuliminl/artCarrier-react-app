/*
 * Created by Saul at 2018/06/21
 *
 * 分类弹窗
 *
 * 客户要求有变动，暂停开发 2018.06.22
 * 将来可能会用到 暂时保存
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
  Alert
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../../constants';
import api from '../../../../utils/api';
import Modal from "react-native-modal";
import Loading from './Loading'


class CategoryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      categoryType: this.props.categoryType,
      firstLevel: [],
      secondLevel: [],
      thirdLevel: [],

      firstActiveIndex: '',
      secondActiveIndex: '',
      isLoadingSecondLevel: false,
      isLoadingThirdLevel: false
    }
  }

  // 当出现模态窗的时候，自动请求第一级的分类数据
  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })

    if(!this.state.isVisible) {
      this.fetchFirstLevelMenu()
    }
  }

  fetchFirstLevelMenu = async () => {
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
      firstLevel: data
    })
  }

  // cateoryId : String
  handleFirstLevelClick = async (cateoryId) => {
    this.setState({ isLoadingSecondLevel: true })
    // 每次点击一级菜单，都必须清楚之前三级菜单的显示数据
    this.clearThirdLevel()
    // 需要先请求数据才知道当前级是不是最后一级
    try {
      const response = await api.get('/classes', {
        params: {
          type: this.props.categoryType,
          id: cateoryId,
          supplier_id: '0'
        }
      })
      const secondLevelData = response.data.data
      this.setSecondLevelData(secondLevelData)
      console.log('=====>>>>>二级分类数据', secondLevelData);
    } catch(error) {
      console.log('=====>>>>二级分类数据请求错误', error);
    }
  }

  clearThirdLevel = () => {
    this.setState({
      thirdLevel: []
    })
  }

  // cateoryId : String
  handleSecondLevelClick = async (cateoryId) => {
    this.setState({ isLoadingThirdLevel: true })
    try {
      const response = await api.get('/classes', {
        params: {
          type: this.props.categoryType,
          id: cateoryId,
          supplier_id: '0'
        }
      })
      const thirdLevelData = response.data.data
      this.setThirdLevelData(thirdLevelData)
    } catch(error) {
      console.log('=====>>>>>获取三级分类请求数据失败', error);
    }
  }

  // data : Array
  setSecondLevelData = (data) => {
    this.setState({
      secondLevel: data
    })
    this.setState({ isLoadingSecondLevel: false })
  }
  // data : Array
  setThirdLevelData = (data) => {
    this.setState({
      thirdLevel: data
    })
    this.setState({ isLoadingThirdLevel: false })
  }


  updateSecondLevel = () => {
    // 尝试渲染第二级的视图
    const { secondLevel, isLoadingSecondLevel } = this.state
    if(this.state.isLoadingSecondLevel) {
      return <Loading />
    }
    if(secondLevel.length === 0) return null
    return (
      <View style={styles.secondLeveConainer}>
        {
          secondLevel.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.handleSecondLevelClick(item.id)
                  this.setState({ secondActiveIndex: i })
                }}
                key={i}
                style={styles.secondLevelItem}
              >
                <Text
                  style={{
                    color: this.state.secondActiveIndex === i ? 'red' : '#666'
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  updateThirdLevel = () => {
    const { thirdLevel } = this.state
    if(this.state.isLoadingThirdLevel) {
      return <Loading />
    }
    if(thirdLevel.length === 0) return null
    return (
      <View style={styles.thirdLevelContainer}>
        {
          thirdLevel.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.thirdLevelItem}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  render() {
    const { onSearchByCategory } = this.props
    const { firstLevel } = this.state

    return(
      <TouchableOpacity
        onPress={this.toggleModal}
        style={{
          paddingHorizontal: 10,
          // backgroundColor: 'red',
          justifyContent: 'center',
        }}
      >
        <Text>
          分类
        </Text>
        {/* 模态弹窗 */}
        <Modal
          style={styles.modalContainer}
          isVisible={ this.state.isVisible }
          onBackdropPress={() => {
            this.toggleModal()
          }}
        >
          <View
            style={styles.menuContainer}
          >
            {/* 一级菜单 */}
            <View style={styles.firstLevelContainer}>
              {
                firstLevel.map((item, i) => {
                  const id = item.id
                  return (
                    <TouchableOpacity
                      style={styles.firstLevelItem}
                      key={i}
                      onPress={() => {
                        this.handleFirstLevelClick(id)
                        this.setState({ firstActiveIndex: i })
                      }}
                    >
                      <Text
                        style={{
                          color: this.state.firstActiveIndex === i ? 'red' : '#666'
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>

            {/* 更新二级菜单 */}
            {this.updateSecondLevel()}
            {/* 更新三级菜单 */}
            {this.updateThirdLevel()}

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
    paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
    // 试图让分类一级级横向排列
    flexDirection: 'row'
  },
  firstLevelContainer: {
    // backgroundColor: '#999'
  },
  firstLevelItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  secondLeveConainer: {
    marginTop: 10,
  },
  thirdLevelContainer: {
    marginTop: 10,
  },
  secondLevelItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  thirdLevelItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})

export default CategoryModal;
