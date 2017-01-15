import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, ModalDialog, ModalTitle } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class PossibleProperties extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showModal: false
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.props.getThis(this)
  }
  open() {
    this.setState({showModal: true})
    //this.props.onOpen()
  }
  close() {
    this.setState({showModal: false})
    this.props.onClose()
  }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Possible Properties</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Color</h4>
            <p>The color you chose was: <strong>{this.state.color}</strong></p>

            <h4>Possible Properties</h4>
            <BootstrapTable data={this.state.data} hover striped>
              <TableHeaderColumn isKey dataField="property">Property</TableHeaderColumn>
            </BootstrapTable>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default PossibleProperties