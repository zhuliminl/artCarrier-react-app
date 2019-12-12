/*
 * Created by Saul at 2018/06/07
 *
 * 媒体中心的动作
 *
 */

import {
  ADD_TO_PLAYLIST,
  TOGGLE_PLAY,
  SWITCH_TRACK
} from './actionType'

export const addToPlaylist = (track) => {
  return {
    type: ADD_TO_PLAYLIST,
    track
  }
}

export const togglePlay = () => {
  return {
    type: TOGGLE_PLAY,
  }
}

export const switchTrack = (trackIndex) => {
  return {
    type: SWITCH_TRACK,
    trackIndex
  }
}
