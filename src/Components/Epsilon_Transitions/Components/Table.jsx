import React from "react";
import { Table, Input, Button, Message } from "semantic-ui-react";


export default class Input_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: ["s0", "q1", "f2"],
      alphabet: ["a", "b", "ε"],
      transitions: [
        ["s0", "q1", ""],
        ["f2", "q1", "s0"],
        ["f2", "s0", "f2"]
      ],
      err: null,
      visible: false,
    };
  }

  updateEditable = (e, { value, id }) => {
    console.log("Update Editable !");
    var state = this.state;

    switch (id.split(/_/)[1]) {
      case "editable":
        var index = eval(id.split(/_/)[0]);

        if (value.split(/^[a-z]/)[1] !== index) {
          value = value.split(/\d/)[0] + index;
        }

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
    console.log("Add column !");
    var alphabet = this.state.alphabet;
    alphabet.push("");

    var spliced = alphabet.splice(0, alphabet.length - 2)
    spliced.push("");
    spliced.push("ε");

    var transitions = this.state.transitions;

    for(let i=0; i< transitions.length; i++){
      transitions[i].push("");
    }

    this.setState({
      alphabet: spliced,
      transitions:transitions
    });
  };

  addRow = e => {
    console.log("Add row !");
    var transitions = this.state.transitions;
    var states = this.state.states;
    var alphabet = this.state.alphabet;

    states.push("" + states.length);
    transitions.push(new Array(alphabet.length));

    this.setState({
      states: states,
      transitions: transitions
    });
  };
  convertAutomate = e => {

    console.log("Convert Autoamte !");

    this.setState({
      output: null,
      output_States: null
    })

    //First check if the automate is valid !
    //All the variables should have a destination and that destination should be a valid one

    /*****************************************************Validation*************************************************************************/

    let valid = true;

    var states = this.state.states;
    var alphabet = this.state.alphabet;
    var transitions = this.state.transitions;

    var eps = alphabet.indexOf("ε")

    if (transitions.length === states.length) {
      for (let i = 0; i < transitions.length; i++) {

        if (transitions[i].length === alphabet.length) {

          //verificam existennta fiecarei stari-
          for (let j = 0; j < transitions[i].length; j++) {
            if (states.indexOf(transitions[i][j]) === -1) {
              //console.log("OK : State > ", eps, i, j)
              if (j !== eps) {
                valid = false;
                this.setState({
                  err: "The state " + transitions[i][j] + "does not exist !"
                })
              } else {
                valid = true
                this.setState({
                  err: null
                })
              }
            }
          }
        } else {
          valid = false;
          this.setState({
            err: "1 Please fill the whole table with values !"
          })
        }
      }
    } else {
      valid = false;
      this.setState({
        err: "2 Please fill the whole table with values !"
      })
    }

    console.log(this.state.states,this.state.alphabet,this.state.transitions)

    if (valid === true) {

      //console.log("OK : Passed validation !");

      this.setState({
        err: null
      })

      var nfa_states = [
        [states[0]]
      ];

      var firstState = [states[0]] //firstState[0] = "s1"


      var output = [];


      for (let m = 0; m < nfa_states.length; m++) {

        var line = []
        for (let j = 0; j < alphabet.length - 1; j++) { // 0 - a
          var result = []

          for (let i = 0; i < nfa_states[m].length; i++) { // 0 - s1 pot fi mai multe
            var position = states.indexOf(nfa_states[m][i]); // 0
            if (result.indexOf(transitions[position][j]) === -1) {
              result.push(transitions[position][j]); // transitions[0][0] = f2
              //console.log("Found transition for variable > ", transitions[position][j])
            } else {
              //console.log("Attempted to push >", transitions[position][j], "In result > ", result)
            }
          }
          // - inchiderea la epsilon -
          var nonEpsLen = result.length
          for (let i = 0; i < nonEpsLen; i++) {
            // luam fiecare din astea si verificam unde merge cu epsilon si il adaugam la results

            var position = states.indexOf(result[i]); // f2 => 2

            // we need check if what we try to push isn't allready in our automate

            if (transitions[position] && transitions[position][eps]) { // daca se duce undeva cu eps

              if (result.indexOf(transitions[position][eps]) === -1) {
                result.push(transitions[position][eps])
                //console.log("New eps transition > [", transitions[position][eps], "] for > pos:", position, " > eps:", eps, " > res:", result[i], i)
              }

            } else {
              if (!transitions[position]) {
                //console.log("BAD : No transition > ", position, transitions[position])
              } else {
                //console.log("OK : No eps transition > ", position, transitions[position])
              }
            }
          }
          line.push(result);
          //console.log("Result = [", result, "]");

          var ln = ""
          for (let i = 0; i < line.length; i++) {
            ln += "[" + line[i] + "]"
          }
          //console.log("Current Line:>", ln)

          //si avem si tranzitia la eps
          //console.log("Next for this line !")
        }
        //console.log("Line = [", line, "]")
        //console.log("Next line !")

        for (let i = 0; i < line.length; i++) {

          //needs further validation 
          /**
           * Take each individual state and check if it exists in the arr
           */
          let found = false;
          for (let l = 0; l < nfa_states.length; l++) {
            let counter = 0;
            if (line[i].length === nfa_states[l].length) {
              for (let k = 0; k < line[i].length; k++) {
                if (nfa_states[l].indexOf(line[i][k]) !== -1) {
                  //console.log("Checking if it exists ! > ", line[i][k], counter, "[", nfa_states[l].indexOf(line[i][k]), "]")
                  counter++;
                }
              }
            }
            if (counter === line[i].length) {
              //console.log("Found !")
              found = true;
            }
          }


          if (!found) {
            nfa_states.push(line[i])
            //console.log("OK : Adding a new state > ", line[i].sort(), i)
          }

        }
        output.push(line);
        var cns = ""
        for (let i = 0; i < nfa_states.length; i++) {
          cns += "[" + nfa_states[i] + "]"
        }
        //console.log("OK : Here are the states > ", cns)
      }

      for (let i = 0; i < output.length; i++) {
        var ln = "<"
        for (let j = 0; j < output[i].length; j++) {
          ln += output[i][j] + ">"
        }
        //console.log("[" + ln + "]");
      }
      var obj = {
        alphabet: alphabet,
        output: output,
        output_States: nfa_states
      }
      this.props.passTable(obj)
      // this.setState({
      //   output: output,
      //   output_States: nfa_states
      // })
    }

  };
  removeRow = e => {
    var states = this.state.states;
    var transitions = this.state.transitions;

    states.pop();
    transitions.pop();

    this.setState({
      states: states,
      transitions: transitions
    })
  }
  removeCollumn = e => {
    var alphabet = this.state.alphabet;
    var transitions = this.state.transitions;

    //not as simple as row !

    //we have to protect the epsilon simbol
    alphabet.pop();
    alphabet.pop();
    alphabet.push("ε");


    for (let i = 0; i < transitions.length; i++) {
      // var last = transitions[i][transitions[i].length - 1];

      // transitions[i].pop();
      transitions[i].pop();
      // transitions[i].push(last)
    }

    this.setState({
      alphabet: alphabet,
      transitions: transitions
    })
    console.log(alphabet, transitions)
  }
  render() {
    return (
      <div className="ColumnButton">
        <Button color="red" circular icon="minus" onClick={this.removeRow} />
        <div className="RowButton">
          <Button color="red" circular icon="minus" style={{ marginRight: "1em" }} onClick={this.removeCollumn} />
          <Table celled className="InputTable">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="HeaderClean" />

                {this.state.alphabet.map((val, index) => (
                  <Table.HeaderCell
                    key={index}
                    className="InputCell"
                    textAlign="center"
                  >
                    {val === "ε" ? val : <Input
                      className="InputValue clean"
                      id={index + "_alphabet"}
                      value={this.state.alphabet[index]}
                      onChange={this.updateEditable}
                    />}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.states.map((val, index) => (
                <Table.Row error={val.split(/\d/)[0] === "f"} positive={val.split(/\d/)[0] === "s"} key={index}>
                  <Table.Cell
                    style={{ minWidth: "150px" }}
                    id={index}
                    className="InputCell"
                    textAlign="center"
                  >
                    <Input
                      id={index + "_editable"}
                      value={this.state.states[index]}
                      className="InputValue state clean"
                      onChange={this.updateEditable}
                    />
                  </Table.Cell>

                  {/**################################################################################################# */}

                  {this.state.alphabet.map((val, index2) => (
                    <Table.HeaderCell
                      key={index2}
                      className="InputCell"
                      textAlign="center"
                    >
                      <Input
                        className="InputValue clean"
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
