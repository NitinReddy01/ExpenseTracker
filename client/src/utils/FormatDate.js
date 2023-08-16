import React from 'react'
import Moment from 'react-moment';

export default function FormatDate(props) {
  return (
    <Moment format='DD/MM/YYYY' >{props.date}</Moment>
  )
}
