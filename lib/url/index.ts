export function getActiveAdminPath(pathname: string) {
  const currentActiveUrl = pathname.split('/').slice(0, 3).join('/')
  return currentActiveUrl
}

export function getActiveMainPath(pathname: string) {
  const currentActiveUrl = pathname.split('/').slice(0, 2).join('/')
  return currentActiveUrl
}
