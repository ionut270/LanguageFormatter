import React from "react";
import InputTable from "./Components/Table";
import Result from "./Components/Result";
import Digraph from "./Components/digraph"

import { Divider, Header, Sidebar, Segment, Button } from "semantic-ui-react";

import "./Styles/Epsilon_Transitions.css";


export default class Epsilon_Transitions extends React.Component {
  /** Documentation in ./Epsilon_Transitions.doc */

  constructor(props) {
    super(props);
    this.state = {
      input: [],
      output: [],

      output: null,
      visible: false
    };
  }

  passTable = e => obj => {

    this.setState({
      output: obj
    })

  }

  handleResultDisplay = e =>{
    this.setState({
      visible: !this.state.visible
    })

    this.child.prepareForRender();

  }

  render() {
    return (
      <div className="Body">
        <div className="Tables">

          <InputTable passTable={this.passTable()} />

          <Divider horizontal>
            <Header as='h4'>
              Result will appear below
            </Header>
          </Divider>

          {this.state.inputTable !== null ?
            <Sidebar.Pushable as={Segment} className="Sidebaaar">

              <Button className="SidebarHandler" icon={this.state.visible ? "arrow left" : "arrow right"} primary circular onClick={this.handleResultDisplay}/>
              
              <Sidebar
                as={Segment}
                animation='overlay'
                icon='labeled'
                vertical
                visible={this.state.visible}
                width='thick'
              >
                <Digraph obj={this.state.output} ref={instance => { this.child = instance; }} />
              </Sidebar>

              <Sidebar.Pusher>
                <Segment basic>
                  <Result out={this.state.output} />
                </Segment>
              </Sidebar.Pusher>

            </Sidebar.Pushable>
            : null}
        </div>
      </div>
    );
  }
}
