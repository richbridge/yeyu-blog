export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col text-lg">
      <h2 className="font-black">
        今天是
        {/* {getTodayDate()} */}
      </h2>
      <p>
        {/* 今年已经过去了 {getYearProgress().passed}% 距离今年结束还有{' '}
        {getRemainingDaysOfYear()} 天~ */}
      </p>
      <p>你比昨天更优秀了一点吗?</p>
      <p>没有也没关系喵~</p>
      <p>活着开心最重要~</p>
      <div>展示博客的相关数据, 写了多少博客, 笔记, 上次记录的时间~</div>
    </div>
  )
}
