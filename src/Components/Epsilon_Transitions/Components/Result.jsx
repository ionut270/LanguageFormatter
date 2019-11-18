import React from "react";
import { Table } from "semantic-ui-react";


export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            this.props.out ?
                <Table celled className="InputTable">
                    <Table.Header className="HeaderRes">
                        <Table.HeaderCell className="HeaderCellRes" />

                        {this.props.out.alphabet.map((el, index) => el === "ε" ? null :
                            <Table.HeaderCell className="HeaderCellRes flexedFlow" key={index}>
                                {el}
                            </Table.HeaderCell>
                        )}
                    </Table.Header>
                    <Table.Body className="BodyRes">
                        {this.props.out.output_States.map((val, index) =>
                            <Table.Row error={JSON.stringify(val).match(/f/)} positive={val[0] === "s0"} className="BodyRowRes rowFlexed" key={index}>
                                <Table.Cell className="BodyCellRes flexedFlow">
                                    {
                                        val.map((res, index) => <strong>
                                            {this.props.out.initial_states[res].match(/f/) ? "f" : this.props.out.start_state === val  && index === 0? "s" : null }
                                        </strong>)
                                    }
                                    [
                                    {val.map((res, index) =>
                                        <strong>
                                            {this.props.out.initial_states[res].match(/f/) ? "f" : this.props.out.initial_states[res].match(/s/) ? "s" : "q"}
                                            {index === val.length - 1 ? res : res + ","}
                                        </strong>
                                    )}
                                    ]
                                </Table.Cell>
                                {this.props.out.output[index].map((res, index) =>
                                    <Table.Cell className="BodyCellRes flexedFlow" key={index}>
                                        [
                                        {res.map((resp, index) =>

                                            <strong>
                                                {this.props.out.initial_states[resp].match(/f/) ? "f" : this.props.out.start_state === res ? "s" : "q"}
                                                {index === res.length - 1 ? resp : resp + ","}
                                            </strong>
                                        )}
                                        {res.length === 0 ? <strong>{res ? "Ø" : null}</strong> : null}
                                        ]
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                : null)
    }
}