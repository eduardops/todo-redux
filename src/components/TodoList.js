import React from 'react'
import {
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
  Badge,
  Progress,
  Button
} from "reactstrap";

const Todo = (props) => {
  const { todo } = props
  return <ListGroupItem action>
      <FormGroup check className={"d-flex justify-content-between align-items-center"}>
        <Label check>
        <Input type="checkbox" defaultChecked={todo.done} onChange={(e) => props.handleTodoClicked(e.target.checked, todo.id)}/>
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.description}
          </span>
        </Label>
        <Badge color="danger">Remove</Badge>
      </FormGroup>
    </ListGroupItem>;
}

const TodoList = (props) => {
  const { todos, handleTodoClicked, handleClearActiveList, handleDeleteActiveList } = props;
  const todosDone = todos.filter(t => t.done).length
  
  return <div className="tour-fourth">
    <Progress className="tour-fourth-1" animated color="success" value={(todosDone / todos.length) * 100}>
        {todosDone > 0 && ((todosDone / todos.length) * 100).toFixed(2) + "%"}
      </Progress>
      <ListGroup flush className="ta-left">
        {todos && todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              handleTodoClicked={handleTodoClicked}
            />
          ))}
      </ListGroup>
    <div className="tour-fourth-2 p-2">
        <Button outline className="wp-50" color="danger" size="sm" onClick={() => {
                  handleClearActiveList()
                }}>
          Clear
        </Button>
        <Button className="wp-50" color="danger" size="sm" onClick={() => {
                  handleDeleteActiveList()
                }}>
          Delete
        </Button>
      </div>
    </div>;
}

export default TodoList

