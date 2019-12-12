/*
 * Created by Saul at 2018/06/07
 *
 * 媒体播放状态的规约函数
 *
 */

import {
  ADD_TO_PLAYLIST,
  TOGGLE_PLAY,
  SWITCH_TRACK
} from './actionType'

const initState = {
  currentTrack: {
    isFullScreen: false,   // 是否全屏
    isLoading: false,      // 正在加载
    chapterTitle: 'Javascript Closure',
    courseTitle: 'JS 基础',
    trackIndex: 0,         // 所属栈位置
    mediaURL: 'http://www.simplerestfulblog.com/demo/closure.mp4',
    mediaCoverURL: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=301d71e34190f60304b09b410129d426/91ef76c6a7efce1b27893518a451f3deb58f6546.jpg', // 媒体封面
    paused: true,         // 播放状态
    // 让组件自己去管理进度状态
    // currentTime: '',
    // duration: ''
  },
  trackList: [
    {
      chapterTitle: 'JS 函数',
      courseTitle: 'JS 基础',
      speaker: '来福',
      mediaURL: 'http://1255855950.vod2.myqcloud.com/d1622d6cvodgzp1255855950/db0aa2377447398156519076358/7Xaaz0jybKEA.mp4',
      mediaCoverURL: 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=1a4cade85866d0166a14967af642bf62/bf096b63f6246b602fa49c51e1f81a4c510fa268.jpg'
    },
    {
      chapterTitle: 'JS this',
      courseTitle: 'JS 基础',
      speaker: '来福',
      mediaURL: 'http://1255855950.vod2.myqcloud.com/d1622d6cvodgzp1255855950/afebfe317447398156950331692/IUtceylFrHAA.mp4',
      mediaCoverURL: 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=1a4cade85866d0166a14967af642bf62/bf096b63f6246b602fa49c51e1f81a4c510fa268.jpg'
    },
  ]
}

export default (state = initState, action) => {
  // 必须是深克隆
  let newState = JSON.parse(JSON.stringify(state))
  let { currentTrack, trackList } = newState
  let { trackIndex, track } = action
  // console.log('trackIndex', trackIndex);
  switch(action.type) {
    case ADD_TO_PLAYLIST:
      newState.trackList.push(track)
      return {
        ...newState
      }
    case TOGGLE_PLAY:
      currentTrack.paused = !currentTrack.paused
      return {
        ...newState
      }
    case SWITCH_TRACK:
      const nextCurrentTrack = trackList[trackIndex]
      currentTrack.chapterTitle = nextCurrentTrack.chapterTitle
      currentTrack.courseTitle = nextCurrentTrack.courseTitle
      currentTrack.mediaURL = nextCurrentTrack.mediaURL
      currentTrack.mediaCoverURL = nextCurrentTrack.mediaCoverURL
      currentTrack.trackIndex = trackIndex
      // 每次点击新的播放项目，都自动播放它
      currentTrack.paused = false
      return {
        ...newState
      }
    default:
      return {
        ...newState
      }
  }
}
