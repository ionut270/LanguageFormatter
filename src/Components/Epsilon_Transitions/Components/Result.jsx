import React from "react";
import { Table } from "semantic-ui-react";


export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
        this.props.out ?
            <Table celled className="InputTable">
                <Table.Header className="HeaderRes">
                    <Table.HeaderCell className="HeaderCellRes" />

                    {this.props.out.alphabet.map((el, index) => el === "ε" ? null :
                        <Table.HeaderCell className="HeaderCellRes" key={index}>
                            {el}
                        </Table.HeaderCell>
                    )}
                </Table.Header>
                <Table.Body className="BodyRes">
                    {this.props.out.output_States.map((val, index) =>
                        <Table.Row className="BodyRowRes" key={index}>
                            <Table.Cell className="BodyCellRes">{val}</Table.Cell>
                            {this.props.out.output[index].map((res, index) =>
                                <Table.Cell className="BodyCellRes" key={index}>{res}</Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        : null)
    }
}