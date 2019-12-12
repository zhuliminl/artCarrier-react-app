/*
 * Created by Saul at 2018/06/08
 *
 * 搜索栏
 *
 * 一般都会配合 DynamicList 来使用
 * 通过改变 共同的父级组件 的 请求参数 来达成搜索展示的功能
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
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Keyboard
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../constants';

/*
 * 搜索框接受参数
 *
 * @param placeholder String                                               :optional
 * @param onSearch    Function                                             :required
 * callback to change parent level component requrestPramas state
 */
class SearchBar extends React.Component {
  state = {
    showCancelButton: false
  }

  static defaultProps = {
    placeholder: '请输入......',
    onSearch: () => {},
  }

  static propTypes = {
    onSearch: PropTypes.func,
  }

  // 因为部分场景需要显式地改变“取消”字段的状态，所以不便使用 toggle 来控制按钮的显示状态
  hideCancelSearchButton = () => {
    this.setState({
      showCancelButton: false
    })
  }

  showCancelSearchButton = () => {
    this.setState({
      showCancelButton: true
    })
  }

  componentDidMount = () => {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.hideCancelSearchButton);
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }


  render() {
    const { placeholder } = this.props;
    return(
      <View style={ styles.searchContainer }>
        <Image
          style={ styles.iconSearchImage }
          source={ require('../../../assets/icon/sort/search.png') }
        />
        <TextInput
          ref={input => { this.textInput = input }}
          onSubmitEditing={(event) => {
            this.hideCancelSearchButton();
            const text  = event.nativeEvent.text
            console.log('即将搜索', text)
            if(!text.trim()) {
              console.log('搜索框为空')
              return null
            }
            // 搜索回调，通过传递路由参数给动态列表组件去获取数据
            this.props.onSearch(text.trim())
          }}
          onFocus={() => {
            this.showCancelSearchButton();
          }}
          underlineColorAndroid='transparent'
          placeholderTextColor={ Color.grey }
          placeholder={ placeholder }
          style={styles.searchInput}
        >
        </TextInput>
        {
          this.state.showCancelButton ?
            (
              <TouchableOpacity
                onPress={() => {
                  this.textInput.clear();
                  this.hideCancelSearchButton();
                }}
                style={ styles.cancelTextContainer }
              >
                <Text style={ styles.cancelText }>取消</Text>
              </TouchableOpacity>
            )
            : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    paddingRight: 0,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    // backgroundColor: '#EEE'
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDeep,
  },
  iconSearchImage: {
    width: 20,
    height: 20
  },
  searchInput: {
    // 坑！子组件如果设为 flex 为 1，将会直接影响父组件的布局，于是我们要连带地去设 父组件的 felx 为 1 ，才能让一切布局看起来直观
    flex: 1,
    height: 40,
    paddingRight: 10,
    // backgroundColor: '#999'
  },
  cancelTextContainer: {
    padding: 10,
  },
  cancelText: {
    color: Color.grey
  }
})


export default SearchBar;
