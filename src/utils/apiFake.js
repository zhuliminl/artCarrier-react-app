/*
 * Created by Saul at 2018/07/05
 *
 * 虚拟的 api ，供开发测试使用
 *
 */


const apiFake = {
  get: path => {
    switch (path) {
      // 订单评论
      case '/item/comment':
        return getItemComment()
      // 订单评论
      case '/order/comment':
        return getItemComment()
      default:
        return {
          foo: 'saul'
        }
    }
  }

}

// 订单评论
function getItemComment() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove({
        name: 'saul'
      })
    }, 1000)
  })
}

export default apiFake
