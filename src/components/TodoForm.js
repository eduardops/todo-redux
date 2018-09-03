import React, { Component } from 'react'
import { Form, InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";
export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked : false
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { checked, text } = this.state
    const todo = {
      done: checked,
      description: text
    }
    if (this.props.handleOnChange)
      this.props.handleOnChange(todo)
  }
  render() {
    return <Form className="tour-third" onSubmit={e => this.handleSubmit(e)}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
            <Input className="tour-third-1" name="ok" addon type="checkbox" aria-label="Checkbox for following text input" defaultValue={this.state.checked} onChange={e => this.setState(
                    { checked: e.target.checked }
                  )} />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Check it out" defaultValue={this.state.text} onChange={e => this.setState(
                { text: e.target.value }
              )} />
        </InputGroup>
      </Form>;
  }
}
