import React, { Children, ReactNode } from 'react'
import SideBar from '../sharedComponents/sideBar'
import Footer from '../sharedComponents/footer'

interface layout {
    children: ReactNode
}
const HomeLayout:React.FC<layout> = ({children}) => {
  return (
    <div>
        <SideBar/>
        {children}
        <Footer />
    </div>
  )
}

export default HomeLayout