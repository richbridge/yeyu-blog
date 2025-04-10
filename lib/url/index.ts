export const getActiveAdminPath = (pathname: string) => {
  const currentActiveUrl = pathname.split('/').slice(0, 3).join('/')
  return currentActiveUrl
}
