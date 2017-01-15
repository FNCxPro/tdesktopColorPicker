import React from 'react'
import { Button } from 'react-bootstrap'
class Picker extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isPicking: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    let isPicking = this.state.isPicking
    return (
      <Button bsStyle="primary" bsSize="large" onClick={this.handleClick} >{isPicking ? 'Picking...' : 'Start Picking'}</Button>
    )
  }
  handleClick() {
    this.setState({isPicking: true})
    this.props.onClick(this)
  }
}

export default Picker