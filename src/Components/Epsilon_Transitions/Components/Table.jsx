import React from "react";
import { Table, Input, Button, Message } from "semantic-ui-react";

export default class Input_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: ["s0", "q1", "f2"],
      alphabet: ["a", "b", "ε"],
      transitions: [
        [[], [0], [1]],
        [[1, 2], [2], []],
        [[], [], []]
      ],
      err: null,
      visible: false
    };
  }

  convertToNaturalLanguage = e => { };

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

        console.log("Input value !");

        let i = id.split(/:/)[0];
        let j = id.split(/:/)[1].split(/_/)[0];

        //First check  if we have charcater id's

        // if(value.match(/[a-z]/)){
        //   state.transitions[i][j] = eval(value.split(/[a-z]/)[1]);
        // } else {

        //we can have multiple el's separated with ,
        if (value.match(/,/)) {
          value = value.split(/,/) // we have an array here
        } else {
          value = [value] // we have a single element that we put in an arr
        }

        for (let i = 0; i < value.length; i++) {
          if (value[i].match(/[a-z]/)) {
            value[i] = eval(value[i].split(/[a-z]/)[1])
          } else {
            value[i] = eval(value[i])
          }
        }

        state.transitions[i][j] = value;

        console.log("What happens : ", state.transitions, value)

        this.setState(state);
        break;

      case "alphabet":
        var index = eval(id.split(/_/)[0]);

        state.alphabet[index] = value;
        this.setState(state);
        break;
      default:
        break;
    }
  };

  addCollumn = e => {
    console.log("Add column !");
    var alphabet = this.state.alphabet;
    alphabet.push("");

    var spliced = alphabet.splice(0, alphabet.length - 2);
    spliced.push("");
    spliced.push("ε");

    var transitions = this.state.transitions;

    for (let i = 0; i < transitions.length; i++) {
      transitions[i].push([]);
    }

    this.setState({
      alphabet: spliced,
      transitions: transitions
    });
  };

  addRow = e => {
    console.log("Add row !");
    var transitions = this.state.transitions;
    var states = this.state.states;
    var alphabet = this.state.alphabet;

    states.push("q" + states.length);

    transitions[states.length - 1] = []
    for (let i = 0; i < alphabet.length; i++) {
      transitions[states.length - 1].push([])
    }


    this.setState({
      states: states,
      transitions: transitions
    });
  };
  convertAutomate = e => {
    console.log("Convert Autoamte !");

    var states = this.state.states;
    var alphabet = this.state.alphabet;
    var transitions = this.state.transitions;
    var eps = alphabet.indexOf("ε");

    //check
    this.setState({
      err: null
    })

    var err = false

    for (let i = 0; i < transitions.length; i++) {
      for (let j = 0; j < transitions[i].length; j++) {
        for (let k = 0; k < transitions[i][j].length; k++) {
          if (transitions[i][j][k] > transitions.length - 1) {
            err = true;
            this.setState({
              err: "The state q" + transitions[i][j][k] + " does not exist !"
            })
          }
        }
      }
    }

    if (!err) {
      var dfa = [];

      function CI(Q) {
        // inchiderea la epsilon
        //Q fiind o multime de stari pentru care verificam unde merge fiecare cu epsilon

        //caz curent q0 = 0
        //q0[ε] = [ q0 , 1 ] q0 != 1
        var ci = [];

        for (let i = 0; i < Q.length; i++) {
          var q = Q[i];

          if (typeof Q[i] == "string") {
            var q = eval(Q[i].split(/[a-z]/)[1]);
          }
          if (ci.indexOf(q) === -1) {
            ci.push(q);

            if (ci.indexOf(transitions[q][eps]) === -1) {
              //unde se duce q caz 0 cu epsilon caz 1
              for (let j = 0; j < transitions[q][eps].length; j++) {
                ci.push(transitions[q][eps][j]);
              }
            }
          }
        }
        return ci;
      }

      function Final(q) {
        // doar un simplu arary cu care verificam daca e sare finala sau nu
        for (let i = 0; i < q.length; i++) {
          if (states[i].match(/f/)) {
            return true;
          }
        }
        return false;
      }

      function delta(q, a) {
        a = alphabet.indexOf(a);
        var delta = [];
        for (let i = 0; i < q.length; i++) {
          for (let j = 0; j < transitions[q[i]][a].length; j++) {
            if (transitions[q[i]][a][j] !== undefined)
              delta.push(transitions[q[i]][a][j]);
          }
        }
        return delta;
      }

      var q0 = CI([states[0]]); // 1 --- stare initiala

      var Q = [q0]; // 1 --- multime stari ...
      var marcat = []; // 2 --- pusham ce marcam ...
      var F = []; // 2 --- multime stari finale ...

      // 3 ---
      if (Final(q0)) {
        F.push(q0);
      }

      // 4 ---
      //Q.map(S => {
      for (let x = 0; x < Q.length; x++) {
        var S = Q[x];

        if (marcat.indexOf(S) === -1) {
          // 5 ---
          alphabet.forEach(a => {
            if (a !== "ε") {
              //Avem un S'
              var S1 = CI(delta(S, a));

              if (dfa[Q.indexOf(S)] === undefined) {
                dfa[Q.indexOf(S)] = []
              }

              dfa[Q.indexOf(S)][alphabet.indexOf(a)] = S1; // 7 --- I think ?

              if (JSON.stringify(Q).indexOf(JSON.stringify(S1)) === -1 && S1.length > 0) {
                Q.push(S1);
                //MARCAT DE S FALS !
                if (Final(S1)) {
                  F.push(S1);
                }
              }
            }
          });
          marcat.push(S);
        }
        //console.log("Q===",JSON.stringify(Q))
      }

      console.log("DFA", dfa, Q, F, q0);

      this.props.passTable({
        start_state: q0,
        output: dfa,
        output_States: Q,
        alphabet: alphabet,
        initial_states: states
      })
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
    });
  };
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
    });
    console.log(alphabet, transitions);
  };
  render() {
    return (
      <div className='ColumnButton'>
        <Button color='red' circular icon='minus' onClick={this.removeRow} />
        <div className='RowButton'>
          <Button color='red' circular icon='minus' style={{ marginRight: "1em" }} onClick={this.removeCollumn} />
          <Table celled className='InputTable'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className='HeaderClean' />

                {this.state.alphabet.map((val, index) => (
                  <Table.HeaderCell key={index} className='InputCell cleanbg' textAlign='center'>
                    {val === "ε" ? (
                      <strong>{val}</strong>
                    ) : (
                        <Input
                          className='InputValue clean'
                          id={index + "_alphabet"}
                          value={this.state.alphabet[index]}
                          onChange={this.updateEditable}
                        />
                      )}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.states.map((val, index) => (
                <Table.Row key={index}>
                  <Table.Cell style={{ minWidth: "150px" }} id={index} className='InputCell' textAlign='center'>
                    <Input
                      id={index + "_editable"}
                      value={this.state.states[index]}
                      className='InputValue state clean'
                      onChange={this.updateEditable}
                    />
                    {/* {this.state.states[index]} */}
                  </Table.Cell>

                  {/**################################################################################################# */}

                  {this.state.alphabet.map((val, index2) => (
                    <Table.HeaderCell key={index2} className='InputCell' textAlign='center'>
                      <Input
                        className='InputValue clean'
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

          <Button style={{ marginLeft: "1em" }} primary circular icon='plus' onClick={this.addCollumn} />
        </div>

        <Button primary circular icon='plus' onClick={this.addRow} />

        <Button primary style={{ marginTop: "1em" }} onClick={this.convertAutomate}>
          {" "}
          &lt; Convert &gt;{" "}
        </Button>
        {this.state.err ? (
          <Message negative>
            <Message.Header>We are sorry we cannot convert this automate</Message.Header>
            <p>{this.state.err}</p>
          </Message>
        ) : null}
      </div>
    );
  }
}
