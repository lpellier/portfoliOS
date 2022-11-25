import React from 'react'
import "./Pong.css"
import Sketch from 'react-p5'

function Pong(props: any) {
  const setup = (p5: any, canvasParentRef: any) => {
	// console.log("props", props.width, props.height)
    p5.createCanvas(props.width, props.height).parent(canvasParentRef)
  }
  
  const draw = (p5: any) => {
    p5.background(255, 130, 20)
    p5.ellipse(100, 100, 100)
    p5.ellipse(300, 100, 100)
  }
  
  return <Sketch setup={setup} draw={draw} />
}

export default Pong
