import React from "react";
import InputTable from "./Components/Table";
import Result from "./Components/Result";
import Digraph from "./Components/digraph"

import { Divider, Header, Sidebar, Segment, Button, Message, Icon } from "semantic-ui-react";

import "./Styles/Epsilon_Transitions.css";


export default class Epsilon_Transitions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: [],
      output: [],

      output: null,
      visible: false,
      visibleExplanation: false
    };
  }

  passTable = e => obj => {

    this.setState({
      output: obj
    })

  }

  handleResultDisplay = e => {
    this.setState({
      visible: !this.state.visible
    })

    this.child.prepareForRender();

  }


  showTooltips = e => {
    this.setState({
      visibleExplanation: !this.state.visibleExplanation
    })
  }

  render() {
    return (
      <div className="Body">
        <div className="Tables">
          <Button primary circular className="Tooltips_button" onClick={this.showTooltips}>How to use</Button>
          <Button secondary size="large" className="GithuButton" circular onClick={
            () => {
              window.open("https://github.com/ionut270/LanguageFormatter");
              this.forceUpdate();
            }
          }><Icon name='github' size='large' /></Button>
          <Sidebar.Pushable className="sidebarWithExplaination">


            <Sidebar
              as={Segment}
              animation='overlay'
              icon='labeled'
              vertical
              visible={this.state.visibleExplanation}
              width='thick'
              className="CenteredContent"
            >
              <Segment className="Explanation">
                <h4>E-NFA to DFA automata convertor</h4>
                <li>The algorithm is based on the one presented in the <a href="https://profs.info.uaic.ro/~otto/LFAC2019-20/lfac3.pdf">LFAC-UAIC</a> course</li>
                <Message>Conditions for proper use :
            <li>The starting simbol is defines by havng "s" in front of the state id and the final one with "f" in front of the state id</li>
                  <li>The first state inside the table should be the starting state</li>
                  <li>Inside the input table only numeric values can be given, each one representing the id of the state which they go to ( ex: q1's id would be 1 )</li>
                  <li>Each id inside the table should have a coresponding state, otherwise an error will pop out</li>
                  <li>As this is an epsilon transitions automata, it needs to have at least, one state going out with ε otherwise an error will pop out</li>
                  <li>The name and index of each state is automatically generated, when pressing the "+" icon coresponding to the rows of the table</li>
                </Message>
              </Segment>
            </Sidebar>
            <Sidebar.Pusher className="InputTableSegment" dimmed={this.state.visibleExplanation}>
              <InputTable passTable={this.passTable()} />
            </Sidebar.Pusher>

          </Sidebar.Pushable>


          <Divider horizontal>
            <Header as='h4'>
              Result will appear below
            </Header>
          </Divider>

          {this.state.inputTable !== null ?
            <Sidebar.Pushable as={Segment} className="Sidebaaar">

              <Button className="SidebarHandler" icon={this.state.visible ? "arrow left" : "arrow right"} primary circular onClick={this.handleResultDisplay} />

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
