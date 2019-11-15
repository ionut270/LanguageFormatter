import React from "react";
import { Menu } from "semantic-ui-react";

import "./Styles/header.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home"
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
        <Menu.Item name='Epsilon Transitions' active={activeItem === "Epsilon Transitions"} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}
