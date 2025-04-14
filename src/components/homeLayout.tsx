import React, { Children, FormEvent, ReactNode } from 'react'
import SideBar from '../sharedComponents/sideBar'
import Footer from '../sharedComponents/footer'

interface layout {
    children: ReactNode;
    onSearch : (e:FormEvent, search: string)=> void;
    closeModal: boolean;
}
const HomeLayout:React.FC<layout> = ({children, onSearch, closeModal}) => {
  return (
    <div>
        <SideBar onClick={onSearch}  closeModal={closeModal} />
        {children}
        <Footer />
    </div>
  )
}

export default HomeLayout