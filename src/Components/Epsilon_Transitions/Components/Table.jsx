import React from "react";
import { Table, Input, Button, Message } from "semantic-ui-react";

export default class Input_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: ["s0", "s1", "f1"],
      alphabet: ["a", "b", "ε"],
      transitions: [
        ["s0", "s1", ""],
        ["f1", "s1", "f1"],
        ["f1", "f1", "f1"]
      ],
      editable: "",
      err: null
    };
  }

  componentDidUpdate() {
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
    var states = this.state.states;
    var alphabet = this.state.alphabet;

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

        for (let j = 0; j < alphabet.length - 1; j++) { // 0 - a
          var result = []
          var line = [[nfa_states[m]]]
          console.log("Inainte de crash!",nfa_states[m],m,nfa_states)
          for (let i = 0; i < nfa_states[m].length; i++) { // 0 - s1 pot fi mai multe
            var position = states.indexOf(nfa_states[m][i]); // 0
            result.push(transitions[position][j]); // transitions[0][0] = f2
          }
          // - inchiderea la epsilon -
          var nonEpsLen = result.length
          for (let i = 0; i < nonEpsLen; i++) {
            // luam fiecare din astea si verificam unde merge cu epsilon si il adaugam la results

            var position = states.indexOf(result[i]); // f2 => 2

            // we need check if what we try to push isn't allready in our automate

            if (transitions[position] && transitions[position][eps]) { // daca se duce undeva cu eps

              // if(result.indexOf(transitions[position][eps]) > 0 ){
                result.push(transitions[position][eps])
                console.log("OK : Epsilon transition > ", transitions[position][eps], transitions[position], position, eps, " > ", result[i], i)
              //}
              
            } else {
              if (!transitions[position]) {
                console.log("BAD : No transition > ", position, transitions[position])
              } else {
                console.log("OK : No eps transition > ", position, transitions[position])
              }
            }
          }
          line.push(result);
          console.log("OK : Result = ", result);
          //si avem si tranzitia la eps
        }
        console.log("OK : Line = ", line)
        for (let i = 1; i < line.length; i++) {

          //needs further validation 
          /**
           * Take each individual state and check if it exists in the arr
           */
          let found = false;
          for (let l = 0; l < nfa_states.length; l++) {
            let counter = 0;
            for (let k = 0; k < line[i].length; k++) {
              if(nfa_states[l].indexOf(line[i][k]) !== -1){
                counter++;
              }
            }
            if(counter === line[i].length){
              console.log("Found !")
              found = true;
            }
          }


          if ( !found ) {
            nfa_states.push(line[i])
            console.log("OK : Adding a new state > ", line[i].sort(), i)
          }



        }
        console.log("OK : Here are the states > ", nfa_states)
        console.log(nfa_states);

        output.push(line);
        console.log("OK : Here are the states > ", nfa_states)
      }
      console.log("Output >",output);
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
