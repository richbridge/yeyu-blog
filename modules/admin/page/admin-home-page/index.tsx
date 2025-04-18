import { getRemainingDaysOfYear, getToday, getYearProgress } from '@/lib/time'
import Greeting from './internal/greeting'

export default function AdminHomePage() {
  return (
    <div className="flex items-center justify-center flex-col text-lg m-auto">
      <Greeting />
      <h2 className="font-black">
        今天是 <span className="text-indigo-400">{getToday()}</span>
      </h2>
      <p>
        今年已经过去了
        <span className="text-pink-400">{getYearProgress().passed}%</span>
        距离今年结束还有{' '}
        <span className="text-pink-400">{getRemainingDaysOfYear()}</span> 天~
      </p>
      <p>你比昨天更优秀了一点吗?</p>
      <p>没有也没关系喵~</p>
      <p>活着开心最重要~</p>
      {/* <div>展示博客的相关数据, 写了多少博客, 笔记, 上次记录的时间~</div> */}
    </div>
  )
}
