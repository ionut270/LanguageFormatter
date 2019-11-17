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
        console.log("Convert  >?", this.props)
        if (this.props.obj) {
            var states = this.props.obj.output_States;

            var nodes = []

            for (let i = 0; i < states.length; i++) {
                nodes.push({
                    id: i,
                    label: JSON.stringify(states[i]),
                    physics:false
                })
            }

            var edges = []

            for (let i = 0; i < states.length; i++) {
                states[i] = JSON.stringify(states[i])
            }

            var transitions = this.props.obj.output;
            var alphabet = this.props.obj.alphabet
            for (let i = 0; i < transitions.length; i++) {
                for (let j = 0; j < alphabet.length - 1; j++) {

                    console.log(states, transitions[i][j], states.indexOf(JSON.stringify(transitions[i][j])))
                    edges.push({
                        from: i,
                        to: states.indexOf(JSON.stringify(transitions[i][j])),
                        label: alphabet[j]
                    })
                }
            }


            var graph = {
                nodes: nodes,
                edges: edges
            }

            console.log("Graph >", graph)

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