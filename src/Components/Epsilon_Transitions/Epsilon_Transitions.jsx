import React from "react";
import InputTable from "./Components/Table";
import Graph from "react-graph-vis";

import "./Styles/Epsilon_Transitions.css";
// import "./network.css";

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
    { from: 1, to: 2, label:"a" },
    { from: 1, to: 2, label:"b" },
    { from: 1, to: 3, label:"a" },
    { from: 2, to: 4, label:"a" },
    { from: 2, to: 5, label:"a" }
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
  select: function(event) {
    var { nodes, edges } = event;
  }
};

/****************    Mockup */

export default class Epsilon_Transitions extends React.Component {
  /** Documentation in ./Epsilon_Transitions.doc */

  constructor(props) {
    super(props);
    this.state = {
      input: [],
      output: []
    };
  }

  render() {
    return (
      <div>
        <InputTable />
        {/* <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        /> */}
      </div>
    );
  }
}
