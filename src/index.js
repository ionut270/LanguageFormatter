/*eslint no-eval: "off"*/
import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import Header from './Global/Header/header'

import EpsilonTransitions from "./Components/Epsilon_Transitions/Epsilon_Transitions"
import FirstFollow from "./Components/First_Follow/First_Follow"

export default class App extends React.Component {
    state = {
        activeComponent: "ENFA-DFA"
    }
    changeActiveComponent = e => name => {
        this.setState({
            activeComponent: name
        })
    }
    render() {
        return (
            <div className="App">
                <Header className="Header" changeActiveComponent={this.changeActiveComponent()}></Header>
                {this.state.activeComponent === "ENFA-DFA" ? <EpsilonTransitions /> : null}
                {this.state.activeComponent === "First Follow" ? <FirstFollow /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
