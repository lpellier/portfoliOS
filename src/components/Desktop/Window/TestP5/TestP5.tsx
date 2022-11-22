import React from "react"

class Comp extends React.Component<{width: number, height: number}> {
    state = {
        myRef: React.createRef(),
        myP5: null
    }

    Sketch = (p: any) => {
        p.setup = () => {
            p.createCanvas(this.props.width, this.props.height)
        }

        p.draw = () => {
            p.background(0)
            p.ellipse(50, 50, 70, 70)
        }
    }

    componentDidMount() {
        this.setState({myP5 : new p5(this.Sketch, this.state.myRef.current)})
    }

    render() {
        return (
            <div ref={this.state.myRef}>
                
            </div>
        )
    }
}

export default Comp;
