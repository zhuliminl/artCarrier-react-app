/*
 * Created by Saul at 2018/06/08
 *
 * 动态加载列表页
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
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
} from '../../../constants';
import api from '../../../utils/api';
import DefaultPage from '../../common/defaultPage';
import Toast from '../toast'

// TODO: 无论是搜索还是分类的分页请求还是请求失败，都应该提供一个回到初始状态页的入口

/*
 * 动态列表参数
 *
 * @param compositionStyle String                                                :optional
 * @param messageWhileEmptyList  String                                                :optional
 * @param routerPath       String                                                :required
 * @param requestParams    String                                                :optional
 * @param renderListHeader Function return ReactNode                             :optional
 * @param renderItem       Function return ReactNode with props (item, index)    :required
 */
class DynamicList extends React.Component {
  state = {
    loading: false,
    data: [],
    page: 1,
    requestParams: {
      // 参数对象
    },
    error: {
      type: '',
      message: ''
    },
    refreshing: false,
    maxPage: ''
  };

  static defaultProps = {
    compositionStyle: 'row',
    requestParams: null,
    routerPath: '',
    renderItem: () => {},
    messageWhileEmptyList: ''
  }

  static propTypes = {
    routerPath: PropTypes.string,
    render: PropTypes.func,
    messageWhileEmptyList: PropTypes.string,
  }

  _keyExtractor = (item, i) => {
    return i.toString();
  }

  componentDidMount = () => {
    this.fetchPageFirstTime()
  }

  fetchPageFirstTime = async() => {

    const routerPath = this.props.routerPath
    const requestParams = this.state.requestParams
    try {
      // 首次请求第一页数据
      // console.log(this.state.requestParams)
      const response = await api.get(`${routerPath}?page=1`, {
        params: {
          ...requestParams
        }
      });
      const data = response.data.data || {};
      const dataList = data.rows || [];
      const maxPage = data.maxPage;
      this.setState({
        data: dataList,
        refreshing: false,
        maxPage,
      })
    } catch(error) {
      console.log('error trigger', error)
      if(error.data) {
        const message = error.data.data.message
        // 处理业务请求错误
        // return Alert.alert(message)
        // return Toast.show("该分类数据为空")
        return Toast.show(message)
      }
      Alert.alert('网络错误')
    }
  }

  // 底部拉取
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
      loading: true
    }, () => {
      this.fetchMorePage();
    });
  }

  // 请求新的列表数据
  fetchMorePage = async () => {
    const { page } = this.state;
    const routerPath = this.props.routerPath
    // 比较当前页和总页数，停止错误请求的发出
    if(this.state.page > this.state.maxPage) {
      // console.log('最大页数', this.state)
      return console.log('到达最大页数')
    }
    try {
      const response = await api.get(`${routerPath}?page=${page}`)
      const data = response.data.data || {};
      const newDataList = data.rows || [];
      // 添加新的列表数据到列表底部
      this.setState({
        data: this.state.data.concat(newDataList),
        loading: false,
      }, () => {
        // console.log('data after', this.state.data)
      })
    } catch(error) {

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
          // Alert.alert(this.state.error.message);
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

  handleRenderHeader = () => {
    const { renderListHeader } = this.props
    if(!renderListHeader) {
      return null
    }
    return renderListHeader()
  }

  onRefresh = () => {
    // 暂时不打算给拉动刷新添加请求动作
    console.log('trigger onRefresh')
    this.fetchPageFirstTime()
  }

  renderFooter = () => {
    if(this.state.error.type === 'request error' || this.state.page > this.state.maxPage) {
      return (
        <View>
          <Text
            style={{
              textAlign: 'center',
              lineHeight: 30,
              color: Color.white,
            }}
            >
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

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps)
    const { requestParams } = nextProps
    // 避免重复的请求
    if(this.props.requestParams === nextProps.requestParams) {
      return
    }
    if(requestParams !== null) {
      this.setState({
        requestParams
      }, () => {
        // 根据参数发送请求
        this.fetchPageFirstTime()
      })
    }
  }

  render() {
    // 缺省情况
    const data = this.state.data;
    const { messageWhileEmptyList : message } = this.props
    if(!Array.isArray(data) || data.length === 0) {
      return (
        <DefaultPage
          message={ message ? message : '暂时没有数据请点击重试' }
          canTryAgain
          onTryAgain={() => {
            this.setState({
              requestParams: null
            },
              () => {
                // 重新发起初始化的请求
                this.fetchPageFirstTime()
              }
            )
          }}
        />
      )
    }

    const { renderItem, style = {} } = this.props
    return(
      <View
          style={{
            // paddingBottom: 100,
            // 这个高度后期要慎重处理，需要作出平台判断
            // 必须考虑兼容性
            // height: Layout.window.height - 130,
            height: Layout.window.height - 120,
            // backgroundColor: '#F5F6F7',
            // Tag: newVersionColor
            backgroundColor: Color.homeBgDark,
            ...style,
            // 单列横向布局 row 属性的启用恰好需要列表的容器的 flex 轴为 column
            // 而双列布局的 column 恰好需要容器的 flex 轴为 row
            flexDirection: this.props.compositionStyle === 'row' ? 'column' : 'row',
          }}
      >
        {/* 列表 */}
        <FlatList
          data={ this.state.data }
          extraData={ this.state }
          keyExtractor={this._keyExtractor}
          numColumns={ this.props.compositionStyle === 'row' ? 1 : 2 }
          key={ this.props.compositionStyle === 'row' ? 'row' : 'column'}
          renderItem={renderItem}
          ListHeaderComponent={ this.handleRenderHeader }
          ListFooterComponent={ this.renderFooter }
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            this.handleLoadMore();
          }}
        />
      </View>
    )
  }
}

export default DynamicList;
