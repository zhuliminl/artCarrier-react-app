/*
 * Created by Saul at 2018/05/03
 *
 * 定义全局共享的样式
 * 如快速居中、弥散投影、一个像素边框等
 *
 * 全局样式在具体使用的时候可能常常会和其他样式混合使用，eg:
 *
 *	style={{
 *		padding: Space.small,
 *		margin: Space.small,
 *		backgroundColor: Color.bg,
 *		...GlobalStyle.tintShadow
 *	}}
 *
 *  阶段性开发中，允许将样式写在标签内部。
 *  但是最终，还是建议将样式放到标签外，也即文件底部的 StyleSheet 中
 */

export default {
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tintShadow: {
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowColor: '#999',
    shadowOffset: { height: 10, width: 0 },
  },
  listHeihgt: {
    height: 80   // 比较少用
  }
}
