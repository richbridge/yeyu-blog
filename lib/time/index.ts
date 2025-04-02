import dayjs from 'dayjs'

export const sayHi = () => {
  const hour = dayjs().hour()

  if (hour < 6) {
    return '凌晨不好喵...'
  } else if (hour < 9) {
    return '早上好喵~'
  } else if (hour < 12) {
    return '上午好喵~'
  } else if (hour < 14) {
    return '中午好喵~'
  } else if (hour < 17) {
    return '下午好喵~'
  } else if (hour < 19) {
    return '傍晚好喵~'
  } else {
    return '晚上好喵~'
  }
}

export const prettyDateTime = (date: number | Date) => {
  return dayjs(date).locale('zh-cn').format('YY年M月D日 H时 m分')
}

export const getToday = () => {
  return dayjs().format('YYYY 年 M 月 D 日')
}

/**
 * 计算今年剩余的天数
 */
export const getRemainingDaysOfYear = (): number => {
  const endOfYear = dayjs().endOf('year') // 获取今年最后一天
  return endOfYear.diff(dayjs(), 'day') // 计算相差的天数
}

/**
 * 计算今天已经过去的百分比和剩余的百分比
 */
// export const getDayProgress = (): { passed: number; remaining: number } => {
//   const startOfDay = dayjs().startOf('day') // 今天的起始时间 00:00
//   const endOfDay = dayjs().endOf('day') // 今天的结束时间 23:59:59
//   const now = dayjs() // 当前时间

//   const totalMs = endOfDay.diff(startOfDay) // 今天的总时长（毫秒）
//   const passedMs = now.diff(startOfDay) // 已经过去的毫秒数

//   const passedPercentage = (passedMs / totalMs) * 100
//   const remainingPercentage = 100 - passedPercentage

//   return {
//     passed: Number(passedPercentage.toFixed(2)), // 保留两位小数
//     remaining: Number(remainingPercentage.toFixed(2)),
//   }
// }

export const getYearProgress = (): { passed: number; remaining: number } => {
  const startOfYear = dayjs().startOf('year') // 今年的开始时间 1月1日 00:00
  const endOfYear = dayjs().endOf('year') // 今年的结束时间 12月31日 23:59:59
  const now = dayjs() // 当前时间

  const totalMs = endOfYear.diff(startOfYear) // 今年的总毫秒数
  const passedMs = now.diff(startOfYear) // 今年已经过去的毫秒数

  const passedPercentage = (passedMs / totalMs) * 100
  const remainingPercentage = 100 - passedPercentage

  return {
    passed: Number(passedPercentage.toFixed(2)), // 今年已过去的百分比，保留两位小数
    remaining: Number(remainingPercentage.toFixed(2)), // 今年剩余的百分比
  }
}
