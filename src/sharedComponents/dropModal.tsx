import React from 'react'
import { account } from '../interfaces/allCategories'

const DropModal:React.FC<account> = ({icon, name, isHelp}) => {
  return (
    <div>
        <div>
            {isHelp ? null : <span>{icon}</span>}
            <h6>{name}</h6>
        </div>
    </div>
  )
}

export default DropModal