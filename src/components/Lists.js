import React, { Component } from 'react'
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Badge,
  Form,
  InputGroup,
  Input
} from "reactstrap";
import classnames from "classnames";
import TodoList from './TodoList';

class ListsTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: null
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.handleAddTabClick && this.state.name) this.props.handleAddTabClick(this.state.name);
    this.setState({isEditing: false, name: null})
  }

  render() {
    const { lists, activeTab, toggle } = this.props;
    const { isEditing } = this.state;
    return <div>
      <Nav tabs className="tour-second">
          {lists && lists.map(list => <NavItem key={list.id}>
                <NavLink className={classnames({
                    active: activeTab === list.id
                  })} onClick={() => {
                    toggle(list);
                  }}>
                  <h6>
                    <span className={classnames({
                        "text-muted": activeTab !== list.id
                      })}>
                      {list.name}{" "}
                    </span>
                    <Badge color={activeTab === list.id ? "primary" : "secondary"} pill>
                      {list.todos.length || 0}
                    </Badge>
                  </h6>
                </NavLink>
              </NavItem>)}
          {<NavItem>
              <NavLink onClick={() => {
                  !isEditing && this.setState({ isEditing: !isEditing });
                }}>
                {!isEditing && <h6>
              <span >+</span>
                  </h6>}
                {isEditing && <Form onSubmit={e => this.handleSubmit(e)}>
                    <InputGroup>
                      <Input autoFocus bsSize="sm" placeholder="Check it out" defaultValue={this.state.name} onChange={e => this.setState(
                            { name: e.target.value }
                          )} />
                    </InputGroup>
                  </Form>}
              </NavLink>
            </NavItem>}
        </Nav>
      </div>;
  }
}

const ListsContent = (props) => {
  const { lists, todos, handleTodoClicked } = props;
  
  return <TabContent activeTab={props.activeTab}>
      {
        lists && lists.map(list => 
        <TabPane key={list.id} tabId={list.id}>
          <Row>
            <Col>
              <TodoList 
                todos={todos} 
                handleTodoClicked={handleTodoClicked}
              />
            </Col>
          </Row>
        </TabPane>
        )
      }
      
    </TabContent>;
}

export default class Lists extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { 
      activeTab: props.activeTab, 
      lists: props.lists,
      todos: props.todos
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      activeTab: props.activeTab,
      lists: props.lists,
      todos: props.todos,
      handleTodoClicked: props.handleTodoClicked,
      handleAddTabClick: props.handleAddTabClick,
      handleChangeActiveList: props.handleChangeActiveList
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      if (this.props.handleChangeActiveList) 
        this.props.handleChangeActiveList(tab);
    }
  }
  
  render() {
    const { lists, activeTab, todos } = this.state;
    const { handleAddTabClick, handleTodoClicked } = this.props;
    return <div>
        <ListsTabs activeTab={activeTab} lists={lists} toggle={this.toggle} handleAddTabClick={handleAddTabClick} />
        <ListsContent activeTab={activeTab} lists={lists} todos={todos} handleTodoClicked={handleTodoClicked} />
      </div>;
  }
}
