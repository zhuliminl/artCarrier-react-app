/*
 * Created by Saul at 2018/06/07
 *
 * 秒数转时分秒展示
 * 后期可以多做几个常用的转换扩展
 *
 */

/*
 *
 *
 * @param Number 总秒数
 * @return String 常见时间长度格式 01:59:59
 */

export const formatSecondsToNormalTime = (s) => {
  let time

  if(s < 0) {
    return 0
  }

  let hour = Math.floor(s / 3600)
  let min = Math.floor( s / 60) % 60
  let sec = s % 60

  if(hour < 10) {
    time = '0' + hour + ':'
  } else {
    time = hour + ':'
  }

  if(min < 10) {
    time += '0'
  }
  time += min + ':'
  if(sec < 10) {
    time += "0"
  }
  time += sec.toFixed(0)
  return time
}

