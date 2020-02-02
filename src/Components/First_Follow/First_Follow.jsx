/*eslint no-eval: "off"*/
import React from "react";
import { Button, Form, TextArea, Segment, Input, Message } from "semantic-ui-react";
import "../../Styles/First_Follow.css";

const { parse_input, FIRST, FOLLOW, parse_response } = require("./Scripts/automata");

const options = [
	{ key: "0", text: "FIRST", value: "FIRST" },
	{ key: "1", text: "FOLLOW", value: "FOLLOW" },
];

export default class Lexical extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			operation: "",
			nonterminal: "",
			response: ["Please enter a grammar and select an operation to begin !"],
		};
		this.AddChar = this.AddChar.bind(this);
	}
	changeOperation = (e, { value }) => {
		this.setState({
			operation: value,
		});
	};
	changeInput = (e, { value }) => {
		this.setState({
			input: value,
		});
	};
	changeNonTerminal = (e, { value }) => {
		this.setState({
			nonterminal: value,
		});
	};
	calculate = (e) => {
		if (this.state.input === "" || this.state.operation === "") {
			this.setState({ response: "Invalid Input ! Please enter a grammar and select an operation to begin !" });
		} else if (this.state.nonterminal !== "") {
			let input = parse_input(this.state.input);
			if (this.state.operation === "FIRST") {
				let first = FIRST(input, this.state.nonterminal);
				this.setState({
					response: [`FIRST(${this.state.nonterminal}) = { ${first.split(/ , $/)[0]} }`],
				});
			}
			if (this.state.operation === "FOLLOW") {
				let follow = FOLLOW(input, this.state.nonterminal);
				this.setState({
					response: [`FOLLOW(${this.state.nonterminal}) = {${follow.split(/ , $/)[0]}}`],
				});
			}
		} else {
			let input = parse_input(this.state.input);
			if (this.state.operation === "FIRST") {
				let response = [];
				input.nonterminals.map((nonterminal) => {
					let first = FIRST(input, nonterminal.id);
					response.push(`FIRST(${nonterminal.id}) = { ${first.split(/ , $/)[0]} }`);
				});
				this.setState({
					response: response,
				});
			}
			if (this.state.operation === "FOLLOW") {
				let response = [];
				input.nonterminals.map((nonterminal) => {
					let follow = FOLLOW(input, nonterminal.id);
					response.push(`FOLLOW(${nonterminal.id}) = { ${follow.split(/ , $/)[0]} }`);
				});
				this.setState({
					response: response,
				});
			}
		}
	};
	AddChar(char) {
		var input = this.state.input;
		input += char;
		this.setState({
			input: input,
		});
	}
	render() {
		return (
			<div className='Lexical'>
				<Segment className='LexicalInputSegment'>
					<div className='InfoSegment'>
						<Message className='InfoSegmentMessage'>
							<Message.Header>FIRST()/FOLLOW() How to</Message.Header>
							<p>Valid grammar separators : "," "\n" !</p>
							<p>The value has to be a defined nonterminal ! (A capital character)</p>
							<p>In case no value has been provided the operation will run on the whole G</p>
							<p>The grammar must be finite !</p>
							<p>Things like "start" "end" are not considered caracters but a string of terminals</p>
						</Message>
					</div>
					<div className='InputSegment'>
						<Form className='FirstFollowForm'>
							<div>
								<Form.Select className='FirstFolowOperation' fluid label='Operation' options={options} placeholder='FIRST OR FOLLOW' onChange={this.changeOperation} />
								<Form.Field className='FirstFolowOperation'>
									<Input placeholder='(optional) Nonterminal' onChange={this.changeNonTerminal} />
								</Form.Field>
							</div>
							<Form.Field className='FirstFolowGrammar'>
								<label>
									Grammar
									<Button
										circular
										color="orange"
										className='HelperInputButton'
										onClick={(e) => {
											e.preventDefault();
											this.AddChar("ε");
										}}>
										+ε
									</Button>
									<Button
										circular
										color="orange"
										className='HelperInputButton'
										onClick={(e) => {
											e.preventDefault();
											this.AddChar("γ");
										}}>
										+γ
									</Button>
									<Button
										circular
										color="orange"
										className='HelperInputButton'
										onClick={(e) => {
											e.preventDefault();
											this.AddChar("δ");
										}}>
										+δ
									</Button>
									<Button
										circular
										color="orange"
										className='HelperInputButton'
										onClick={(e) => {
											e.preventDefault();
											this.AddChar("β");
										}}>
										+β
									</Button>
									<Button
										circular
										color="orange"
										className='HelperInputButton'
										onClick={(e) => {
											e.preventDefault();
											this.AddChar("Ά");
										}}>
										+Ά
									</Button>
								</label>
								<TextArea placeholder='S->A|aBc, A->a, B->d' value={this.state.input} onChange={this.changeInput} />
							</Form.Field>
						</Form>
						<Button color="orange" className='SubmitButton' type='submit' onClick={this.calculate}>
							Submit
						</Button>
					</div>
				</Segment>
				<Message warning className='FirstFollowOutput'>
					{this.state.response.map((response) => (
						<Message.Header>{response}</Message.Header>
					))}
				</Message>
			</div>
		);
	}
}
