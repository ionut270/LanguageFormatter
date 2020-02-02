/*eslint no-eval: "off"*/
import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";

import "./Styles/header.css";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: "ENFA-DFA",
		};
	}
	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
		this.props.changeActiveComponent(name);
	};
	render() {
		const { activeItem } = this.state;

		return (
			<Menu inverted className='Page_Header'>
				<div className='MenuItems'>
					<Button
						secondary
						size='mini'
						circular
						onClick={() => {
							window.open("https://github.com/ionut270/LanguageFormatter");
							this.forceUpdate();
						}}>
						<Icon name='github' size='large' />
					</Button>
					<Menu.Item name='ENFA-DFA' active={activeItem === "ENFA-DFA"} onClick={this.handleItemClick} />
					<Menu.Item name='First Follow' active={activeItem === "First Follow"} onClick={this.handleItemClick} />
				</div>
				<Button
					size='mini'
					className='coffeButton'
					circular
					color='orange'
					onClick={() => {
						window.open("https://www.buymeacoffee.com/RKCFsa1");
						this.forceUpdate();
					}}>
					<Icon name='coffee' />
					Buy me a coffe
				</Button>
			</Menu>
		);
	}
}
