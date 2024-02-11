//封装时间函数:获取当前时间段
export const getTime = () => {
    let message = ''
    const hour = new Date().getHours()
    if (hour >= 6 && hour <= 9) {
        message = '早上'
    } else if (hour > 9 && hour <= 13) {
        message = '上午'
    } else if (hour > 13 && hour <= 18) {
        message = '下午'
    } else {
        message = '晚上'
    }
    return message
}
