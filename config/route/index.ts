interface IRouteType {
  path: `/${string}`
  pathName: string
}

export const RouteList: IRouteType[] = [
  {
    path: '/',
    pathName: '首页',
  },
  {
    path: '/blog',
    pathName: '博客',
  },
  {
    path: '/note',
    pathName: '笔记',
  },
  {
    path: '/about',
    pathName: '关于',
  },
] as const
