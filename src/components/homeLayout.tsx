import React, { Children, FormEvent, ReactNode } from 'react'
import SideBar from '../sharedComponents/sideBar'
import Footer from '../sharedComponents/footer'

interface layout {
    children: ReactNode;
    onSearch : (e:FormEvent, search: string)=> void;
}
const HomeLayout:React.FC<layout> = ({children, onSearch}) => {
  return (
    <div>
        <SideBar onClick={onSearch}/>
        {children}
        <Footer />
    </div>
  )
}

export default HomeLayout