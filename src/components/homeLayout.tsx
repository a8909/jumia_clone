import React, { Children, FormEvent, ReactNode } from 'react'
import SideBar from '../sharedComponents/sideBar'
import Footer from '../sharedComponents/footer'

interface layout {
    children: ReactNode;
    onSearch : (e:FormEvent, search: string)=> void;
    closeModalEvent: boolean;
}
const HomeLayout:React.FC<layout> = ({children, onSearch, closeModalEvent}) => {
  return (
    <div>
        <SideBar onClick={onSearch} closeMdal={closeModalEvent} />
        {children}
        <Footer />
    </div>
  )
}

export default HomeLayout