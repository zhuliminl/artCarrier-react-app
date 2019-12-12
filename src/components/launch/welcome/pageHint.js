/*
 * Created by Saul at 2018/05/21
 *
 * 欢迎页的当前页指示器
 *
 */

import React from 'react';
import { View } from 'react-native';
import { welcomeData } from './__test__';

const welcomePagesLength = welcomeData.length;

// 页面位置指示器
export const PageHint = ({index}) => {
  // 当前页面指示点
  // const points = [...Array(welcomePagesLength).keys()]
  // android 不支持上面语法
  const points = [1, 2, 3, 4]
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'

      }}
    >
      {
        points.map((item, i) => (
          <View
            style={{
              margin: 5,
              width: 10,
              height: 10,
              borderRadius: index === i ? 4 : 5,
              backgroundColor: '#FFF',
              opacity: index === i ? 1 : 0.4
            }}
            key={i}
          >
          </View>
        ))
      }
    </View>
  )
}

