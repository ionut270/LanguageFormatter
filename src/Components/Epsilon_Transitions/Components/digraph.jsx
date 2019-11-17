import React from "react";

import Graph from "react-graph-vis";

const options = {
    layout: {
        hierarchical: false,
    },
    edges: {
        color: "#000000",
        selfReferenceSize: 20,
        smooth:{
            enabled:true,
            type:'dynamic'
        },
    },
    height: "500px",
};

const events = {
    select: function (event) {
        var { nodes, edges } = event;
    }
};

export default class Digraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graph: {
                nodes: [],
                edges: []
            }
        }
    }

    prepareForRender() {
        if (this.props.obj) {
            var states = this.props.obj.output_States;

            var nodes = []

            for (let i = 0; i < states.length; i++) {
                nodes.push({
                    id: i,
                    label: JSON.stringify(states[i]),
                    physics:false,
                    color: JSON.stringify(states[i]).match(/f/) ? "#ff9999" : states[i][0] === "s0" ? "#009933" : "#80aaff" 
                })
            }

            var edges = []

            var separated = [] ;

            for (let i = 0; i < states.length; i++) {
                separated[i] = JSON.stringify(states[i])
            }

            var transitions = this.props.obj.output;
            var alphabet = this.props.obj.alphabet
            for (let i = 0; i < transitions.length; i++) {
                for (let j = 0; j < alphabet.length - 1; j++) {

                    edges.push({
                        from: i,
                        to: separated.indexOf(JSON.stringify(transitions[i][j])),
                        label: alphabet[j]
                    })
                }
            }

            var graph = {
                nodes: nodes,
                edges: edges
            }

            this.setState({
                graph: graph
            })
        }
    }

    render() {
        return (
            <Graph
                graph={this.state.graph}
                options={options}
                events={events}
                autoResize={true}
            />
        )
    }

}