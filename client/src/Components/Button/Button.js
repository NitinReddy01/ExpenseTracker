import React from 'react'
import './button.css';

export default function Button(props) {
  return (
    <button className='button' style={{background:props.bg,padding:props.pad,color:props.color,borderRadius:props.rad}}> {props.icons} {props.name} </button>
  )
}
