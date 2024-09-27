import React from "react"

type AuthLayoutProps = {
    // ...
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
     {children}
    </div>
  )
}

export default AuthLayout
