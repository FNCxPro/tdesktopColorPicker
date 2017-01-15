import React from 'react'
import { Button, Jumbotron } from 'react-bootstrap'

class Head extends React.Component {
  render() {
    return (
      <div className="head">
        <Jumbotron>
          <h1>Telegram Desktop Color Picker</h1>
          <p>Thanks for using TD Color Picker! For help, contact <a href="https://t.me/PoodlesInBlack" target="_blank">Relative</a> on Telegram!</p>
        </Jumbotron>
      </div>
    )
  }
}
export default Head