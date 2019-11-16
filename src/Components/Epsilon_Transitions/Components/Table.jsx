import React from "react";
import { Table, Input, Button, Message, Divider, Header, Segment, Sidebar } from "semantic-ui-react";
import Graph from "react-graph-vis";

/****************    Mockup */

const graph = {
  nodes: [
    { id: 1, label: "s1", title: "node 1 tootip text" },
    { id: 2, label: "q2", title: "node 2 tootip text" },
    { id: 3, label: "q3", title: "node 3 tootip text" },
    { id: 4, label: "q4", title: "node 4 tootip text" },
    { id: 5, label: "f5", title: "node 5 tootip text" }
  ],
  edges: [
    { from: 1, to: 2, label: "a" },
    { from: 1, to: 2, label: "b" },
    { from: 1, to: 3, label: "a" },
    { from: 2, to: 4, label: "a" },
    { from: 2, to: 5, label: "a" }
  ]
};

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: "#000000"
  },
  height: "500px"
};

const events = {
  select: function (event) {
    var { nodes, edges } = event;
  }
};

/****************    Mockup */

export default class Input_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: ["s0", "q1", "f1"],
      alphabet: ["a", "b", "ε"],
      transitions: [
        ["s0", "q1", ""],
        ["f1", "q1", "s0"],
        ["f1", "s0", "f1"]
      ],
      editable: "",
      err: null,
      visible: false
    };
  }

  changeEditable = id => e => {
    this.setState({ editable: id });
    console.log("Change Editable !");
  }

  updateEditable = (e, { value, id }) => {
    console.log("Update Editable !");
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
    console.log("Add column !");
    var alphabet = this.state.alphabet;
    alphabet.push("");

    var spliced = alphabet.splice(0,alphabet.length-2)
    spliced.push("");
    spliced.push("ε");

    this.setState({
      alphabet: spliced,
    });
  };

  addRow = e => {
    console.log("Add row !");
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
      //console.log("Output >");

      //Huray ! 

      for (let i = 0; i < output.length; i++) {
        var ln = "<"
        for (let j = 0; j < output[i].length; j++) {
          ln += output[i][j] + ">"
        }
        //console.log("[" + ln + "]");
      }

      this.setState({
        output: output,
        output_States: nfa_states
      })
    }

  };

  setVisible(val) {
    this.setState({
      visible: val
    })
  }

  makeVisible = e => {
    this.setState({
      visible: true
    })
  }
  makeInvisible = e => {
    this.setState({
      visible: false
    })
  }

  render() {
    var alpha = this.state.alphabet
    var visible = this.state.visible
    return (
      <div className="ColumnButton">
        {this.state.visible ? <Button primary style={{ marginBottom: "2em" }} onClick={this.makeInvisible}>
          Hide Graph
        </Button> : <Button primary style={{ marginBottom: "2em" }} onClick={this.makeVisible}>
            View Graph
        </Button>}
        <Sidebar.Pushable className="Graph">
          <Sidebar.Pusher className="ButtonsAndAll" dimmed={visible}>
            <div className="RowButton">
              <Table celled definition className="InputTable" compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell style={{ minWidth: "150px" }} />

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
                        style={{ minWidth: "150px" }}
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
          </Sidebar.Pusher>

          <Sidebar
            as={Segment}
            animation='push'
            icon='labeled'
            style={{ backgroundColor: "white", width: "80%" }}
            // onHide={() => this.setVisible(false)}
            vertical
            visible={visible}
            width='huge'
          >
            <Graph
              className="GraphVisual"
              graph={graph}
              options={options}
              events={events}
              getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
            />
          </Sidebar>
        </Sidebar.Pushable>
        <Divider horizontal>
          <Header as='h4'>
            Result will appear below
      </Header>
        </Divider>
        {this.state.output ?
          <Table celled definition className="InputTable" compact>
            <Table.Header className="HeaderRes">
              <Table.HeaderCell className="HeaderCellRes" />

              {alpha.map((el, index) => el === "ε" ? null :
                <Table.HeaderCell className="HeaderCellRes" key={index}>
                  {el}
                </Table.HeaderCell>
              )}
            </Table.Header>
            <Table.Body className="BodyRes">
              {this.state.output_States.map((val, index) =>
                <Table.Row className="BodyRowRes" key={index}>
                  <Table.Cell className="BodyCellRes">{val}</Table.Cell>
                  {this.state.output[index].map((res, index) =>
                    <Table.Cell className="BodyCellRes" key={index}>{res}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          : null}

      </div>
    );
  }
}
