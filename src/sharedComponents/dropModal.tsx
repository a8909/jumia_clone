import React from 'react'
import { account } from '../interfaces/allCategories'

const DropModal:React.FC<account> = ({icon, name, isHelp, newPath}) => {
  return (
    <div className='pointer drop-account d-flex'>
        <div >
            {isHelp ? null : <span className='me-2'>{icon}</span>}
            <a href={newPath}  className=' a-tag text-nowrap'>{name}</a>
        </div>
    </div>
  )
}

export default DropModal