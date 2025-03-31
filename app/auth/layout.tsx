import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen w-screen bg-black flex">{children}</div>
}

export default AuthLayout
