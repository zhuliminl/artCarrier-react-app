/*
 * Created by Saul at 2018/05/22
 *
 * 搜索条
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  FlatListView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../../constants';


class SearchBar extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func
  }

  static defaultProps = {
    placeholder: '请输入......',
    onSearch: () => {}
  }

  state ={
    showCancelButton: false
  }

  // 隐藏取消搜索按钮
  hideCancelSearchButton = () => {
    this.setState({
      showCancelButton: false
    })
  }
  // 显示取消搜索按钮
  showCancelSearchButton = () => {
    this.setState({
      showCancelButton: true
    })
  }



  render() {
    const { placeholder } = this.props;
    return(
      <View style={ styles.searchContainer }>
        <Image style={ styles.iconSearchImage } source={ require('../../../../assets/icon/sort/search.png') }/>
        <TextInput
          ref={input => { this.textInput = input }}
          onSubmitEditing={(event) => {
            this.hideCancelSearchButton()
            const text  = event.nativeEvent.text
            if(!text.trim()) {
              return null
            }
            this.props.onSearch(text.trim())
          }}
          onFocus={() => {
            this.showCancelSearchButton();
          }}
          underlineColorAndroid='transparent'
          placeholderTextColor={ Color.grey }
          placeholder={ placeholder }
          style={styles.searchInput}>
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
    // flex: 1,
    marginTop: 10,
    paddingLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    // backgroundColor: '#EEE'
    backgroundColor: '#999'
  },
  iconSearchImage: {
    width: 20,
    height: 20
  },
  searchInput: {
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
