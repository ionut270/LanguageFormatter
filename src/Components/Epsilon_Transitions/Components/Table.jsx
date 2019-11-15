import React from "react";
import { Table, Input, Button, Message } from "semantic-ui-react";

export default class Input_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states:   ["s1", "f2"],
      alphabet: ["a", "ε"],
      transitions: [
        ["f2", "f2"],
        ["s1", "s1"],
      ],
      editable: "",
      err : null
    };
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  changeEditable = id => e => this.setState({ editable: id });

  updateEditable = (e, { value, id }) => {
    var state = this.state;

    switch (id.split(/_/)[1]) {
      case "editable":
        var index = eval(id.split(/_/)[0]);

        state.states[index] = value;
        this.setState(state);
        break;

      case "InputValue":
        let i = id.split(/:/)[0];
        let j = id.split(/:/)[1].split(/_/)[0];

        state.transitions[i][j] = value;
        this.setState(state);
        break;

      case "alphabet":
        var index = eval(id.split(/_/)[0]);

        state.alphabet[index] = value;
        this.setState(state);
        break;
    }
  };

  addCollumn = e => {
    var alphabet = this.state.alphabet;
    alphabet.push("");

    this.setState({
      alphabet: alphabet
    });
  };

  addRow = e => {
    var transitions = this.state.transitions;
    var states      = this.state.states;
    var alphabet    = this.state.alphabet;

    states.push("");
    transitions.push(new Array(alphabet.length));

    this.setState({
      states: states,
      transitions: transitions
    });
  };

  convertAutomate = e => {

    //First check if the automate is valid !
    //All the variables should have a destination and that destination should be a valid one

    /*****************************************************Validation*************************************************************************/

    let valid = true;

    var states      = this.state.states;
    var alphabet    = this.state.alphabet;
    var transitions = this.state.transitions;

    if(transitions.length === states.length){
      for(let i = 0 ; i < transitions.length; i++){
        
        if(transitions[i].length === alphabet.length){

          //verificam existennta fiecarei stari-
          for(let j = 0; j<transitions[i].length; j++ ){
            if(states.indexOf(transitions[i][j]) === -1){
              valid = false;
              this.setState({
                err: "The state "+ transitions[i][j] + "does not exist !"
              })
            }
          }
        } else {
          valid = false;
          this.setState({
            err: "Please fill the whole table with values !"
          })
        }
      }
    } else {
      valid = false;
      this.setState({
        err: "Please fill the whole table with values !"
      })
    }

    if(valid === true){
      this.setState({
        err: null
      })

      for(let i = 0; i < states.length; i++){
        for(let j = 0; j < alphabet.length; j++){
          
        }
      }

    }

  };


  render() {
    return (
      <div className="ColumnButton">
        <div className="RowButton">
          <Table celled definition className="InputTable" compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3} />

                {this.state.alphabet.map((val, index) => (
                  <Table.HeaderCell
                    key={index}
                    className="InputCell"
                    textAlign="center"
                  >
                    <Input
                      className="InputValue"
                      id={index + "_alphabet"}
                      value={this.state.alphabet[index]}
                      onChange={this.updateEditable}
                    />
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.states.map((val, index) => (
                <Table.Row key={index}>
                  <Table.Cell
                    id={index}
                    className="InputCell"
                    textAlign="center"
                    onClick={this.changeEditable(index + "_state")}
                  >
                    {this.state.editable === index + "_state" ? (
                      <Input
                        id={index + "_editable"}
                        value={this.state.states[index]}
                        className="InputValue state"
                        onChange={this.updateEditable}
                      />
                    ) : (
                      val
                    )}
                  </Table.Cell>

                  {/**################################################################################################# */}

                  {this.state.alphabet.map((val, index2) => (
                    <Table.HeaderCell
                      key={index2}
                      className="InputCell"
                      textAlign="center"
                    >
                      <Input
                        className="InputValue"
                        id={index + ":" + index2 + "_InputValue"}
                        value={this.state.transitions[index][index2]}
                        onChange={this.updateEditable}
                      />
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Button
            style={{ marginLeft: "1em" }}
            primary
            circular
            icon="plus"
            onClick={this.addCollumn}
          />
        </div>

        <Button primary circular icon="plus" onClick={this.addRow} />

        <Button
          primary
          style={{ marginTop: "1em" }}
          onClick={this.convertAutomate}
        >
          {" "}
          &lt; Convert &gt;{" "}
        </Button>
        {
        this.state.err ?
        <Message negative>
            <Message.Header>We are sorry we cannot convert this automate</Message.Header>
            <p>{this.state.err}</p>
        </Message> : null 
        }
      </div>
    );
  }
}
