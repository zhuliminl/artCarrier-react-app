/*
 * Created by Saul at 2018/05/03
 *
 * App 颜色风格限定
 *
 * When developing UIs, we often find ourselves reusing the same colors in multiple places in the UI.
 * If the colors have to be updated, they likely have to be updated across the board.
 * So it's good practice to store the color definitions in variables
 * instead of hardcoding them inside styles.
 * This rule will detect color properties that have literals (ie strings) as values.
 *
 * Eslint will detect some bad inline style color patterns, and put a wraning out
 *
 */


const tintColor = '#2f95dc';

export default {
  // 整体 App 配色风格
  white:     '#FFF',
  bg:        '#F5F6F7', // 非常浅的底色
  primary:   '#F53857', // 主色调
  secondary: '#FF8C04', // 和主色调相近的辅助色
  contrast:  '#8987FF', // 对比色

  // 层叠效果的透明色
  overlay:   'rgba(0,0,0,0.16)',

  // 标签类
  tintColor,
  tabIconDefault:  '#ccc',
  tabIconSelected: tintColor,
  tabBar:          '#fefefe',

  // 警告类
  errorBackground:   'red',
  errorText:         '#fff',
  warningBackground: '#EAEB5E',
  warningText:       '#666804',
  noticeBackground:  tintColor,
  noticeText:        '#fff',

  // 正文类
  black:  '#333',    // 正文一级配色。比较黑
  medium: '#666',    // 中等灰度的黑色
  grey:   '#999',    // 较浅的灰色

  // 客户要求的首页配色
  // homeBgDark: '#08222c',
  // homeBgDark: '#114154',
  homeBgDark: '#07222B',
  homeBgDeep: '#18384F',
  // homeBgLight: 'rgba(102, 149, 172, 0.3)',
  homeBgLight: '#114155',
  homeTitlePrimary: 'rgba(255, 255, 255, 0.8)',
  homeTitleSecondary: '#FFF',
  homeUnderline:'#65bde7',

  // 抖音版本
  // homeBgDark: '#0e0f1a',
  // homeBgDeep: '#151516',
  // homeBgLight: 'rgba(102, 149, 172, 0.3)',
  // homeBgLight: '#161823',
  // homeTitlePrimary: 'rgba(255, 255, 255, 0.8)',
  // homeTitleSecondary: '#FFF',
  // homeUnderline:'#65bde7',

};
