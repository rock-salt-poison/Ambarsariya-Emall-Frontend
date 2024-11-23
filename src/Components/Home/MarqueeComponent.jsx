import React from 'react'
import Marquee from "react-fast-marquee";

export default function MarqueeComponent(props) {

  return (
    <Marquee speed={props.speed} direction="left" className='marquee' >
      <span>

      {props.text}
      </span>
    </Marquee>
  )
}
