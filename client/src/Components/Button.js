import React from 'react';
import {styled} from 'styled-components';

export default function Button(props) {
  return (
    <ButtonStyle style={{background:props.bg,padding:props.pad,color:props.color,borderRadius:props.rad}}
    onClick={props.onClick} > {props.icon} {props.name} </ButtonStyle>
  )
}

const ButtonStyle=styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: .5rem;
  cursor: pointer;
  transition: all .4s ease-in-out;
`
