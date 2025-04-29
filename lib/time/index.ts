import dayjs from 'dayjs'

export function sayHi() {
  const hour = dayjs().hour()

  if (hour < 6) {
    return '凌晨不好喵...'
  }
  else if (hour < 9) {
    return '早上好喵~'
  }
  else if (hour < 12) {
    return '上午好喵~'
  }
  else if (hour < 14) {
    return '中午好喵~'
  }
  else if (hour < 17) {
    return '下午好喵~'
  }
  else if (hour < 19) {
    return '傍晚好喵~'
  }
  else {
    return '晚上好喵~'
  }
}

export function prettyDateTime(date: number | Date) {
  return dayjs(date).locale('zh-cn').format('YY年M月D日 H时 m分')
}

export function toZhDay(date: number | Date) {
  return dayjs(date).locale('zh-cn').format('YY年M月D日')
}

export function getRemainingDaysOfYear(): number {
  const endOfYear = dayjs().endOf('year')
  return endOfYear.diff(dayjs(), 'day')
}

export function getYearProgress(): { passed: number, remaining: number } {
  const startOfYear = dayjs().startOf('year')
  const endOfYear = dayjs().endOf('year')
  const now = dayjs()

  const totalMs = endOfYear.diff(startOfYear)
  const passedMs = now.diff(startOfYear)

  const passedPercentage = (passedMs / totalMs) * 100
  const remainingPercentage = 100 - passedPercentage

  return {
    passed: Number(passedPercentage.toFixed(2)),
    remaining: Number(remainingPercentage.toFixed(2)),
  }
}

export function getTodayDayInfo(): { year: number, dayOfYear: number } {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const diffInMs = now.getTime() - startOfYear.getTime()
  const dayOfYear = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1

  return {
    year: now.getFullYear(),
    dayOfYear,
  }
}
