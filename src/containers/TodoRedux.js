import React, { Component } from "react";
import { Container, Row, Col, Card, Progress } from "reactstrap";
import "../App.css";
import TodoForm from "../components/TodoForm";
import Lists from "../components/Lists";
import { connect } from "react-redux";
import { changeActiveList, addTodo, addList, completeTodo, uncompleteTodo} from "../redux/store";
import { clearList, deleteList } from "../redux/store";

class TodoRedux extends Component {
  handleOnChangeFormInput(todo) {
    if(this.props.activeList){
      this.props.addTodo(todo, this.props.activeList.id);
    }
  }

  handleAddTabClick(name) {
    this.props.addList(name);
  }
  handleTodoClicked(checked, todoId) {
    if (checked) this.props.completeTodo(todoId, this.props.activeList.id);
    else this.props.uncompleteTodo(todoId, this.props.activeList.id);
  }
  handleClearActiveList() {
    console.log('test')
    this.props.clearList( this.props.activeList.id)
  }

  handleDeleteActiveList() {
    console.log('test 2')
    this.props.deleteList( this.props.activeList.id)
  }
  

  render() {
    const {
      lists,
      activeList,
      todos,
      changeActiveList,
      completed,
      total
    } = this.props;

    return <Container>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Progress className="tour-fifth" animated color="success" value={(completed / total) * 100}>
            {(completed) > 0 && ((completed / total) * 100).toFixed(2) + "%"}
            </Progress>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card className="p-2">
              <TodoForm handleOnChange={this.handleOnChangeFormInput.bind(this)} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card className="p-2">
              <Lists activeTab={activeList ? activeList.id : null} 
                lists={lists} 
                todos={todos} 
                handleAddTabClick={this.handleAddTabClick.bind(this)} 
                handleTodoClicked={this.handleTodoClicked.bind(this)} 
                handleChangeActiveList={changeActiveList}
                handleClearActiveList={this.handleClearActiveList.bind(this)}
                handleDeleteActiveList={this.handleDeleteActiveList.bind(this)} />
            </Card>
          </Col>
        </Row>
      </Container>;
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  lists: state.lists,
  activeList: state.activeList,
  completed: state.completed,
  total: state.totalOfTodos
});

const mapDispatchToProps = {
  changeActiveList,
  addTodo,
  addList,
  completeTodo,
  uncompleteTodo,
  clearList, 
  deleteList 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoRedux);