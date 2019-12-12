/*
 * Created by Saul at 2018/05/21
 *
 * 欢迎翻滚页
 *
 */

import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet
} from 'react-native';
import { Layout, Color, Font } from '../../../constants';
import { welcomeData } from './__test__';
import NavigationService from '../../../navigation/NavigationService';
import { PageHint } from './pageHint'

class Welcome extends React.Component {
  static defaultProps = {
    welcomeConfig: welcomeData
  };

  navigateTo = (screen) => {
    NavigationService.navigate(screen);
  };

  // 最后一页提供跳转到登录页面的入口
  renderLastPage = (index) => {
    const { welcomeConfig } = this.props;
    const pageLength = welcomeConfig.length;
    if(index === pageLength - 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            // 开发的时候注销登录功能
            // this.navigateTo('Login');
            this.navigateTo('首页');
          }}
          style={ styles.lastPageButton }
        >
          <Text style={ styles.lastPageButtonText }>
            启航扬帆
          </Text>
        </TouchableOpacity>
      )
    }
  };


  render() {
    const { welcomeConfig } = this.props;
    const pageLength = welcomeConfig.length;
    return(
      <View style={ styles.container }>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {
            welcomeConfig.map((item, i) => {
              return (
                <View
                  style={{
                    backgroundColor: item.bgColor,
                    width: Layout.window.width,
                    height: '100%',
                    padding: 20,
                    justifyContent: 'center'
                  }}
                  key={i} >
                  <View style={ styles.imageContainer }>
                    <Image
                      source={require('../../../assets/image/logo.png')}
                      style={ styles.image }
                    />
                  </View>
                  {/* 页面位置指示器 */}
                  <PageHint index={i}/>
                  {
                    this.renderLastPage(i)
                  }
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
  },
  lastPageButton: {
    borderRadius: 5,
    marginTop: 30,
    padding: 15,
    backgroundColor: Color.white,
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lastPageButtonText: {
    fontSize: Font.medium,
    opacity: 0.8
  }
})

export default Welcome;
