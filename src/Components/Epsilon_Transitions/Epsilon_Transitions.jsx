import React from "react";
import InputTable from "./Components/Table";
import Result from "./Components/Result";
import Digraph from "./Components/digraph"

import { Divider, Header } from "semantic-ui-react";

import "./Styles/Epsilon_Transitions.css";


export default class Epsilon_Transitions extends React.Component {
  /** Documentation in ./Epsilon_Transitions.doc */

  constructor(props) {
    super(props);
    this.state = {
      input: [],
      output: [],

      output: null
    };
  }

  passTable = e => obj => {

    this.setState({
      output: obj
    })

    this.child.prepareForRender();
  }


  render() {
    return (
      <div className="Body">
        <div className="Tables">
          <Digraph obj={this.state.output}  ref={instance => { this.child = instance; }} />

          <InputTable passTable={this.passTable()} />

          <Divider horizontal>
            <Header as='h4'>
              Result will appear below
            </Header>
          </Divider>

          {this.state.inputTable !== null ? <Result out={this.state.output} /> : null}
        </div>
      </div>
    );
  }
}
