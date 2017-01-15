import React from 'react'
import Picker from '../components/picker.component'
import Head from '../components/head.component'
import PossibleProperties from '../components/possibleProperties.component'

const {globalShortcut, remote, ipcRenderer} = window.require('electron')

const path = window.require('path')
const fs = window.require('fs')
const readline = require('readline')
function parseTheme(name, callback) {
  fs.readFile(name, 'utf8', (err, raw) => {
    if(err) {
      return callback(err, null)
    }
    let lines = raw.split(/\r?\n/)
    let newLines = {}
    let linesVarReplaced = {}
    for(let _line in lines){
      if(!lines.hasOwnProperty(_line)) continue
      try {
        let line = lines[_line]
        if(line.endsWith(';')){
          let spl = line.split(':')
          let newVal = spl[1].replace(';', '')
          if(newVal.startsWith(' ')){
            newVal = newVal.replace(' ', '')
          }
          newLines[spl[0]] = newVal
          linesVarReplaced[spl[0]] = newVal
        }
      } catch(err) {
        return callback(err, null)
      }
    }
    for(let _line in linesVarReplaced) {
      if(!linesVarReplaced.hasOwnProperty(_line)) continue
      try {
        let line = linesVarReplaced[_line]
        //if(newLines[line]) linesVarReplaced[_line] = newLines[line]
        if(newLines[line]){
          while(newLines[line]) {
            linesVarReplaced[_line] = newLines[line]
            line = linesVarReplaced[_line]
          }
        }
      } catch(err) {
        return callback(err, null)
      }
    }
    return callback(null, {
      name: name,
      raw: raw,
      originalProperties: newLines,
      properties: linesVarReplaced
    })
  })
}
parseTheme(path.join(path.dirname(window.require.main.filename), 'default.tdesktop-theme'), (err, theme) => {
  if(err) {
    console.error(err)
    window.alert('An error occurred while loading the default telegram desktop theme.\nPress Ctrl + Shift + I on your keyboard in the window for more details.\nReport this error to Relative using the link on the main page!')
    return
  }
  window.tgTheme = theme
})
class AppContainer extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      finishedPicking: false
    }
    this.startPicking = this.startPicking.bind(this)
    this.closedModal = this.closedModal.bind(this)
    this.posPropThis = this.posPropThis.bind(this)
  }
  render() {
    let modal = null
    const finishedPicking = this.state.finishedPicking
    return (
      <div className="app_container">
        <Head/>
        <div className="container">
          <Picker onClick={this.startPicking}/>
          <p>After pressing Start Picking, hover your cursor over the property you are looking for in Telegram, then press Control/Command + G. You will then receive a list of possible properties in this window.</p>
          <PossibleProperties color={this.propColor} getThis={this.posPropThis} show={finishedPicking} data={this.propData} onClose={this.closedModal}/>
        </div>
      </div>
    )
  }
  closedModal() {
    this.state.finishedPicking = false
  }
  posPropThis(newThis) {
    global.posPropThisGood = newThis
  }
  startPicking(newThis) {
    let theme = window.tgTheme
    ipcRenderer.on('globalShortcut', (event, arg) => {
      if(arg === 'PickShortcut') {
        if(newThis.state.isPicking == false) return
        let robot = window.require('robotjs')
        var mouse = robot.getMousePos()
        var hex = robot.getPixelColor(mouse.x, mouse.y)
        let newHex = '#'+hex
        let possibleProperties = []
        for(let _prop in theme.properties) {
          if(!theme.properties.hasOwnProperty(_prop)) continue
          let prop = theme.properties[_prop]
          if(prop === newHex){
            possibleProperties.push({
              property: _prop
            })
          }
        }
        this.propData = possibleProperties
        console.log(this.propData)
        this.propColor = newHex
        newThis.setState({isPicking: false})
        this.state.finishedPicking = true
        remote.getCurrentWindow().focus()
        global.posPropThisGood.setState({data: this.propData, color: this.propColor, showModal: true})
      }
    })
  }
}

export default AppContainer