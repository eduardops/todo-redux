import React, { Component } from 'react';
import './App.css';
import TodoRedux from "./containers/TodoRedux";
import Tour from "reactour";

const steps = [
  {
    selector: ".App-intro",
    content: "Essa é um app de todo simples mas com redux"
  },
  {
    selector: ".tour-second",
    content:
      "Comece adicionando uma lista aqui. \n Clique na lista criada para ativá-la."
  },
  {
    selector: ".tour-third",
    content: "Agora podemos adicionar uma todo a lista."
  },
  {
    selector: ".tour-third-1",
    content: "Se desejar sua todo pode iniciar como complered."
  },
  {
    selector: ".tour-fourth",
    content:
      "As todos adicionadas aparecem aqui. Tente concluir uma tarefa marcando como concluida."
  },
  {
    selector: ".tour-fourth-1",
    content: "Aqui exibiremos o percentual de tarefas concluidas da sua lista."
  },
  {
    selector: ".tour-fourth-2",
    content: "Voce pode esvaziar sua lista ou até deleta-la."
  },
  {
    selector: ".tour-fifth",
    content:
      "Aqui exibiremos o percentual de todas as tarefas concluidas indepedente de qunatas listas você tiver."
  },
  {
    selector: ".App-intro",
    content:
      "Have fun."
  }
  // ...
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTourOpen: true
    };
  }
  closeTour() {
    this.setState({isTourOpen: false})
  }
  render() {
    return <div className="App">
        <div className="App-intro doc">
          
          <TodoRedux />
        </div>
        <Tour steps={steps} isOpen={this.state.isTourOpen} onRequestClose={this.closeTour.bind(this)} />
      </div>;
  }
}

export default App;
