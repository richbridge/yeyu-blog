export const getActiveAdminPath = (pathname: string) => {
  const currentActiveUrl = pathname.split('/').slice(0, 3).join('/')
  return currentActiveUrl
}

export const getActiveMainPath = (pathname: string) => {
  const currentActiveUrl = pathname.split('/').slice(0, 2).join('/')
  return currentActiveUrl
}
