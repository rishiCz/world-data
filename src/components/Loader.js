import React from 'react'
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import styles from './styles.module.css'

const Loader = ({size,color}) => {
  return (
    <div>
        <BsGlobeCentralSouthAsia className={styles.loader} size={size} color={color}/>
    </div>
  )
}

export default Loader