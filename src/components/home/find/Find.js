/*
 * Created by qm06 at 18-6-13
 *
 * 首页发现
 *
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from '../../common/searchBar';
import { withNavigation } from 'react-navigation';
import {Color, Space} from '../../../constants';
import ContentWaterfall from './contentWaterfall';
import ItemDisplay from './ItemDisplay'
import Toast from '../../common/toast'
import api from '../../../utils/api'

class Find extends React.Component {
  state = {
    tabLabels: [],
    isLoading: true
  }

  componentDidMount = () => {
    this.fetchTabLabels()
  }

  fetchTabLabels = async () => {
    try {
      const response = await api.get('/classes?type=item&id=0&supplier_id=0')
      const tabLabelRawData = response.data.data
      const tabLabels = tabLabelRawData.map(label => (
        {
          title: label.name,
          id: label.id
        }
      ))

      this.setState({
        tabLabels,
        isLoading: false
      })

    } catch(error) {
      return Toast.show('网络有点小问题呢')
    }

  }

  handleOnSearch = () => {
    console.log('search');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          {/*
          <SearchBar
            placeholder="请输入搜索内容..."
            onSearch={this.handleOnSearch}
          />
          */}
        </View>
        {
          this.state.isLoading ? null
            : <ItemDisplay
                tabLabels={ this.state.tabLabels }
                navigation={ this.props.navigation }
              />
        }
        {/*
        <ContentWaterfall navigation={this.props.navigation}/>
        */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingLeft:Space.tiny,
    // paddingRight:Space.tiny,
    flex: 1,
    // backgroundColor: Color.white,
    backgroundColor: Color.homeBgDark
  },
  searchWrapper: {
    // height:50,
  },

});
export default withNavigation(Find);
