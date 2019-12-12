/*
 * Created by Saul at 2018/05/04
 *
 * App 常量统一从包中导出，使用时也遵守只从包中导入
 * 不建议直接通过具体文件名导入使用!
 *
 */

import Color from './color';
import Font from './font';
import GlobalStyle from './globalStyle';
import GlobalConifg from './globalConfig';
import Layout from './layout';
import Space from './space';

export {
  Color, Font, GlobalStyle, GlobalConifg, Layout, Space
};
